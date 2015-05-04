<?php
require_once dirname(__FILE__).'/contrib/browser.php/2015.05.04/lib/Browser.php';
class JF {
	public $path;
	public $uri;
	public $browser;
	public $resources;
	public $fallback;
	public $fallback_version = 11;
	public $map;
	public $que;

	public function __construct(){
		$this->path = dirname(__FILE__);
		$this->uri = $this->getUri();
		$this->browser = new Browser;
		$this->resources = json_decode(file_get_contents($this->path.'/data/resources.map.json'),true);
		$this->fallback = json_decode(file_get_contents($this->path.'/data/resources.map.fallback.json'),true);
		if($use_fallback||($this->browser->getBrowser()==Browser::BROWSER_IE&&$this->browser->getVersion()>$this->fallback_version)){
			$this->map = array_merge($this->resources,$this->fallback);
		}else{
			$this->map = $this->resources;
		}
		$this->que = array();
	}

	public function getUri(){
		$root = $_SERVER['DOCUMENT_ROOT'];
		$dirname = dirname(__FILE__);
		$prefix = str_replace($root,'',$dirname);
		return $prefix;
	}

	public function getResourceQue($required,$currentPriority=null){
		foreach($required as $package){
			if(!empty($this->map[$package]['deps'])){
				$this->que = array_merge($this->getResourceQue($this->map[$package]['deps'],$map[$package]['priority']),$this->map[$package]['deps'],$this->que,array($package));
			}else{
				$this->que[] = $package;
			}
		}
		$this->que = array_unique($this->que);
		return $this->que;
	}

	public function getResources($que,$type=null){
		$resource = array();
		foreach($que as $package){
			$content = $this->map[$package];
			if(!empty($content['css'])){
				foreach($content['css'] as $k => $stylesheet){
					$resource['css']["{$package}-css-{$k}"] = $stylesheet;
				}
			}
			if(!empty($content['js'])){
				foreach($content['js'] as $k => $script){
					$resource['js']["{$package}-js-{$k}"] = $script;
				}
			}
		}
		if($type){
			return $resource[$type];
		}else{
			return $resource;
		}
	}

	public function printResources($required){
		$this->que = $this->getResourceQue($required);
		$markup = array();
		extract($this->getResources($this->que));
		if(!empty($css)){
			foreach($css as $k => $item){
				$markup[] = "<link id=\"{$k}\" rel=\"stylesheet\" href=\"{$this->uri}/{$item}\">";
			}
		}
		if(!empty($js)){
			foreach($js as $k => $item){
				$markup[] = "<script id=\"{$k}\" src=\"{$this->uri}/{$item}\"></script>";
			}
		}
		print implode(PHP_EOL,$markup).PHP_EOL;
	}
}
?>
