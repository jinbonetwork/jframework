(function(){
	this.Maniprop = (function(){
		Maniprop.prototype.settings = {};
		Maniprop.prototype.defaults = {
			"url":null,
			"map":{}
		};

		function Maniprop(){
			var mp = this;
			mp.settings = jQuery.extend({},mp.defaults);
		}

		Maniprop.prototype.init = function(options){
			var mp = this;
			options = options || {};
			switch(typeof options){
				case 'object':
					mp.save(options,true);
				break;
				case 'string':
					mp.load(options,true);
				break;
			}
			return mp;
		};

		Maniprop.prototype.load = function(url,act){
			var mp = this;
			url = url || null;
			act = act || false;
			if(url){
				mp.settings.url = url;
				console.log('loading: '+url);
				jQuery.ajax(url,{
					complete: function(jqXHR,textStatus){
						return mp;
					},
					success: function(data,textStatus,jqXHR){
						console.log('map file loaded: '+url);
						mp.save(data,act);
					},
					error: function(jqXHR,textStatus,errorThrown){
						console.log('error: '+errorThrown+' ('+url+')');
					}
				});
			}
			return mp;
		};

		Maniprop.prototype.save = function(map,act){
			var mp = this;
			map = map || null;
			act = act || false;
			if(typeof map == 'object'){
				mp.settings.map = map;
				console.log('map saved:');
				console.log(map);
				if(act){
					mp.process();
				}
			}
			return mp;
		};

		Maniprop.prototype.process = function(map){
			var mp = this;
			map = map || mp.settings.map;
			console.log('processing map...');
			if(typeof map == 'object'){
				for(selector in map){
					mp.apply(selector,map[selector]);
				}
			}else{
				console.log('error: malformed map or empty.');
			}
			console.log('done.');
			return mp;
		};

		Maniprop.prototype.apply = function(selector,data){
			var mp = this;
			selector = selector || null;
			data = data || null;
			if(typeof selector == 'string'){
				var $this = jQuery(selector);
			}
			if(typeof data == 'object'){
				console.log("\t"+selector);
				for(key in data){
					console.log("\t\t"+key+':'+data[key]);
					switch(key){
						case 'class':
							$this.addClass(data[key]);
						break;
						default:
							$this.attr(key,data[key]);
						break;
					}
				}
			}
			return mp;
		};

		return Maniprop;
	})();
}).call(this);
