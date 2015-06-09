maniprop.js
===========

	var mp = new Maniprop();
	mp.init(data,callback);

data
----

json object.

	{
		"h1:first-child":{
			"class":"first-heading",
			"data-test":"passed"
		},
		"p:last-child":{
			"class":"last-paragraph",
			"data-yours":"yes, me."
		}
	}

callback
--------

function.

	function(){
		alert('done.');
	}
