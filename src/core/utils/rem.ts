const htmlRem = () => {
  const docEl = document.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalculated = () => {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = `${10 * (clientWidth / 192)}px`
  }
  if (!document.addEventListener) return
  window.addEventListener(resizeEvt, recalculated, false)
  document.addEventListener('DOMContentLoaded', recalculated, false)
}

export default htmlRem
