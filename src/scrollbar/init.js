import { DEFAULT_OPTIONS } from '../utils/constant'

export function initMixin (CustomScrollbar) {
  CustomScrollbar.prototype._init = function (el, options) {
    this.options = Object.assign(DEFAULT_OPTIONS, options)

    this._styleInit()
  }
}