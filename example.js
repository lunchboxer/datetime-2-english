var converter = require('./datetime-2-english.js')
var d = new Date()
var datestring = converter(d)

console.log(datestring)
