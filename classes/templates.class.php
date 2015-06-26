<?php
class JFTemplates extends JF {
	public static function getHead($index=array()){
		$markup = array();
		foreach($index as $required){
			JFResources::addResource($required);
		}
		$markup[] = JFResources::renderCss();
		$markup[] = JFResources::renderJs();
		return implode(PHP_EOL,$markup).PHP_EOL;
	}

	public static function printHead($index=array()){
		echo self::getHead($index);
	}

	public static function getFooter($options=array()){
		$output = implode(PHP_EOL,array(
			'<footer id="global-footer">',
			'<div class="container">',
			'<div id="global-sitemap">', file_get_contents(JF_PATH.'/html/global-footer/sitemap.html'), '</div>',
			'<div id="global-contact">', file_get_contents(JF_PATH.'/html/global-footer/contact.html'), '</div>',
			'<div id="global-license">', file_get_contents(JF_PATH.'/html/global-footer/license.html'), '</div>',
			'</div>',
			'</footer>',
		));
		return $output;
	}

	public static function printFooter($options=array()){
		echo self::getFooter($options);
	}
}
?>
