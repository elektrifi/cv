    var video = $("#live").get()[0];
    var canvas = $("#canvas");
    var ctx = canvas.get()[0].getContext('2d');
    navigator.webkitGetUserMedia("video",
      function(stream) { video.src = webkitURL.createObjectURL(stream); },
      function(err) { console.log("Unable to get video stream!") }
    );