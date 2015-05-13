(function($){
	var elements = [];
	$.fn.resizeAny = function(callback){
		this.each(function(index){
			if(elements[index] === undefined){
				elements[index] = {width: jQuery(this).width(), height: jQuery(this).height()};
				callback(this);
			} else {
				var width = jQuery(this).width();
				var height = jQuery(this).height();
				if(width !== elements[index].width || height !== elements[index].height){
					elements[index].width = width;
					elements[index].height = height;
					callback(this);
				}
			}
		});
		var $this = this;
		setTimeout(function(){ jQuery($this).resizeAny(callback); }, 200);
	}
})(jQuery);
