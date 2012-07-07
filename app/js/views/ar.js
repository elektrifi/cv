  $(document).ready(function() {
    // do stuff when DOM is ready
	
	// Get viewport dimensions
	var viewportwidth  = $(window).width;
	var viewportheight = $(window).height;
	 
	// increase the default animation speed to exaggerate the effect
	$.fx.speeds._default = 500;
	$(function() {
		$( "#dialog" ).dialog({
			autoOpen: false,
			show: "blind",
			hide: "explode",
			width: 200,
			minwidth: 100,
			//position: [35, 30],
			position: [40, 135],
			title: "Task List",
			open: function(event, ui) { 
              // Set opacity 
              $(this).parent().css('opacity', 0.5); 
              //- Hide close button 
              //- $(this).parent().children().children(".ui-dialog-titlebar-close").hide(); 
              // Handle opacity 
              $(this).parent().hover( function () { 
                  $(this).css('opacity', 1.0); 
              }, function (event) { 
                  $(this).css('opacity', 0.5); 
            }); 
          } 
		});

		$( "#tasks" ).click(function() {
			$( "#dialog" ).dialog( "open" );
			return false;
		});
	});

    var video = $("#live").get()[0];
    
    // Old version
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

    // Flowplayer into overlay     
    $(function() {   
      // install flowplayer into flowplayer container
      var player = $f("player", "http://releases.flowplayer.org/swf/flowplayer-3.2.12.swf");
      // set up button action. it will fire our overlay
      $("button[rel]").overlay({
        // use the Apple effect for overlay
        effect: 'apple',
        // when overlay is opened, load our player
        onLoad: function() {
            player.load();
        },
        // when overlay is closed, unload our player
        onClose: function() {
            player.unload();
        }
      });
    });

    // Flowplayer into panel     
    $(function() {
    	
	  $( "#vdialog" ).dialog({
		    autoOpen: false,
			show: "blind",
			hide: "explode",
			width: 200,
			minwidth: 100,
			//position: [35, 30],
			position: [140, 135],
			title: "Simulation",
			open: function(event, ui) { 
              // Set opacity 
              $(this).parent().css('opacity', 0.5); 
              //- Hide close button 
              //- $(this).parent().children().children(".ui-dialog-titlebar-close").hide(); 
              // Handle opacity 
              $(this).parent().hover( function () { 
                  $(this).css('opacity', 1.0); 
              }, function (event) { 
                  $(this).css('opacity', 0.5); 
          }); 
        } 
      });

	  $( "#training2" ).click(function() {
		$( "#vdialog" ).dialog( "open" );
		return false;
	  });    	
    	   
      // install flowplayer into flowplayer container
      var player_panel = $f("player", "http://releases.flowplayer.org/swf/flowplayer-3.2.12.swf");
      // set up button action. it will fire our overlay
      $("button[rel]").overlay({
        // use the Apple effect for overlay
        effect: 'apple',
        // when overlay is opened, load our player
        onLoad: function() {
            player_panel.load();
        },
        // when overlay is closed, unload our player
        onClose: function() {
            player_panel.unload();
        }
      });
    });          
       
  }); 