# pegjs-strip [![npm version](https://badge.fury.io/js/pegjs-strip.svg)](https://badge.fury.io/js/pegjs-strip)

<img src="https://nodei.co/npm/pegjs-strip.png?downloads=true&stars=true" alt=""/>

pegjs-strip is a utility for removing Javascript code fragments from the specified PEG.js grammar file.

The utility removes all code-related statements such as the initializer block, actions and labels. The semantic predicate `&{<code>}` and `!{<code>}` are replaced with `&{return true;}` or `!{return false;}` respectively. 

By default, the utility does not strip comment blocks. To remove comments, `--strip-comment` option can be used.

## Usage

```
Usage: pegjs-strip [options] file


Options:
 -h, --help                     show this help.
     --strip-comment            Strip comments.
     --keep-initializer         Keep the initializer block.
     --keep-action              Keep actions.
     --keep-label               Keep labels.
     --keep-semantic-predicate  Keep semantic predicates.
```

## Example

The following grammar is from the PEG.js documentation.

```
start
  = additive

additive
  = left:multiplicative "+" right:additive { return left + right; }
  / multiplicative

multiplicative
  = left:primary "*" right:multiplicative { return left * right; }
  / primary

primary
  = integer
  / "(" additive:additive ")" { return additive; }

integer "integer"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
```

To remove all the code in the grammar, just run the utility with the grammar file as the first argument. 
The result is then written to the standard output as follows.

```
$ pegjs-strip example.pegjs

start
  = additive

additive
  = multiplicative "+" additive
  / multiplicative

multiplicative
  = primary "*" multiplicative
  / primary

primary
  = integer
  / "(" additive ")"

integer "integer"
  = [0-9]+
```

`--keep-label` option is available to leave all labels in the resulting output.

```
$ pegjs-strip --keep-label example.pegjs 

start
  = additive

additive
  = left:multiplicative "+" right:additive
  / multiplicative

multiplicative
  = left:primary "*" right:multiplicative
  / primary

primary
  = integer
  / "(" additive:additive ")"

integer "integer"
  = digits:[0-9]+
```



