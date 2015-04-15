<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="../contrib/normalize.css/3.0.3/normalize.css">
	<link rel="stylesheet" type="text/css" href="../contrib/bootstrap/3.3.4/dist/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="../contrib/font-awesome/4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="../contrib/webfonts/2015.01.14/style.css">
	<link rel="stylesheet/less" type="text/css" href="./index.less">
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
			$markup[] = "<div id='{$key}' class='jgm-group col-md-3'>";
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
echo walk(array(
	'teams' => array(
		'label' => '팀',
		'data' => array(
			'act-jinbo-net' => array('label'=>'정보인권','href'=>'http://act.jinbo.net'),
			'lab-jinbo-net' => array('label'=>'독립네트워크','href'=>'http://lab.jinbo.net'),
			'support' => array('label'=>'후원하기','href'=>'http://jinbo.net/support'),
		),
	),
	'user-services' => array(
		'label' => '개인화 서비스',
		'data' => array(
			'mycham-jinbo-net' => array('label'=>'내 정보','href'=>'http://mycham.jinbo.net'),
			'mail-jinbo-net' => array('label'=>'메일','href'=>'http://mail.jinbo.net'),
			'blog-jinbo-net' => array('label'=>'블로그','href'=>'http://blog.jinbo.net'),
		),
	),
	'issue-makers' => array(
		'label' => '사회운동지원',
		'data' => array(
			'taogi-net' => array('label'=>'따오기','href'=>'http://taogi.net'),
			'socialfunch-org' => array('label'=>'소셜펀치','href'=>'http://socialfunch.org'),
			'hosting-jinbo-net' => array('label'=>'호스팅','href'=>'http://hosting.jinbo.net'),
			'list-jinbo-net' => array('label'=>'메일링리스트','href'=>'http://list.jinbo.net'),
		),
	),
	'others' => array(
		'label' => '기타',
		'data' => array(
			'sitemap' => array('label'=>'전체보기','href'=>'http://jinbo.net/sitemap'),
		)
	),
));

?>
</div>
</div>
</nav>

</body>
</html>
