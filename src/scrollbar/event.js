import { addEvent } from '../utils/dom'

export function eventMixin (CustomScrollbar) {
  CustomScrollbar.prototype._addDOMEvents = function () {
    let eventOperation = addEvent
    this._handleDOMEvents(eventOperation)
  }

  CustomScrollbar.prototype._handleDOMEvents = function (eventOperation) {
    let target = this.scrollContent
    eventOperation(target, 'scroll', this)

    eventOperation(target, 'mousedown', this)
    eventOperation(target, 'mousemove', this)
    eventOperation(target, 'mousecancel', this)
    eventOperation(target, 'mouseup', this)

    eventOperation(target, 'touchstart', this)
    eventOperation(target, 'touchmove', this)
    eventOperation(target, 'touchcancel', this)
    eventOperation(target, 'touchend', this)
  }

  CustomScrollbar.prototype.handleEvent = function (e) {
    switch (e.type) {
      case 'scroll':
        this._calculateTrackOffset()
        break
      case 'touchstart':
      case 'mousedown':
        this._calculateTrackOffset()
        break
      case 'touchmove':
      case 'mousemove':
        this._calculateTrackOffset()
        break
      case 'touchend':
      case 'mouseup':
      case 'touchcancel':
      case 'mousecancel':
        this._calculateTrackOffset()
        break
    }
  }
}
