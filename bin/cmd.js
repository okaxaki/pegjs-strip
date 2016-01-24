#!/usr/bin/env node

"use strict"

var _T = function(f) {return f.toString().match(/[^]*\/\*\n([^]*)\n\s*\*\/\}$/)[1];};

var getopt = (new (require('node-getopt'))([
	['h','help','show this help.'],
	['','strip-comment','Strip comments.'],
	['','keep-initializer','Keep the initializer block.'],
	['','keep-action','Keep actions.'],
	['','keep-label','Keep labels.'],
	['','keep-semantic-predicate','Keep semantic predicates.'],
])).bindHelp();

getopt.setHelp(_T(function(){/*
Usage: pegjs-strip [options] file

Remove the Javascript code fragments from the specified PEG.js grammer file. 

Options:
[[OPTIONS]]

*/}));

var printUsageAndExit = function(code) {
	console.error(getopt.getHelp());
	process.exit(code);
};

var opt = getopt.parseSystem();

if(opt.argv.length==0) {
	if(Object.keys(opt.options).length==0) {
		printUsageAndExit(0);
	} else {
		console.error('No input file is specified.');
		process.exit(1);
	}
} 

if(1<opt.argv.length) {
	console.error('Multiple input files are not supported.');
	printUsageAndExit(1);
}

try {
	var input = require('fs').readFileSync(opt.argv[0],'utf-8');
	var output = require("../src/index").process(input,{
		keepComment:!(opt.options['strip-comment']||false),
		keepInitializer:opt.options['keep-initializer']||false,
		keepLabel:opt.options['keep-label']||false,
		keepAction:opt.options['keep-action']||false,
		keepSemanticPredicate:opt.options['keep-semantic-predicate']||false,
	});
	console.info(output);
} catch (e) {
	console.error(e.message);
	process.exit(1);
}

process.exit(0);

