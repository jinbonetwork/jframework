<?php
define('JF_PATH',dirname(__FILE__));
define('JF_URI',str_replace($_SERVER['DOCUMENT_ROOT'],'',JF_PATH));

$map = json_decode(file_get_contents(dirname(__FILE__).'/data/resources.map.json'),true);
require_once dirname(__FILE__).'/'.$map['browser.php']['php'][0];

require_once dirname(__FILE__).'/classes/abstract.class.php';
require_once dirname(__FILE__).'/classes/resources.class.php';
require_once dirname(__FILE__).'/classes/templates.class.php';
?>
