# datetime-2-english

This module produces a complete English sentence in which all numbers have been converted to words.

It exports a single function which takes a date object as it's single parameter.

## Usage

```javascript
var converter = require('datetime-2-english')
var d = new Date()
var datestring = converter(d)

console.log(datestring)
```
Should produce output like `It's twenty-four minutes past six in the evening on Sunday, February fourteenth, in the year twenty sixteen.`
