import { addEvent } from '../utils/dom'

export function eventMixin (CustomScrollbar) {
  CustomScrollbar.prototype._addDOMEvents = function () {
    let eventOperation = addEvent
    this._handleDOMEvents(eventOperation)
  }

  CustomScrollbar.prototype._handleDOMEvents = function (eventOperation) {
    let target = this.scrollContent
    eventOperation(target, 'scroll', this)
  }

  CustomScrollbar.prototype.handleEvent = function (e) {
    switch (e.type) {
      case 'scroll': {
        this._calculateTrackOffset()
        break
      }
    }
  }
}