jQuery(document).ready(function(){
	resize();
});
jQuery(window).resize(function(){
	resize();
});
function resize(){
	jQuery('div[data-height-mode]').regHeight();
}

