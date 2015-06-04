(function(){
	this.jfa = (function(){
		jfa.prototype.map = {};
		jfa.prototype.settings = {};
		jfa.prototype.defaults = {
			"url":null
		};

		function jfa(){
			this.settings = jQuery.extend({},this.defaults);
		}

		jfa.prototype.init = function(options){
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

		jfa.prototype.load = function(url){
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

		jfa.prototype.save = function(map){
			map = map || null;
			if(typeof map == 'object'){
				this.map = map;
			}
			return this;
		};

		jfa.prototype.process = function(map){
			map = map || this.map;
			if(typeof map == 'object'){
				for(selector in map){
					this.apply(selector,map[selector]);
				}
			}
			return this;
		};

		jfa.prototype.apply = function(selector,data){
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
	})();
}).call(this);
