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
		jQuery(document).ready(function(e){
			jQuery(document).ready(function(e){
				jQuery('[data-toggle="tooltip"]').jfTooltip();
			});
			jQuery('.is-loading-button').on('click',function(e){
				var $trigger = jQuery(this).prop('disabled','disabled');
				var $console = (typeof $trigger.attr('data-console')=='string'&&$trigger.attr('data-console')!='')?jQuery($trigger.attr('data-console')):$trigger.closest('.is-loading-container').find('.is-loading-console');
				var $position = typeof $trigger.attr('data-is-loading-position')!='undefined'?$trigger.attr('data-is-loading-position'):'right';
				var $target = $position=='inside'?$console:($position=='overlay'?jQuery('body'):$trigger);
				var $timer = parseInt($trigger.attr('data-timer')) || 1000;

				$target.jfLoading(jQuery.extend({},{position:$position},$trigger.data()));
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

	<div class="row">
		<div class="col-md-12">
			<h1><i class="j-logos-jinbonet"></i> jFramework Test</h1>
		</div>
	</div>

	<hr>

	<div class="row">
		<form class="col-md-6">
			<h2>Forms</h2>
			<div class="form-group has-feedback">
				<label class="control-label" for="exampleTwitterID">Twitter</label>
				<div class="input-group">
					<span class="input-group-addon">@</span>
					<input type="text" class="form-control" name="exampleTwitterID" id="exampleTwitterID">
				</div>
				<span class="form-control-feedback"><i class="fa fa-exclamation"></i></span>
			</div>
			<div class="form-group has-success has-feedback">
				<div class="input-group">
					<span class="input-group-addon"><label class="control-label" for="exampleInputEmail1">Email address</label></span>
					<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
				</div>
				<span class="form-control-feedback"><i class="fa fa-check"></i></span>
			</div>
			<div class="form-group has-warning has-feedback">
				<label for="exampleInputPassword1">Password</label>
				<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
				<span class="form-control-feedback"><i class="fa fa-exclamation-circle"></i></span>
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
				<div class="col-md-12">
					<h2>jfLoading() & Alerts</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 is-loading-container">
					<div class="alert alert-info is-loading-console">Ready to load...</div>
					<button class="btn is-loading-button" data-is-loading-position="inside" data-complete-label="Content loaded.">position: inside</button>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 is-loading-container">
					<div class="alert alert-info is-loading-console">Ready to load...</div>
					<button class="btn is-loading-button" data-is-loading-position="right" data-complete-label="Content loaded.">position: right (default)</button>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 is-loading-container">
					<div class="alert alert-info is-loading-console">Ready to load...</div>
					<button class="btn is-loading-button" data-is-loading-position="overlay" data-complete-label="Content loaded." data-class="ball-beat">position: overlay</button>
				</div>
			</div>
		</div>
	</div>

	<hr>

	<div class="row">
		<div class="col-md-12">
			<h2>Buttons & Tooltips</h2>
			<div class="buttons">
				<button class="btn btn-default" data-toggle="tooltip" data-class="default" data-placement="top" data-title="(1) This is a dummy tooltip!">Top</button>
				<button class="btn btn-primary" data-toggle="tooltip" data-class="primary" data-placement="right" data-title="(2) This is a dummy tooltip!">Right</button>
				<button class="btn btn-success" data-toggle="tooltip" data-class="success" data-placement="bottom" data-title="(3) This is a dummy tooltip!">Bottom</button>
				<button class="btn btn-info" data-toggle="tooltip" data-class="info" data-placement="left" data-title="(4) This is a dummy tooltip!">Left</button>
				<button class="btn btn-warning" data-toggle="tooltip" data-class="warning" data-placement="top" data-title="(5) This is a dummy tooltip!">Top</button>
				<button class="btn btn-danger" data-toggle="tooltip" data-class="danger" data-placement="right" data-title="(6) This is a dummy tooltip!">Right</button>
				<button class="btn btn-link" data-toggle="tooltip" data-class="transparent" data-placement="bottom" data-title="(7) This is a dummy tooltip!">Bottom</button>
			</div>
		</div>
	</div>
	<hr>
</div>


<nav id="jgm" class="container">
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
</body>
</html>
