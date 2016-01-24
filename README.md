# pegjs-strip
pegjs-strip is a command-line utility for removing Javascript code fragments from the specified PEG.js grammer file.

By default, the utility removes the initializer block, actions and labels. The semantic predicate `&{<code>}` and `!{<code>}` are replaced with `&{return true;}` or `!{return false;}` respectively.

## Usage

```
Usage: pegjs-strip [options] file


Options:
 -h, --help                     show this help.
     --keep-initializer         Keep the initializer block.
     --keep-action              Keep all actions.
     --keep-label               Keep all labels.
     --keep-semantic-predicate  Keep all semantic predicates.
```


