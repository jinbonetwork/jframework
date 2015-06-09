(function(){
	this.Lazydo = (function(){
		Lazydo.prototype.trigger = 'lazydo';
		Lazydo.prototype.conditions = {};

		function Lazydo(){
			var ld = this;
		}

		Lazydo.prototype.add_condition = function(c,f){
			var ld = this;
			f = f || false;
			ld.set_condition(c,f);
		};

		Lazydo.prototype.set_condition = function(c,f){
			var ld = this;
			f = f || true;
			ld.conditions[c] = f;
			ld.run();
			return true;
		};

		Lazydo.prototype.check_conditions = function(){
			var ld = this;
			if(ld.conditions.length){
				for(var c in ld.conditions){
					if(ld.conditions[c] != false){
						return false;
					}
				}
			}
			return true;
		};

		Lazydo.prototype.run = function(e){
			var ld = this;
			if(ld.check_conditions()){
				jQuery(document).trigger(ld.trigger);
				return true;
			}else{
				return false;
			}
		};

		return Lazydo;
	})();
}).call(this);
