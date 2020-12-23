export function initMixin (CustomScrollbar) {
  CustomScrollbar.prototype._init = function (el, options) {
    this.options = options

    this._styleInit()
    this._createCustomScrollbar()
  }
}