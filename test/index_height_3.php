<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">

<?php
	require_once dirname(__FILE__).'/../jframework.php';
	JFResources::$force_fallback = true;
	JFTemplates::printHead(array(
		'is-loading',
		'jframework',
	));
?>

	<link rel="stylesheet" type="text/css" href="../test/style.less">
	<script src="../js/resizeAny.js"></script>
	<script src="../js/regheight.js"></script>
	<script>
		jQuery(document).ready(function(){
			jQuery('div[data-height-mode]').resizeAny(function(element){
				jQuery(element).regHeight();
			});
		});
	</script>
	<style>
		.color1 { border: solid 3px #000000; background-color: #cccccc; }
		.color2 { background-color: #ff8822; }
		.color3 { background-color: #2288ff; }
		.color4 { background-color: #ff0000; }
		.color5 { background-color: #aabbff; }
	</style>
</head>
<body>

<div class="container-fluid">
	<!-- non-unit 모드 사용 -->
	<div class="row" data-height-mode="nounit" data-gutter="10" >
		<div class="col-xs-12 col-md-3 color1" data-height-xs="1/6" data-height-md="2">1.<br>내용없음</div>
		<div class="col-xs-12 col-md-6">
			<div class="row">
				<div class="col-xs-12 col-sm-6 color3" data-height-xs="1/6" data-height-sm="1/2" data-height-md="1">3.<br>홈플러스 개인정보 유출: 내 정보가 유출됐는지 안됐는지 갈쳐주지도 않고.</div>
				<div class="col-xs-12 col-sm-6 color4" data-height-xs="1/6" data-height-sm="1/2" data-height-md="1">4.<br>노동자 DNA 채취</div>
			</div>
			<div class="row">
				<div class="col-xs-12 color2" data-height-xs="1/6" data-height-md="1/2">2.<br>어린이집 CCTV - 어린이집 보육교사가 감시받지 않는 것이 아기들한테 좋당께?!</div>
			</div>
		</div>
		<div class="col-xs-12 col-md-3 color5" data-height-xs="1/6" data-height-md="2">5.<br>사이버 사찰 금지법</div>
	</div>
</div>
</body>
</html>
