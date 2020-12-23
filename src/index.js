import { initMixin } from './scrollbar/init'
import { coreMixin } from './scrollbar/core'

function CustomScrollbar (el, options = {}) {
  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el
  if (!this.wrapper) {
    console.error('[warn]Can not resolve the wrapper')
  }

  this.content = this.wrapper.children[0]
  if (!this.content) {
    console.error('[warn]The wrapper need at least one child to be content.')
  }

  this.wrapperStyle = this.wrapper.style
  this.contentStyle = this.content.style

  this._init(el, options)
}

initMixin(CustomScrollbar)
coreMixin(CustomScrollbar)

module.exports = CustomScrollbar

