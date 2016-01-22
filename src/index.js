"use strict"

var parser = require("./parser");

var Strip = function() {
};

var _flatten = function(a) {
	var ret = [],i;
	for(i in a) {
		var o = a[i];
		if(Array.isArray(o)) {
			ret = ret.concat(_flatten(o));
		} else {
			ret.push(o);
		}
	}
	return ret;
};

Strip.process = function(text,options) {
	parser.parse.strip$options = options;
	var ast = parser.parse(text);
	return _flatten(ast).join('').replace(/[ \t]*$/mg,'');
};

module.exports = Strip;


