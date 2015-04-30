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

		options = options || {};
		jQuery(this).each(function(index){
			var settings;
			var $this = jQuery(this); 
			var data = $this.data();
			if(typeof options=='object'){
				settings = jQuery.extend(true,{},defaults,options,data);

				switch(settings.position){
					case 'inside':
					case 'overlay':
						if(typeof addDivsData[settings['class']] != 'number'){
							settings['class'] = defaults['class2'];
						}
						settings.pattern = '<span class="loader-inner %class%">'+addDivs(settings['class'])+'</span>';
					break;
					default:
					case 'right':
						settings.pattern = '<i class="%class%"></i>';
					break;
				}
				if(settings.text!=''&&!settings.tpl.search('%text%')&&!settings.pattern.search('%text%')) {
					settings.pattern += '<span class="isloading-label">%text%</span>';
				}
				settings.tpl = settings.tpl.replace('%pattern%',settings.pattern);
			}


			$this.isLoading(settings);
		});
	};
})(jQuery);
