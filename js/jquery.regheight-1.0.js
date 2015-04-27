(function($){
	var config;

	$.fn.regHeight = function(userConfig){
		//모든 컬럼의 높이값을 초기화.////
		this.each(function(){
			jQuery(this).find('div[class^="col-"]').each(function(){
				jQuery(this).height('');
			});
		});

		if(typeof(config) === 'undefined') config = getConfig(userConfig); 
		var breakPoint = getBreakPoint();
		
		 //브레이크 포인트가 xs보다 작으면 높이를 규제하지 않는다.////
		if(breakPoint == 'de') return;

		//컬럼의 높이를 규제한다. ////
		this.each(function(){
			var cols = jQuery(this).find('div[class^="col-"]');
			var mode = jQuery(this).attr('data-height-mode');
			if(mode == 'nounit'){
				var ws = [];
				for(var i = 0; i < cols.length; i++){
					ws[i] = jQuery(cols[i])[0].getBoundingClientRect().width;
				}
				for(var i = 0; i < cols.length; i++){
					var rh = getHeight(cols[i], breakPoint);
					if(rh != false) {//data-height-*가 없는 컬럼(그룹)은 높이 규제를 하지 않는다.
						jQuery(cols[i]).height(Math.ceil(ws[i] * rh));
					}
				}
			} else {
				var uh = getUnitHeight(mode, jQuery(this)[0].getBoundingClientRect().width);
				for(var i = 0; i < cols.length; i++){
					var nh = getHeight(cols[i], breakPoint);
					if(nh != false) { //data-height-*가 없는 컬럼(그룹)은 높이 규제를 하지 않는다.
						jQuery(cols[i]).height(Math.ceil(uh * nh));
					}
				}
			}
			
			//셀의 아귀 맞추기 ////
			//각 컴럼의 높이값을 ceiling으로 처리했기 때문에, 부모 컬럼은 인접한 컬럼 보다 항상 크다.
			//따라서 자식 컬럼이 부모 컬럼을 n등분으로 나눌 때, 부모 컬럼의 높이(ph)는 인접한 컬럼의 높이(np)보다 최대 n-1만큼 크다.
			//여기서는 등분의 수를 최대 5라고 예상하고, ph와 np의 차가 4이하일 때를 '같은 높이를 가져야 컬럼'으로 취급한다.
			//'같은 높이를 가져야 하는 컬럼'의 조건에는 top의 위치가 같아야 한다는 조건이 추가 되어야 한다.
			var diff = 4; //같은 높이를 가져야 하는 컬럼들 사이의 높이의 최대 차이.
			for(var i = 0; i < cols.length; i++){
				var t = jQuery(cols[i]).offset().top;
				var maxh = jQuery(cols[i]).height();
				for(var j = i+1; j < cols.length; j++){
					if(t == jQuery(cols[j]).offset().top){
						var nh = jQuery(cols[j]).height();
						if(maxh < nh && nh - maxh <= diff){
							maxh = nh;
						}
					}
				}//for(j)
				for(var j = i; j < cols.length; j++){
					if(t == jQuery(cols[j]).offset().top){
						var h = jQuery(cols[j]).height();
						if(h <= maxh && maxh - h <= diff){
							 jQuery(cols[j]).height(maxh);
							 cols.splice(j, 1); j--;
						}
					}
				}//for(j)
			}//for(i)
		});//this.each
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
