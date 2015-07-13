jQuery(document).ready(function(e){
	jQuery('.turning-sentences').each(function(index){
		var $container = jQuery(this);
		var $items = $container.find('.turning-sentence');
		var animation = {};
		animation.name = $container.attr('data-animation-name') || 'top-down';
		animation.name = 'turning-sentence-'+animation.name;
		animation.duration = $container.attr('data-animation-duration') || '1.5s';
		animation.timing = $container.attr('data-animation-timing') || 'ease';
		animation.delay = 0;
		animation.loop = 'infinite';
		animation.state = 'running';
		$items.each(function(iindex){
			var $item = jQuery(this);
			animation.delay = parseInt(animation.duration.replace('ms','').replace('s','000')) * iindex;
			animation.delay = animation.delay>0?animation.delay/1000:0;
			animation.delay += (animation.delay==0||animation.delay>1000?'s':'ms');
			$item.css('animation',animation.name+' '+animation.duration+' '+animation.timing+' '+animation.delay+' '+animation.loop+' '+animation.state);
		});
	});	
});
