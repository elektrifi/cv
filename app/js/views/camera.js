
$(document).ready(function(){

    video = document.getElementById("live")
      var ctx;
      // use the chrome specific GetUserMedia function
      navigator.webkitGetUserMedia("video",
              function(stream) {
                  video.src = webkitURL.createObjectURL(stream);
              },
              function(err) {
                  console.log("Unable to get video stream!")
              }
      )
})