export function getRect (el) {
  let rect = el.getBoundingClientRect()
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height
  }
}

export function addEvent (el, type, fn, capture) {
  el.addEventListener(type, fn, {passive: false, capture: !!capture})
}

export function removeEvent(el, type, fn, capture) {
  el.removeEventListener(type, fn, {passive: false, capture: !!capture})
}