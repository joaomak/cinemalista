

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
function loader(){
	$('body').addClass('loading');
}
function unloader(){
	$('body').removeClass('loading');
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
	event.preventDefault();
	$(this).removeAttr('href');
	$('#modal1').modal('show');
	return false;
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







$('#userinfo').click(function(){
	if( snapper.state().state=="right" ){
        snapper.close();
    } else {
        snapper.open('right');
    }
});
$('#logo').click(function(){
	if( snapper.state().state=="left" ){
        snapper.close();
    } else {
        snapper.open('left');
    }
});

$('.form-search').submit(function(e) {
	e.preventDefault();
	var q=$(this).find('input').val();
	if(q.length<2)return false;
	var btn=$(this).find('.btn');
	//btn.button('disabled');
	btn.addClass('disabled');
	loader();
	$.get(domain, { 
		q: q,
		app:true
	}, function( data ) {
		btn.removeClass('disabled');
		$('#content').html(data);
		content_init();
		unloader();
	});
	return false;
});


function content_init(){

	/*$( '.thumbnail' )imageLightbox( {
	  onStart:   function() { overlayOn(); },
	  onLoadStart: function() { captionOff(); activityIndicatorOn(); },
	  onLoadEnd:   function() { captionOn(); activityIndicatorOff(); },
	  onEnd:     function() { overlayOff(); captionOff(); activityIndicatorOff(); }
	})*/
	$('.navbar').click(function(event) {
		$('html,body').animate({
	    	scrollTop: 0
		}, 200);
	});
	var uid=localStorage.getItem('uid');
	if(uid!=null){
		//getUser();
	}

	$("a[href^='http']").click(function(e) {
		window.open($(this).attr('href'), '_system');
		e.preventDefault();
		return false;
	});
	
	snapper.close();
	
	$( '.thumbnail' ).click(function(e) {
		e.preventDefault();
		loader();
		var h=$(this).attr('href');
		$.get(domain+h, {
			app:true
		}, function( data ) {
			if($('#movie').length)$('#movie').html(data);
			else $('#content').append('<div class="movie">'+data+'</div>');
			$('body').addClass('one-movie');
			unloader();
		});
		return false;
	});
}

$( '.side-nav' ).click(function(e) {
	e.preventDefault();
	loader();
	$( '.side-nav' ).parent().removeClass('active');
	$(this).parent().addClass('active');
	var h=$(this).attr('href');
	var t=$(this).data('tag');
	$.get(domain+h, {
		app:true,
		tag: t
	}, function( data ) {
		$('#content').html(data);
		content_init();
		snapper.close();
		unloader();
	});
	return false;
});


/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 1.0.1
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
function FastClick(t,e){"use strict";function i(t,e){return function(){return t.apply(e,arguments)}}var n;if(e=e||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=e.touchBoundary||10,this.layer=t,this.tapDelay=e.tapDelay||200,!FastClick.notNeeded(t)){for(var o=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],s=this,r=0,c=o.length;c>r;r++)s[o[r]]=i(s[o[r]],s);deviceIsAndroid&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,i,n){var o=Node.prototype.removeEventListener;"click"===e?o.call(t,e,i.hijacked||i,n):o.call(t,e,i,n)},t.addEventListener=function(e,i,n){var o=Node.prototype.addEventListener;"click"===e?o.call(t,e,i.hijacked||(i.hijacked=function(t){t.propagationStopped||i(t)}),n):o.call(t,e,i,n)}),"function"==typeof t.onclick&&(n=t.onclick,t.addEventListener("click",function(t){n(t)},!1),t.onclick=null)}}var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),deviceIsIOSWithBadTarget=deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);FastClick.prototype.needsClick=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(deviceIsIOS&&"file"===t.type||t.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(t.className)},FastClick.prototype.needsFocus=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!deviceIsAndroid;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},FastClick.prototype.sendClick=function(t,e){"use strict";var i,n;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),n=e.changedTouches[0],i=document.createEvent("MouseEvents"),i.initMouseEvent(this.determineEventType(t),!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),i.forwardedTouchEvent=!0,t.dispatchEvent(i)},FastClick.prototype.determineEventType=function(t){"use strict";return deviceIsAndroid&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},FastClick.prototype.focus=function(t){"use strict";var e;deviceIsIOS&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},FastClick.prototype.updateScrollParent=function(t){"use strict";var e,i;if(e=t.fastClickScrollParent,!e||!e.contains(t)){i=t;do{if(i.scrollHeight>i.offsetHeight){e=i,t.fastClickScrollParent=i;break}i=i.parentElement}while(i)}e&&(e.fastClickLastScrollTop=e.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(t){"use strict";return t.nodeType===Node.TEXT_NODE?t.parentNode:t},FastClick.prototype.onTouchStart=function(t){"use strict";var e,i,n;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),i=t.targetTouches[0],deviceIsIOS){if(n=window.getSelection(),n.rangeCount&&!n.isCollapsed)return!0;if(!deviceIsIOS4){if(i.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=i.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=i.pageX,this.touchStartY=i.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(t){"use strict";var e=t.changedTouches[0],i=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>i||Math.abs(e.pageY-this.touchStartY)>i?!0:!1},FastClick.prototype.onTouchMove=function(t){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},FastClick.prototype.findControl=function(t){"use strict";return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(t){"use strict";var e,i,n,o,s,r=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,i=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,deviceIsIOSWithBadTarget&&(s=t.changedTouches[0],r=document.elementFromPoint(s.pageX-window.pageXOffset,s.pageY-window.pageYOffset)||r,r.fastClickScrollParent=this.targetElement.fastClickScrollParent),n=r.tagName.toLowerCase(),"label"===n){if(e=this.findControl(r)){if(this.focus(r),deviceIsAndroid)return!1;r=e}}else if(this.needsFocus(r))return t.timeStamp-i>100||deviceIsIOS&&window.top!==window&&"input"===n?(this.targetElement=null,!1):(this.focus(r),this.sendClick(r,t),deviceIsIOS&&"select"===n||(this.targetElement=null,t.preventDefault()),!1);return deviceIsIOS&&!deviceIsIOS4&&(o=r.fastClickScrollParent,o&&o.fastClickLastScrollTop!==o.scrollTop)?!0:(this.needsClick(r)||(t.preventDefault(),this.sendClick(r,t)),!1)},FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(t){"use strict";return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable?!this.needsClick(this.targetElement)||this.cancelNextClick?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0:!0},FastClick.prototype.onClick=function(t){"use strict";var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},FastClick.prototype.destroy=function(){"use strict";var t=this.layer;deviceIsAndroid&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(t){"use strict";var e,i;if("undefined"==typeof window.ontouchstart)return!0;if(i=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!deviceIsAndroid)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(i>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}return"none"===t.style.msTouchAction?!0:!1},FastClick.attach=function(t,e){"use strict";return new FastClick(t,e)},"undefined"!=typeof define&&define.amd?define(function(){"use strict";return FastClick}):"undefined"!=typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick;

$(function() {
    FastClick.attach(document.body);

    /*$.get(domain, { 
		app:'sidebar'
	}, function( data ) {
		$('.snap-drawer-left').html(data);
		//sidebar_init();
	});*/
	content_init();

});


var snapper = new Snap({
    element: document.getElementById('content'),
    dragger: null,
    //disable: 'left',
    addBodyClasses: true,
    hyperextensible: true,
    resistance: 0.5,
    flickThreshold: 50,
    transitionSpeed: 0.3,
    easing: 'ease',
    maxPosition: 230,
    minPosition: -230,
    tapToClose: true,
    touchToDrag: true,
    slideIntent: 40,
    minDragDistance: 16
});









document.addEventListener('deviceready', function() {


    document.addEventListener("backbutton", function(e){
      if($(".modal").hasClass('in')) $(".modal").find('.close').click();
      else if($("body").hasClass('one-movie')) $("body").removeClass('one-movie');
      else if(snapper.state().state!="closed")snapper.close();
      else if(confirm('Sair do aplicativo?')){
          if (navigator.app) {
              navigator.app.exitApp();
          }else if (navigator.device) {
              navigator.device.exitApp();
          }
          return false;
      }
    }, false);


    $('#share').click(function(){
      var url = 'http://www.cinemalista.com/';
      window.plugins.socialsharing.share('Cinemalista', null, null, url);
      return false;
    });

    //Analytics
    gaPlugin = window.plugins.gaPlugin;
    gaPlugin.init(successHandler, errorHandler, "UA-121819-30", 30);
  //gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Button", "Click", "event only", 1);


}, false);



document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);

function onOffline() {
     alert('Estamos offline&hellip;');
}
function onOnline() {
    
}