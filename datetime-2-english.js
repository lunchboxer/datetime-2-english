var EnglishTime = function(datetime) {
  this.datetime = datetime

  var converter = require('number-to-words')

  // first look at the time
  var hours = datetime.getHours()
  var minutes = datetime.getMinutes()
  var timestring = ""
  var hourstring = ""
  var minutestring = ""
  var partofday = ""

  // what part of the day is it
  if (hours < 12) {
    partofday = "in the morning"
  } else if (hours < 18) {
    partofday = "in the afternoon"
  } else if (hours < 22) {
    partofday = "in the evening"
  } else {
    partofday = "at night"
  }

  // adjust to twelve hour time
  if (hours > 12) {
    hours = hours - 12
  }
  if (minutes == 0) {
    if (hours == 12) {
      timestring += "noon"
    } else if (hours == 0) {
      timestring += "midnight"
    } else {
      hourstring = converter.toWords(hours)
      timestring += hourstring + " o'clock"
    }
  } else {
    if (minutes <= 30) {
      prep = "past"
    } else {
      prep = "to"
      hours += 1
    }
    if (minutes > 30) {
      minutes = 60 - minutes
    }
    if (minutes == 30) {
      minutestring = "half"
    } else if (minutes == 15 || minutes == 45) {
      minutestring = "a quarter"
    } else if (minutes % 5 == 0) {
      minutestring = converter.toWords(minutes)
    } else if (minutes == 1) {
      minutestring = "one minute"
    } else {
      minutestring = converter.toWords(minutes) + " minutes"
    }

    timestring = minutestring + " " + prep + " " + converter.toWords(hours) + " " + partofday
  }

  // Now the day
  var day = datetime.getDay()
  var englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var daystring = "on " + englishDays[day] + ", "

  // Finally the date
  var month = datetime.getMonth()
  var date = datetime.getDate()
  var year = datetime.getFullYear()
  var datestring = ""

  var englishMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // Finally the year. We assume year is between 100 and 9999
  var century = parseInt(year.toString().slice(0, 2))
  var littleyear = parseInt(year.toString().slice(2, 4))


  // only a few cases, default is cut it in half, then "oh", finally "two thousand"
  if (littleyear < 10) {
    if (century = 20) {
      yearstring = "two thousand " + converter.toWords(littleyear)
    } else {
      yearstring = converter.toWords(century) + " oh " + converter.toWords(littleyear)
    }
  } else {
    yearstring = converter.toWords(century) + " " + converter.toWords(littleyear)
  }

  datestring = englishMonths[month] + ' ' + converter.toWordsOrdinal(date) + ', in the year ' + yearstring

  return timestring + " " + daystring + datestring
}

module.exports = EnglishTime
