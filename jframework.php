<?php
define('JF_PATH',dirname(__FILE__));
define('JF_URI',str_replace($_SERVER['DOCUMENT_ROOT'],'',JF_PATH));
define('JF_RESOURCE_URI',JF_URI);
define('JF_CONTRIBUTE_URI',JF_URI);

require_once dirname(__FILE__).'/contrib/browser.php/2015.05.04/lib/Browser.php';
require_once dirname(__FILE__).'/classes/abstract.class.php';
require_once dirname(__FILE__).'/classes/resources.class.php';
require_once dirname(__FILE__).'/classes/templates.class.php';
?>
