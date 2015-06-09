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

		Maniprop.prototype.init = function(options,callback){
			var mp = this;
			options = options || {};
			callback = callback || function(){};
			switch(typeof options){
				case 'object':
					mp.save(options,true,callback);
				break;
				case 'string':
					mp.load(options,true,callback);
				break;
			}
			return mp;
		};

		Maniprop.prototype.load = function(url,act,callback){
			var mp = this;
			url = url || null;
			act = act || false;
			callback = callback || function(){};
			if(url){
				mp.settings.url = url;
				console.log('loading: '+url);
				jQuery.ajax(url,{
					complete: function(jqXHR,textStatus){
						return mp;
					},
					success: function(data,textStatus,jqXHR){
						console.log('map file loaded: '+url);
						mp.save(data,act,callback);
					},
					error: function(jqXHR,textStatus,errorThrown){
						console.log('error: '+errorThrown+' ('+url+')');
					}
				});
			}
			return mp;
		};

		Maniprop.prototype.save = function(map,act,callback){
			var mp = this;
			map = map || null;
			act = act || false;
			callback = callback || function(){};
			if(typeof map == 'object'){
				mp.settings.map = map;
				console.log('map saved:');
				console.log(map);
				if(act){
					mp.process(map,callback);
				}
			}
			return mp;
		};

		Maniprop.prototype.process = function(map,callback){
			var mp = this;
			map = map || mp.settings.map;
			console.log('processing map...');
			if(typeof map == 'object'){
				var index;
				for(selector in map){
					index ++;
					mp.apply(selector,map[selector]);
				}
				if(typeof callback != 'undefined'){
					callback();
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
			if($this.length){
				console.log(selector+' exists.');
				if(typeof data == 'object'){
					console.log("\t"+selector);
					var key, value;
					for(key in data){
						value = data[key];
						console.log("\t\t"+key+':'+value);
						switch(key){
							case 'class':
								$this.addClass(value);
							break;
							default:
								$this.attr(key,value);
							break;
						}
					}
				}
			}else{
				console.log(selector+' not found.');
			}
			return mp;
		};

		return Maniprop;
	})();
}).call(this);
