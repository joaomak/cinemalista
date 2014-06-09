//<![CDATA[

function openWin(path,winW,winH) {
	var iMyWidth = (window.screen.width/2) - ((winW/2)+ 10); 
	var iMyHeight = (window.screen.height/2) - ((winH/2) + 50); 
	var win2 = window.open(path,'',"status,toolbar=0,height="+winH+",width="+winW+",resizable=yes,left=" + iMyWidth + ",top=" + iMyHeight + ",screenX=" + iMyWidth + ",screenY=" + iMyHeight + ",scrollbars=yes");
	win2.opener=window;
	win2.focus();
	return false;
}
function toggleFollow(btn){
	var btn=$(btn);
	var href=btn.attr('href');
	if(typeof href == 'undefined' || href == false)return false;
	btn.button('loading');
	$.ajax(href).done(function( data ) {
		if(data!=true)location=btn.attr('href');
		btn.button('reset');
		btn.button('toggle');
		btn.toggleClass('btn-primary');
		btn.find('i').toggleClass('icon-white');	  
	});
	return false;
}


$('#toggles .ok').click(function() {
	var btn=$(this);
	btn.button('loading');
	$.post(btn.attr('href'), { 
			id: $('#toggles').data('id'), 
			name: $('#toggles').data('name'),
			year: $('#toggles').data('year'),
			poster: $('#toggles').data('poster')
		}, function( data ) {
		if(data!=true){
			location=btn.attr('href');
		}
		btn.button('reset');
		btn.button('toggle');
		btn.toggleClass('btn-primary');
		btn.find('i').toggleClass('icon-white');	  
	});
	return false;
});

	
$('#share-btn').click(function() {
	$('#share-page').modal();
	return false;
});

$('.follow').click(function() {
	toggleFollow($(this));
	return false;
});
$('.dull').click(function(event) {
	event.stopPropagation();
	$(this).removeAttr('href');
	$('#modal1').modal('show');
});
$('#social a').click(function() {
	return openWin($(this).attr('href'),650,500);	
});


if($('#contact-form').length){
	$('#contact-form').validate({
		rules: {
		  name: {
			minlength: 2,
			required: true
		  },
		  email: {
			required: true,
			email: true
		  },
		 mensagem: {
			minlength: 2,
			required: true
		  }
		}
	});
}

$('#cover').click(function() {
	$('body').toggleClass('dock');
});

//]]>
