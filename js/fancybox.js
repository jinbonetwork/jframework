var jfFancyboxOptions = function(options){
	var defaults = {
		padding: 0,
		margin: 0,
		jfFancybox: 1
	};
	options = options || {};
	var settings;
	if(typeof options=='object'){
		settings = jQuery.extend(true,{},defaults,options);
	}else{
		settings = options;
	}
	return settings;
};
