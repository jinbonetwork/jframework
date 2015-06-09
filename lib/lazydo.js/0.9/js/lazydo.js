(function(){
	this.Lazydo = (function(){
		Lazydo.prototype.conditions = {};
		Lazydo.prototype.events = {};

		function Lazydo(){
			var ld = this;
		}

		Lazydo.prototype.set_condition = function(c,f){
			var ld = this;
			f = f || true;
			ld.conditions[c] = f;
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

		Lazydo.prototype.run_events = function(e){
			var ld = this;
			if(ld.events.length){
				for(var e in ld.events){
					jQuery(document).trigger(e);
				}
				return true;
			}else{
				return false;
			}
		};

		return Lazydo;
	})();
}).call(this);
