(function(){
	this.Maniprop = (function(){
		Maniprop.prototype.map = {};
		Maniprop.prototype.settings = {};
		Maniprop.prototype.defaults = {
			"url":null
		};

		function Maniprop(){
			this.settings = jQuery.extend({},this.defaults);
		}

		Maniprop.prototype.init = function(options){
			options = options || {};
			switch(typeof options){
				case 'object':
					this.settings = jQuery.extend({},this.settings,options);
				break;
				case 'string':
					this.settings.url = options;
				break;
			}
			if(this.settings.url){
				this.load(this.settings.url);
			}
			if(this.map){
				this.process(this.map);
			}
		};

		Maniprop.prototype.load = function(url){
			url = url || null;
			if(url){
				jQuery.ajax(url,{
					complete: function(jqXHR,textStatus){
						return this;
					},
					success: function(data,textStatus,jqXHR){
						this.save(data);
					},
					error: function(jqXHR,textStatus,errorThrown){
					}
				});
			}
			return this;
		};

		Maniprop.prototype.save = function(map){
			map = map || null;
			if(typeof map == 'object'){
				this.map = map;
			}
			return this;
		};

		Maniprop.prototype.process = function(map){
			map = map || this.map;
			if(typeof map == 'object'){
				for(selector in map){
					this.apply(selector,map[selector]);
				}
			}
			return this;
		};

		Maniprop.prototype.apply = function(selector,data){
			selector = selector || null;
			data = data || null;
			if(typeof selector == 'string'){
				var $this = jQuery(selector);
			}
			if(typeof data == 'object'){
				for(key in data){
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
			return this;
		};

		return Maniprop;
	})();
}).call(this);
