const formatTime = function(time) {
  const date = new Date(time)
  const year = date.getFullYear()
  const mouth = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date
    .getDate()
    .toString()
    .padStart(2, '0')
  return `${year}-${mouth}-${day}`
}
export const getDate = function() {
  const date = new Date()
  const dateTimes = date.getTime()
  const yesDateTimes = dateTimes - 24 * 60 * 60 * 1000
  return {
    today: formatTime(dateTimes),
    yestoday: formatTime(yesDateTimes)
  }
}
export const rem2px = function(rem) {
  const fontSize = parseFloat(document.documentElement.style.fontSize)
  return fontSize * parseFloat(rem)
}
