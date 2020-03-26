;(function(doc, win, designWidth) {
  var html = doc.documentElement
  function refreshRem() {
    var clientWidth = html.clientWidth
    if (clientWidth >= designWidth) {
      html.style.fontSize = '100px'
    } else {
      html.style.fontSize = `${(clientWidth / designWidth) * 100}px`
    }
  }
  win.addEventListener('DOMContentLoaded', refreshRem)
})(document, window, 750)
