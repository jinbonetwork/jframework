<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
<?php
	require_once dirname(__FILE__).'/../jframework.php';
	$resources = jf_getResourceMap();
?>
	<link rel="stylesheet" type="text/css" href="../<?php echo $resources['loaders.css']['css'][0]; ?>">
	<link rel="stylesheet" type="text/css" href="../<?php echo $resources['is-loading']['css'][0]; ?>">
	<link rel="stylesheet" type="text/css" href="../<?php echo $resources['jframework']['css'][0]; ?>">

	<script src="../<?php echo $resources['less.js']['js'][0]; ?>"></script>
	<script src="../<?php echo $resources['jquery']['js'][0]; ?>"></script>
	<script src="../<?php echo $resources['loaders.css']['js'][0]; ?>"></script>
	<script src="../<?php echo $resources['is-loading']['js'][0]; ?>"></script>
	<script src="../<?php echo $resources['is-loading']['js'][1]; ?>"></script>
	<script src="../<?php echo $resources['jframework']['js'][0]; ?>"></script>

	<link rel="stylesheet/less" type="text/css" href="../test/style.less">
	<script>
		jQuery(document).ready(function(e){
			jQuery('.is-loading-button').on('click',function(e){
				var $trigger = jQuery(this).prop('disabled','disabled');
				var $console = (typeof $trigger.attr('data-console')=='string'&&$trigger.attr('data-console')!='')?jQuery($trigger.attr('data-console')):$trigger.closest('.is-loading-container').find('.is-loading-console');
				var $position = typeof $trigger.attr('data-is-loading-position')!='undefined'?$trigger.attr('data-is-loading-position'):'right';
				var $target = $position=='inside'?$console:($position=='overlay'?jQuery('body'):$trigger);
				var $timer = parseInt($trigger.attr('data-timer')) || 1000;

				$target.jfLoading({position:$position});
				$console.removeClass('alert-success').addClass('alert-info');
				setTimeout(function(){
					$target.isLoading('hide');
					$trigger.prop('disabled','');
					$console.removeClass('alert-info').addClass('alert-success').html($trigger.attr('data-complete-label')).addClass('alert-success');
				},$timer);
			});
		});
	</script>
</head>
<body>
<div class="container">
	<h1>jFramework Test</h1>
	<hr>
	<div class="row">
		<form class="col-md-6" style="box-sizing: border-box;padding-right: 20px;">
			<h2>Forms & Buttons</h2>
			<div class="form-group">
				<label for="exampleInputEmail1">Email address</label>
				<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">Password</label>
				<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
			</div>
			<div class="form-group">
				<label for="exampleInputFile">File input</label>
				<input type="file" id="exampleInputFile">
				<p class="help-block">Example block-level help text here.</p>
			</div>
			<div class="checkbox">
				<label>
					<input type="checkbox"> Check me out
				</label>
			</div>
			<button type="submit" class="btn btn-default">Submit</button>
		</form>
		<div class="col-md-6">
			<div class="row">
				<h2>jfLoading() & Alerts</h2>
				<div class="is-loading-container">
					<div class="alert alert-info is-loading-console">Ready to load...</div>
					<button class="btn is-loading-button" data-is-loading-position="inside" data-complete-label="Content loaded.">position: inside</button>
				</div>
				<div class="is-loading-container">
					<div class="alert alert-info is-loading-console">Ready to load...</div>
					<button class="btn is-loading-button" data-is-loading-position="right" data-complete-label="Content loaded.">position: right (default)</button>
				</div>
				<div class="is-loading-container">
					<div class="alert alert-info is-loading-console">Ready to load...</div>
					<button class="btn is-loading-button" data-is-loading-position="overlay" data-complete-label="Content loaded.">position: overlay</button>
				</div>
			</div>
		</div>
	</div>
	<hr>

	<nav id="jgm">
		<div class="container">
			<h2>Global Menu</h2>
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
</div>
</body>
</html>
