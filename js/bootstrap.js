(function($){
	$.fn.jfTooltip = function(options){
		var defaults = {
			animation:true,
			container:false,
			delay:0,
			html:false,
			placement:'top',
			selector:false,
			template:'<div class="tooltip %class%" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
			title:'',
			trigger:'hover focus',
			viewpoint:{
				selector:'body',
				padding:0
			},
			class:'default'
		};
		options = options || defaults;
		if(typeof options!='string'){
			options.template = options.template.replace('%class%',options.class);
			options = jQuery.extend({},options,this.data());
		}
		jQuery(this).tooltip(options);
		/*
		this.each(function(index){
			var $this = jQuery(this);
			$this.tooltip(options);
		});
		*/
	};
})(jQuery);
