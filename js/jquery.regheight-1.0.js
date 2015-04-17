(function($){
	$.fn.regHeight = function(){
		var screen = jQuery(window).outerWidth();
		var attr;
		if(screen >= screen_lg_min) attr = 'ratio-lg';
		else if(screen >= screen_md_min) attr = 'ratio-md';
		else if(screen >= screen_sm_min) attr = 'ratio-sm';
		else attr = 'ratio-xs';

		regHeightCore(this, attr);
		var $obj = this;
		setTimeout(function(){regHeightCore($obj, attr);}, 50);
	}
	function regHeightCore($obj, attr){
		$obj.each(function(){
			var wi;
			var w = jQuery(this)[0].getBoundingClientRect().width;
			var ratio = jQuery(this).attr(attr);
			var rw = parseInt((ratio.split('x'))[0]);
			var rh = parseInt((ratio.split('x'))[1]);
			jQuery(this).height(w * rh / rw);
		});
	}
})(jQuery);

