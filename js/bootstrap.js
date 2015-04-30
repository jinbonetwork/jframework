(function($){
	$.fn.jfTooltip = function(options){
		var defaults = {
			"animation":true,
			"container":false,
			"delay":0,
			"html":false,
			"placement":'top',
			"selector":false,
			"template":'<div class="tooltip %class%" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
			"title":"",
			"trigger":'hover focus',
			"viewpoint":{
				"selector":'body',
				"padding":0
			},
			"class":'default'
		};
		options = options || {};
		jQuery(this).each(function(index){
			var settings;
			var $this = jQuery(this);
			var data = $this.data();
			if(typeof options=='object'){
				settings = jQuery.extend(true,{},defaults,options,data);

				settings.template = settings.template.replace('%class%',settings['class']);
			}else{
				settings = options
			}
			$this.tooltip(settings);
		});
	};
})(jQuery);
