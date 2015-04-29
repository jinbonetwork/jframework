(function($){

	$.fn.jfLoading = function(options){
		var defaults = {
			'position': "right",			// right | inside | overlay
			'text': "",								// Text to display next to the loader
			'class': "fa fa-spin fa-refresh",		// loader CSS class
			'class2': "ball-pulse-sync",
			'tpl': '<span class="isloading-wrapper %wrapper%">%pattern%</span>',
			'pattern': "",
			'disableSource': true,		// true | false
			'disableOthers': []
		};
		var addDivsData = {
			"ball-pulse":3,
			"ball-grid-pulse":9,
			"ball-clip-rotate":1,
			"ball-clip-rotate-pulse":2,
			"square-spin":1,
			"ball-clip-rotate-multiple":2,
			"ball-pulse-rise":5,
			"ball-rotate":1,
			"cube-transition":2,
			"ball-zig-zag":2,
			"ball-zig-zag-deflect":2,
			"ball-triangle-path":3,
			"ball-scale":1,
			"line-scale":5,
			"line-scale-party":4,
			"ball-scale-multiple":3,
			"ball-pulse-sync":3,
			"ball-beat":3,
			"line-scale-pulse-out":5,
			"line-scale-pulse-out-rapid":5,
			"ball-scale-ripple":1,
			"ball-scale-ripple-multiple":3,
			"ball-spin-fade-loader":8,
			"line-spin-fade-loader":8,
			"triangle-skew-spin":1,
			"pacman":5,
			"ball-grid-beat":9,
			"semi-circle-spin":1
		};
		var addDivs = function(name) {
			var arr = [];
			for (i=1;i<=addDivsData[name];i++) {
				arr.push('<div></div>');
			}
			return arr.join('');
		};
		options = options || defaults;

		if(typeof options=='object'){
			options = jQuery.extend({},defaults,options);
			switch(options['position']){
				case 'inside':
				case 'overlay':
					if(typeof addDivsData[options['class']] != 'integer'){
						options['class'] = defaults['class2'];
					}
					options.pattern = '<span class="loader-inner %class%">'+addDivs(options['class'])+'</span>';
				break;
				default:
				case 'right':
					options.pattern = '<i class="%class%"></i>';
				break;
			}
			if(options.text!=''&&!options.tpl.search('%text%')&&!options.pattern.search('%text%')) {
				options.pattern += '<span class="isloading-label">%text%</span>';
			}
			options.tpl = options.tpl.replace('%pattern%',options.pattern);
		}

		this.each(function(index){
			var $this = jQuery(this); 
			$this.isLoading(options);
		});
	};
})(jQuery);
