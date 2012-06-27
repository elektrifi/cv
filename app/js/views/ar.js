	// increase the default animation speed to exaggerate the effect
	$.fx.speeds._default = 1000;
	$(function() {
		$( "#dialog" ).dialog({
			autoOpen: false,
			show: "blind",
			hide: "explode"
		});

		$( "#opener" ).click(function() {
			$( "#dialog" ).dialog( "open" );
			return false;
		});
	});

    var video = $("#live").get()[0];
    navigator.webkitGetUserMedia("video",
      function(stream) { video.src = webkitURL.createObjectURL(stream); },
      function(err) { console.log("Unable to get video stream!") }
    );