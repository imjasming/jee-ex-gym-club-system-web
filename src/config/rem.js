(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      let clientHeight = docEl.clientHeight
      let clientWidth = docEl.clientWidth

      if (!clientWidth) return
      docEl.style.width = 0.75 * clientHeight + 'px'
      clientWidth = docEl.clientWidth
      docEl.style.fontSize = 10 * (clientWidth / 320) + 'px'
    }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
