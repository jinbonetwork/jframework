<?php
	function jf_setEnv(){
		$path = dirname(__FILE__);
		$parsed = parse_url($path,PHP_URL_PATH);

		if(!defined('JF_PATH')){
			define('JF_PATH',$path);
			define('JF_URI',$parsed);
		}
	}
	jf_setEnv();

	function jf_getResourceMap($use_fallback=false){
		$resources = json_decode(file_get_contents(JF_PATH.'/data/resources.map.json'),true);
		$fallback = json_decode(file_get_contents(JF_PATH.'/data/resources.map.fallback.json'),true);
		$resources = $use_fallback?array_merge($resources,$fallback):$resources;
		return $resources;
	}

	function jf_compareResourcePriorities($a,$b){
		return ($a['priority']<$b['priority']);
	}

	function jf_getResourceQueue($queue=array()){
		global $jf_resourceMap,$jf_resourceQueue;
		foreach($queue as $package){
			$content = $jf_resourceMap[$package];
			$jf_resourceQueue[$package] = $content;
			if(!empty($content['deps'])){
				jf_getResourceQueue($content['deps']);
			}
		}
		$jf_resourceQueue = array_unique($jf_resourceQueue);
		usort($jf_resourceQueue,'jf_compareResourcePriorities');
		return $jf_resourceQueue;
	}

	function jf_getResources($required=array()){
		global $jf_resourceMap,$jf_resourceQueue;
		$jf_resourceMap = jf_getResourceMap(false); 
		$jf_resourceQueue = jf_getResourceQueue($required);
		return $jf_resourceQueue;
	}

	function jf_printResourceCodes($required=array()){
		$queue = jf_getResources($required);
		print_r($queue);
		foreach($queue as $package => $content){
		}
	}
?>
