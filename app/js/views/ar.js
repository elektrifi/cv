    var video = $("#live").get()[0];
    navigator.webkitGetUserMedia("video",
      function(stream) { video.src = webkitURL.createObjectURL(stream); },
      function(err) { console.log("Unable to get video stream!") }
    );