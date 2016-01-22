# pegjs-strip
pegjs-strip is a command-line utility for removing Javascript code fragments from the specified PEG.js grammer file.

```
Usage: pegjs-strip [options] file


Options:
 -h, --help                     show this help.
     --keep-initializer         Keep the initializer block.
     --keep-action              Keep all actions.
     --keep-label               Keep all labels.
     --keep-semantic-predicate  Keep all semantic predicates.
```

Note that semantic predicates are not removed. `&{<code>}` and `!{<code>}` are replaced with
`&{return true;}` or `!{return false;}` respectively.
