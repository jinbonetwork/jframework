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
	<script>
		jQuery(document).ready(function(){
			jQuery('div[data-height-mode]').resizeAny(function(element){
				jQuery(element).regHeight();
			});
		});
	</script>
	<style>
		.color1 { border: solid 3px #000000; background-color: #cccccc; }
		.color2 { border-radius: 15px;  background-color: #ff8822; }
		.color3 { background-color: #2288ff; }
		.color4 { border: solid 3px #000000; background-color: #ff0000; }
		.color5 { background-color: #aabbff; }
		.item {
			height: 100%;
			border: solid 5px #ff0000;
			background-color: #eeeeee
		}
	</style>
</head>
<body>

<div class="container-fluid" data-height-mode="1" data-gutter="20">
	<div class="row">
		<div class="col-xs-3" data-height-xs="6" data-height-xxs="4">
			<div class="item"></div>
		</div>
		<div class="col-xs-3" data-height-xs="6" data-height-xxs="4">
			<div class="item"></div>
		</div>
		<div class="col-xs-3">
			<div class="row">
				<div class="row">
					<div class="col-xs-12" data-height-xs="3" data-height-xxs="4">
						<div class="item"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12" data-height-xs="3" data-height-xxs="4">
						<div class="item"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-3">
			<div class="row">
				<div class="row">
					<div class="col-xs-12" data-height-xs="3" data-height-xxs="4">
						<div class="item"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12" data-height-xs="3" data-height-xxs="4">
						<div class="item"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
