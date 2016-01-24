# pegjs-strip
pegjs-strip is a command-line utility for removing Javascript code fragments from the specified PEG.js grammer file.

By default, the utility removes the initializer block, actions and labels. The semantic predicate `&{<code>}` and `!{<code>}` are replaced with `&{return true;}` or `!{return false;}` respectively.

## Example

The following grammer is from the PEG.js documentation.

```
/** example.pegjs */

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

To remove all the code in the grammer, just run the utility with the grammer file as the first argument. 
The result is then written to the standard output as follows.

```
$ pegjs-strip example.pegjs

/** example.pegjs */

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

/** example.pegjs */

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

## Options

```
Usage: pegjs-strip [options] file


Options:
 -h, --help                     show this help.
     --keep-initializer         Keep the initializer block.
     --keep-action              Keep all actions.
     --keep-label               Keep all labels.
     --keep-semantic-predicate  Keep all semantic predicates.
```

