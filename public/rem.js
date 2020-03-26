// ;(function(doc, win, designWidth) {
//   var html = doc.documentElement
//   function refreshRem() {
//     var clientWidth = html.clientWidth
//     if (clientWidth >= designWidth) {
//       html.style.fontSize = '100px'
//     } else {
//       html.style.fontSize = `${(clientWidth / designWidth) * 100}px`
//     }
//   }
//   win.addEventListener('DOMContentLoaded', refreshRem)
// })(document, window, 750)

;(function(doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function() {
    console.log('resize')
    var clientWidth = docEl.clientWidth
    var clientHeight = docEl.clientHeight
    if (!clientWidth) return
    if (clientWidth >= 750) {
      clientWidth = 750
    }
    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
    docEl.dataset.percent = 100 * (clientWidth / 750)
    docEl.dataset.width = clientWidth
    docEl.dataset.height = clientHeight
  }
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  win.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
