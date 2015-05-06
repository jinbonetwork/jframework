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
}
?>
