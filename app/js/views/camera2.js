    var video = $("#live").get()[0];
    var canvas = $("#canvas");
    var ctx = canvas.get()[0].getContext('2d');
    navigator.webkitGetUserMedia("video",
      function(stream) { video.src = webkitURL.createObjectURL(stream); },
      function(err) { console.log("Unable to get video stream!") }
    );
    
    /** Original
    timer = setInterval(
      function () {
        ctx.drawImage(video, 0, 0, 320, 240);
      }, 2000
    );
    */

    var ws = new WebSocket("ws://127.0.0.1:9999");
    ws.onopen = function () {
              console.log("Openened connection to websocket");
    }
        
    timer = setInterval(
      function () {
        ctx.drawImage(video, 0, 0, 320, 240);
        var data = canvas.get()[0].toDataURL('image/jpeg', 1.0);
        newblob = dataURItoBlob(data);
        ws.send(newblob);
      }, 250);

    ws.onmessage = function (msg) {
        var target = document.getElementById("target");
        url=window.webkitURL.createObjectURL(msg.data);
 
        target.onload = function() {
            window.webkitURL.revokeObjectURL(url);
        };
        target.src = url;
    }      

function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString = atob(dataURI.split(',')[1]);
    
    // convert base64/URLEncoded data component to raw binary data held in a string
    //var byteString;
    //if (dataURI.split(',')[0].indexOf('base64') >= 0)
    //  byteString = atob(dataURI.split(',')[1]);
    //else
    //  byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new BlobBuilder();
    bb.append(ab);
    return bb.getBlob(mimeString);
}

