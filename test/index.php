<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="../css/style.css">
	<link rel="stylesheet/less" type="text/css" href="../test/style.less">
	<script src="../contrib/less.js/2.5.0/dist/less.min.js"></script>
	<script src="../contrib/jquery/2.1.3/jquery.min.js"></script>
	<script src="../contrib/bootstrap/3.3.4/dist/js/bootstrap.min.js"></script>
	<script src="../js/script.js"></script>
</head>
<body>

<nav id="jgm">
<div class="container">
<div class="row">
<?php

function walk($data){
	$markup = array();
	foreach($data as $key => $value){
		if(isset($value['data'])){
			$markup[] = "<div id='{$key}' class='jgm-group col-lg-3 col-md-3 col-sm-6 col-xs-12'>";
			if(isset($value['label'])){
				$markup[] = "<h3 class='jgm-group-title'>{$value['label']}</h3>";
			}
			$markup[] = "<ul class='jgm-group-items'>";
			$markup[] = walk($value['data']);
			$markup[] = "</ul>";
			$markup[] = "</div><!--/#{$key}-->";
		}else{
			$markup[] = "<li id='{$key}' class='jgm-group-item'>";
			$markup[] = "<a href='{$value['href']}'><span>{$value['label']}</span></a>";
			$markup[] = "</li><!--/#{$key}-->";
		}
	}
	return implode(PHP_EOL,$markup).PHP_EOL;
}
$data = json_decode(file_get_contents(dirname(__FILE__).'/../data/jgm.json'),true);
echo walk($data);

?>
</div>
</div>
</nav>

</body>
</html>
