(function($){
	var config;

	$.fn.regHeight = function(userConfig){
		if(typeof(config) === 'undefined') config = getConfig(userConfig); 
		var breakPoint = getBreakPoint();

		this.each(function(){
			var cols = jQuery(this).find('div[class^="col-"]');

			for(var i = 0; i < cols.length; i++) jQuery(cols[i]).height(''); //높이값을 초기화.

			if(breakPoint == 'de') return; //브레이크 포인트가 xs보다 작으면 높이를 규제하지 않는다.

			var mode = jQuery(this).attr('data-height-mode');
			if(mode == 'nounit'){
				var ws = [];
				for(var i = 0; i < cols.length; i++){
					ws[i] = jQuery(cols[i])[0].getBoundingClientRect().width;
				}
				for(var i = 0; i < cols.length; i++){
					var rh = getHeight(cols[i], breakPoint);
					if(rh != false) {//data-height-*가 없는 컬럼(그룹)은 높이 규제를 하지 않는다.
						jQuery(cols[i]).height(ws[i] * rh);
					}
				}
			} else {
				var uh = getUnitHeight(mode, jQuery(this)[0].getBoundingClientRect().width);
				for(var i = 0; i < cols.length; i++){
					var nh = getHeight(cols[i], breakPoint);
					if(nh != false) { //data-height-*가 없는 컬럼(그룹)은 높이 규제를 하지 않는다.
						jQuery(cols[i]).height(uh * nh);
					}
				}
			}
		});
	}
		
	function getConfig(userConfig){
		var result;
		var defaultConfig = { "grid_columns": 12, "screen_xs_min": 480, "screen_sm_min": 768, "screen_md_min": 992, "screen_lg_min": 1200 };
		if(typeof(userConfig) === 'undefined'){
			jQuery.ajax({
				url: '../data/config.json',
				dataType: 'json',
				async: false,
				success: function(data){
					if(typeof(data) === 'undefined'){
						result = defaultConfig;
					} else { //config가 정의되어 있지 않으면 config.json파일에서 가져온다.
						result = data;
					}
				},
				error: function(data){ //config.json이 없으면 default 값을 가져온다.
					result = defaultConfig;
				}
			});
		} else {
			result = userConfig; //user config가 정의되어 있으면 그것을 가져온다.
		}

		return result;
	}

	function getBreakPoint(){
		var screen = jQuery(window).outerWidth();
		if(screen >= config.screen_lg_min) return 'lg';
		else if(screen >= config.screen_md_min) return 'md';
		else if(screen >= config.screen_sm_min) return 'sm';
		else if(screen >= config.screen_xs_min) return 'xs';
		else return 'de';
	}

	function getUnitHeight(mode, w){
		var uw = w / config.grid_columns;
		mode = mode.split('/');
		if(mode.length > 1)
			return uw * mode[0] / mode[1];
		else
			return uw * mode[0]; 
	}

	function getHeight(col, bp){
		var h = jQuery(col).attr('data-height-' + bp);
		if(h){
			h = h.split('/');
			if(h.length > 1)
				return h[0] / h[1]; 
			else 
				return h[0];
		}
		else {
			if(bp == 'lg') return getHeight(col, 'md');
			else if(bp == 'md') return getHeight(col, 'sm');
			else if(bp == 'sm') return getHeight(col, 'xs');
			else if(bp == 'xs') return false;
		}
	}
})(jQuery);
