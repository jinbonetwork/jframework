(function($){
	$.fn.turningSentences = function(options){
		var defaults = {
			'duration': 0.7,
			'delay': 2
		};
	
		jQuery(this).each(function(index){
			var $timeline = new TimelineLite();
			var $container = jQuery(this);
			var $items = $container.find('.turning-sentence');
			var data = $container.data();
			var settings = {};

			options = typeof options == 'object'?options:{};
			settings = jQuery.extend(true,{},defaults,options,data);

			var duration = settings.duration;
			var delay = settings.delay;
			var interval = delay+duration*2;

			$items.each(function(jndex){
				jQuery(this).addClass('turning-sentence-'+index+'-'+jndex);
				if(typeof jQuery(this).attr('data-duration')!='number'){
					jQuery(this).attr('data-duration',duration);
				}
				if(typeof jQuery(this).attr('data-delay')!='number'){
					jQuery(this).attr('data-delay',delay);
				}
			});

			var current = 0;
			var next = $items.length - 1;
			var c;
			var n;
			var c_duration;
			var c_delay;
			var n_duration;

			setInterval(function(){
				c = '.turning-sentence-'+index+'-'+current;
				n = '.turning-sentence-'+index+'-'+next;
				c_duration = jQuery(c).attr('data-duration');
				c_delay = jQuery(c).attr('data-delay');
				n_duration = jQuery(n).attr('data-duration');
				$timeline.to(c,c_duration,{top:"100%",delay:c_delay})
					.to(c,0,{top:"-100%"})
					.to(n,n_duration,{top:"0%"}).play();
				current = next;
				next ++;
				if(!$items.eq(next).length){
					next = 0;
				}
			},interval);
		});
	};
})(jQuery);
