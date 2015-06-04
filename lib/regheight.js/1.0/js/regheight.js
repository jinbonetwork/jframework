(function($){
	var elements = [];
	$.fn.resizeAny = function(callback){
		if(!elements.length){
			 if(window.respond && window.respond.queue.length != 0){
				var $this = this;
				setTimeout(function(){ jQuery($this).resizeAny(callback); }, 50);
				return;
			}
		}

		this.each(function(index){
			if(elements[index] === undefined){
				elements[index] = {width: jQuery(this).width(), height: jQuery(this).height()};
				callback(this);
			} else {
				var width = jQuery(this).width();
				var height = jQuery(this).height();
				if(width != elements[index].width || height != elements[index].height){
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

(function($){
	var config;

	$.fn.regHeight = function(userConfig){
		core(this, userConfig);
	}

	function core($this, userConfig){
		//모든 컬럼의 높이값을 초기화.////
		jQuery($this).each(function(){
			jQuery(this).find('div[class*="col-"]').each(function(){
				jQuery(this).css({height: '', width: '', marginLeft:'', marginRight: '', marginTop: '', marginBottom: ''});
			});
		});

		if(typeof(config) === 'undefined') config = getConfig(userConfig); 
		var breakPoint = getBreakPoint();
		if(breakPoint == 'de') return; //브레이크 포인트가 xs보다 작으면 높이를 규제하지 않는다.////

		//컬럼의 높이를 규제한다. ////
		jQuery($this).each(function(){
			var cols = jQuery(this).find('div[class*="col-"]');
			var mode = jQuery(this).attr('data-height-mode');
			var items = [];
			for(var i = 0; i < cols.length; i++){
				var desc = jQuery(cols[i]).find('div[class*="col-"]');
				if(!desc.length) items.push(cols[i]);
			};

			if(mode == 'nounit'){
				var ws = [];
				for(var i = 0; i < cols.length; i++){
					ws[i] = getRectWidth(cols[i]);
				}
				for(var i = 0; i < cols.length; i++){
					var rh = getDataHeight(cols[i], breakPoint);
					if(rh != false) {//data-height-*가 없는 컬럼(그룹)은 높이 규제를 하지 않는다.
						jQuery(cols[i]).outerHeight(Math.ceil(ws[i] * rh));
					}
				}
			} else {
				var uh = getUnitHeight(mode, getRectWidth(this));
				for(var i = 0; i < cols.length; i++){
					var nh = getDataHeight(cols[i], breakPoint);
					if(nh != false) { //data-height-*가 없는 컬럼(그룹)은 높이 규제를 하지 않는다.
						jQuery(cols[i]).outerHeight(Math.ceil(uh * nh));
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
				var maxh = jQuery(cols[i]).outerHeight();
				for(var j = i+1; j < cols.length; j++){
					if(t == jQuery(cols[j]).offset().top){
						var nh = jQuery(cols[j]).outerHeight();
						if(maxh < nh && nh - maxh <= diff){
							maxh = nh;
						}
					}
				}//for(j)
				for(var j = i; j < cols.length; j++){
					if(t == jQuery(cols[j]).offset().top){
						var h = jQuery(cols[j]).outerHeight();
						if(h <= maxh && maxh - h <= diff){
							 jQuery(cols[j]).outerHeight(maxh);
							 cols.splice(j, 1); j--;
						}
					}
				}//for(j)
			}//for(i)

			//사이간격(gutter)를 넣기 ////
			//표처럼 모든 컬럼을 배치했을 때, 아귀고 맞고, 직사각형을 형성한다고 가정한다.
			if(!items.length) return;

			var gutter = jQuery(this).attr('data-gutter');
			if(!gutter) return;
			gutter = parseFloat(gutter);

			var $maxRow;
			if(jQuery(this).hasClass('row')) $maxRow = jQuery(this);
			else $maxRow = jQuery(this).find('.row').first();
	
			//폭 사이 간격 ////
			var cbls = []; cbls[0] = jQuery(items[0]).offset().left;
			for(var i = 1; i < items.length; i++){
				var l = jQuery(items[i]).offset().left;
				var isDouble = false;
				for(var j = 0; j < i; j++){
					if(l == cbls[j]){ isDouble = true; break; }
				}
				if(!isDouble) cbls.push(l);
			}
			cbls.push($maxRow.offset().left + getRectWidth($maxRow));

			var ww = getRectWidth($maxRow);
			var nww = ww - (cbls.length-2)*gutter;
			var leftbls = [];
			for(var i = 0; i < cbls.length-2; i++){
				var w = cbls[i+1] - cbls[i];
				var nw = w * nww / ww;
				if(i == 0) leftbls[i] = cbls[0] + nw;
				else leftbls[i] = leftbls[i-1] + gutter + nw;
			}

			for(var i = 0; i < items.length; i++){
				var w = getRectWidth(items[i]);
				var left = jQuery(items[i]).offset().left;
				var right = left + w;
				var ml = 0, mr = 0;
				for(var j = 0; j < leftbls.length; j++){
					if(leftbls[j] <= left && left <= leftbls[j] + gutter)
						ml = leftbls[j] + gutter - left;
					if(leftbls[j] <= right && right <= leftbls[j] + gutter)
						mr = right - leftbls[j];
				}//for(j)
				w = w - ml - mr;
				jQuery(items[i]).outerWidth(w);
				jQuery(items[i]).css({marginLeft: ml, marginRight: mr});
			}//for(i)
			
			//높이 사이 간격 ////
			var rbls = [];
			rbls[0] = jQuery(items[0]).offset().top;
			for(var i = 1; i < items.length; i++){
				var t = jQuery(items[i]).offset().top;
				var isDouble = false;
				for(var j = 0; j < i; j++){
					if(t == rbls[j]){ isDouble = true; break; }
				}
				if(!isDouble) rbls.push(t);
			}
			rbls.push($maxRow.offset().top + getRectHeight($maxRow));
			
			var hh = getRectHeight($maxRow);
			var nhh = hh - (rbls.length-2)*gutter;
			var topbls = [];
			for(var i = 0; i < rbls.length-2; i++){
				var h = rbls[i+1] - rbls[i];
				var nh = h * nhh / hh;
				if(i == 0) topbls[i] = rbls[0] + nh;
				else topbls[i] = topbls[i-1] + gutter + nh;
			}

			for(var i = 0; i < items.length; i++){
				var h = getRectHeight(items[i]);
				var top = jQuery(items[i]).offset().top;
				var bottom = top + h;
				var mt = 0, mb = 0;
				for(var j = 0; j < topbls.length; j++){
					if(topbls[j] <= top && top <= topbls[j] + gutter)
						mt = topbls[j] + gutter - top;
					if(topbls[j] <= bottom && bottom <= topbls[j] + gutter)
						mb = bottom - topbls[j];
				}//for(j)
				h = h - mt - mb;
				jQuery(items[i]).outerHeight(h);
				jQuery(items[i]).css({marginTop: mt, marginBottom: mb});
			}//for(i)

		});//this.each
	}
		
	function getConfig(userConfig){
		var result;
		var defaultConfig = { "grid_columns": 12, "screen_xs_min": 480, "screen_sm_min": 768, "screen_md_min": 992, "screen_lg_min": 1200 };
		if(typeof(userConfig) === 'undefined'){
			jQuery.ajax({
				url: JF_URI+'/data/config.json',
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
		if(window.matchMedia('(min-width: 0px)').matches){
			if(window.matchMedia('(min-width: '+config.screen_lg_min+'px)').matches) return 'lg';
			else if(window.matchMedia('(min-width: '+config.screen_md_min+'px)').matches) return 'md';
			else if(window.matchMedia('(min-width: '+config.screen_sm_min+'px)').matches) return 'sm';
			else if(window.matchMedia('(min-width: '+config.screen_xs_min+'px)').matches) return 'xs';
			else return 'de';
		}
		else {
			var screen = jQuery(window).outerWidth();
			if(screen >= config.screen_lg_min) return 'lg';
			else if(screen >= config.screen_md_min) return 'md';
			else if(screen >= config.screen_sm_min) return 'sm';
			else if(screen >= config.screen_xs_min) return 'xs';
			else return 'de';
		}
	}

	function getUnitHeight(mode, w){
		var uw = w / config.grid_columns;
		mode = mode.split('/');
		if(mode.length > 1)
			return uw * mode[0] / mode[1];
		else
			return uw * mode[0]; 
	}

	function getDataHeight(col, bp){
		var h = jQuery(col).attr('data-height-' + bp);
		if(h){
			h = h.split('/');
			if(h.length > 1)
				return h[0] / h[1]; 
			else 
				return h[0];
		}
		else {
			if(bp == 'lg') return getDataHeight(col, 'md');
			else if(bp == 'md') return getDataHeight(col, 'sm');
			else if(bp == 'sm') return getDataHeight(col, 'xs');
			else if(bp == 'xs') return false;
		}
	}

	function getRectWidth(obj){
		var rect = jQuery(obj)[0].getBoundingClientRect();
		return rect.right - rect.left;
	}
	function getRectHeight(obj){
		var rect = jQuery(obj)[0].getBoundingClientRect();
		return rect.bottom - rect.top;
	}

})(jQuery);
