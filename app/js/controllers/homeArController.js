
function HomeArController()
{	
	
// bind event listeners to button clicks //
	var that = this;

// handle transfer to AR page//	
	$('#btn-fi').click(function(){ that.attemptTransfer(); });
	
// handle user logout //	
	$('#btn-logout').click(function(){ that.attemptLogout(); });
	
// confirm account deletion //	
	$('#account-form-btn1').click(function(){$('.modal-confirm').modal('show')});	
	
// handle account deletion //	
	$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });
	
	this.deleteAccount = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;	
		$.ajax({ 
			url: '/delete',
			type: 'POST',
			data: { id: $('#userId').val()},
			success: function(data){
	 			that.showLockedAlert('Your account has been deleted.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});	
	}

	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: "/home",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('Your are now logged out.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}		
		});
	}	
	
	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });				
		$('.modal-alert .modal-header h3').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';})
		setTimeout(function(){window.location.href = '/';}, 3000);		
	}
	
	this.attemptTransfer = function()
	{
		console.log('Attempting transfer to Face Detection (home) page...');
		/**
		var that = this;
		$.ajax({
			url: "/ar",
			type: "GET",
			data: { id: $('#userId').val()},			
			success: function(data){
	 			that.showLockedAlert('Preparing to direct you to the Augmented Reality page.');
			},			
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}		
		});
		**/
		window.location.href = '/home'; // Transfer to Face Detection
	}	
	
}

HomeArController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });				
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been updated.'); 				
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
