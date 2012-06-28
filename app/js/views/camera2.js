    var video = $("#live").get()[0];
    var canvas = $("#canvas");
    var ctx = canvas.get()[0].getContext('2d');
    
    // Old version, doesn;t work under Chrome Canary
    //navigator.webkitGetUserMedia("video",
    //  function(stream) { video.src = webkitURL.createObjectURL(stream); },
    //  function(err) { console.log("Unable to get video stream!") }
    //);
    
    // New version from http://people.opera.com/danield/html5/explode/ (script.js)
    // Get the stream from the camera using getUserMedia
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    if (navigator.getUserMedia) {
      // This beautiful hack for the options is from @kanasansoft:
      // http://www.kanasansoft.com/weblab/2012/06/arguments_of_getusermedia.html
      var gumOptions = {video: true, toString: function(){return 'video';}};
      navigator.getUserMedia(gumOptions, successCallback, errorCallback);
      function successCallback(stream) {
        // Replace the source of the video element with the stream from the camera
        video.src = window.URL.createObjectURL(stream) || stream;
        video.play();
      }
      function errorCallback(error) {
        console.error('An error occurred: [CODE ' + error.code + ']');
        video.play();
      }
    } else {
      var errorMsg = '<p class="error">Uh oh, it appears your browser doesn\'t support this feature.<br>Please try with a <a href="http://www.opera.com/next/">browser that has camera support</a>.</p>';
      document.querySelector('[role=main]').innerHTML = errorMsg;
      console.log('Native web camera streaming (getUserMedia) is not supported in this browser.');
      video.play();
    }

    /** Original
    timer = setInterval(
      function () {
        ctx.drawImage(video, 0, 0, 320, 240);
      }, 2000
    );
    */

    //var ws = new WebSocket("ws://127.0.0.1:9999");
    //var ws = new WebSocket("ws://176.34.120.236:9999");
    var ws = new WebSocket("ws://54.247.191.50:9999"); // Need to parameterize this
    ws.onopen = function () {
              console.log("Opened connection to websocket");
    }
        
    timer = setInterval(
      function () {
        ctx.drawImage(video, 0, 0, 320, 240);
        var data = canvas.get()[0].toDataURL('image/jpeg', 1.0);
        newblob = dataURItoBlob(data);        
        ws.send(newblob);
      }, 5000);

    ws.onmessage = function (msg) {
        var target = document.getElementById("target");
        url=window.webkitURL.createObjectURL(msg.data);
 
        target.onload = function() {
            window.webkitURL.revokeObjectURL(url);
        };
        target.src = url;
    }      

function dataURItoBlob(dataURI) {
	
    /* BlobBuilder is an new interface to build a Blob which
    * is required to FormData for sending "files" in a request
    */
    BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder
	
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

