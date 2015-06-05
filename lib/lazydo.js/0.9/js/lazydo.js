(function(){
	this.Lazydo = (function(){
		Lazydo.prototype.conditions = {};
		Lazydo.prototype.events = {};

		function Lazydo(){
		}

		Lazydo.prototype.add_condition = function(c){
			if(typeof this.conditions[c] == 'undefined'){
				this.conditions[c] = false;
			}
			return !this.conditions[c];
		};

		Lazydo.prototype.check_conditions = function(){
			if(this.conditions.length){
				for(var c in this.conditions){
					if(this.conditions[c] != false){
						return false;
					}
				}
			}else{
				return true;
			}
		};

		Lazydo.prototype.run_events = function(e){
			if(this.events.length){
				for(var e in this.events){
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
