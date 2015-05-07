var jf_fallback_overlay_url = JF_URI+'/html/fallback.html';
var jf_fallback_overlay_expiration = 7;
var jf_fallback_overlay_flag = Cookies.get('jf_fallback_overlay_flag');

jQuery(document).ready(function(e){
	if(typeof jf_fallback_overlay_flag=='undefined'){
		jQuery.ajax(jf_fallback_overlay_url,{
			dataType:'html',
			error:function(jqXHR,textStatus,errorThrown){
				alert(errorThrown);
			},
			success:function(data,textStatus,jqXHR){
				var $content = jQuery(data);
				var $close = $content.find('a#jf_fallback_overlay_close');
				var $flag = $content.find('input#jf_fallback_overlay_flag');
				jQuery.fancybox.open(jfFancyboxOptions({
					type:'html',
					modal:true,
					content:$content,
					afterLoad:function(){
						$flag.on('click',function(e){
							jf_fallback_overlay_flag = $flag.is(':checked')?$flag.val():'0';
							if(jf_fallback_overlay_flag!='0'){
								Cookies.set('jf_fallback_overlay_flag',jf_fallback_overlay_flag,{expires:jf_fallback_overlay_expiration});
							}else{
								Cookies.remove('jf_fallback_overlay_flag');
							}
						});
						$close.on('click',function(e){
							jQuery.fancybox.close();
						});
					}
				}));
			},
			complete:function(jqXHR,textStatus){
			}
		});
	}
});
