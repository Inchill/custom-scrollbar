import { getRect } from '../utils/dom'

export function coreMixin (CustomScrollbar) {
  CustomScrollbar.prototype._styleInit = function () {
    this.wrapperStyle.position = 'relative'

    this.contentStyle.width = 'fit-content'
    this.contentStyle.height = 'fit-content'
    this.contentStyle.overflow = 'scroll'

    // set the style of -webkit-scrollbar.
    let styleElement = document.createElement('style')
    styleElement.appendChild(document.createTextNode('div::-webkit-scrollbar { display: none }'))
    this.content.appendChild(styleElement)

    this._createScrollContent()
    this._createCustomScrollbar()

    this.scrollContentStyle.overflow = 'scroll'
    this.scrollContentStyle.width = 'inherit'
    this.scrollContentStyle.height = 'inherit'
  }

  CustomScrollbar.prototype._setScrollbarStyle = function () {
    this.thumbHStyle.position = this.thumbVStyle.position = 'relative'
    this.thumbHStyle.width = this.thumbVStyle.width = 'inherit'
    this.thumbHStyle.height = this.thumbVStyle.height = 'inherit'

    this.trackHStyle.position = this.trackVStyle.position = 'absolute'
    this.trackHStyle.height = this.trackVStyle.width = 'inherit'

    const wrapperRect = getRect(this.wrapper)
    const contentRect = getRect(this.content)
    const contentWidth = contentRect.width
    const wrapperWidth = wrapperRect.width
    const contentHeight = contentRect.height
    const wrapperHeight = wrapperRect.height

    // set horizontal scrollbar position, default at the bottom
    this.scrollbarHStyle.width = this.options.scrollbarHWidth + 'px'
    this.scrollbarHStyle.height = this.options.scrollbarHHeight + 'px'
    this.scrollbarHStyle.position = 'absolute'
    if (this.options.scrollbarHPos === 'top') {
      this.scrollbarHStyle.top = 0
    } else {
      this.scrollbarHStyle.bottom = 0
    }
    this.scrollbarHStyle.left = 0

    // set vertical scrollbar position, default at the right
    this.scrollbarVStyle.width = this.options.scrollbarVWidth + 'px'
    this.scrollbarVStyle.height = this.options.scrollbarVHeight + 'px'
    this.scrollbarVStyle.position = 'absolute'
    if (this.options.scrollbarVPos === 'left') {
      this.scrollbarVStyle.left = 0
    } else {
      this.scrollbarVStyle.right = 0
    }
    this.scrollbarVStyle.top = 0

    // set width or height radio of the track.
    const trackHRadio = wrapperWidth / contentWidth * 100
    const trackVRadio = wrapperHeight / contentHeight * 100
    if (trackHRadio === 100) {
      this.scrollbarHStyle.display = 'none'
    }
    if (trackVRadio === 100) {
      this.scrollbarVStyle.display = 'none'
    }
    this.trackHStyle.width = `${trackHRadio}%`
    this.trackVStyle.height = `${trackVRadio}%`
  }

  CustomScrollbar.prototype._createCustomScrollbar = function () {
    // 1. create scrollbar, this is used for positioning relative to the wrapper.
    let scrollbarH = document.createElement('div')
    let scrollbarV = document.createElement('div')
    scrollbarH.classList.add('custom-scrollbar_h')
    scrollbarV.classList.add('custom-scrollbar_v')
    // 2. create thumb
    let thumbH = document.createElement('div')
    let thumbV = document.createElement('div')
    thumbH.classList.add('custom-scrollbar-thumb_h')
    thumbV.classList.add('custom-scrollbar-thumb_v')
    // 3. create track, this is used to scroll relative to the thumb.
    let trackH = document.createElement('div')
    let trackV = document.createElement('div')
    trackH.classList.add('custom-scrollbar-track_h')
    trackV.classList.add('custom-scrollbar-track_v')
    // 4. append child
    thumbH.appendChild(trackH)
    thumbV.appendChild(trackV)
    scrollbarH.appendChild(thumbH)
    scrollbarV.appendChild(thumbV)
    this.wrapper.appendChild(scrollbarH)
    this.wrapper.appendChild(scrollbarV)

    this.scrollbarH = scrollbarH
    this.scrollbarHStyle = this.scrollbarH.style
    this.scrollbarV = scrollbarV
    this.scrollbarVStyle = this.scrollbarV.style

    this.thumbH = thumbH
    this.thumbHStyle = this.thumbH.style
    this.thumbV = thumbV
    this.thumbVStyle = this.thumbV.style

    this.trackH = trackH
    this.trackHStyle = this.trackH.style
    this.trackV = trackV
    this.trackVStyle = this.trackV.style

    this._setScrollbarStyle()
  }

  CustomScrollbar.prototype._createScrollContent = function () {
    // In order to prevent the custom scrollbar from scrolling with the wrapper,
    // a layer of scrollContent is added to the content element.
    let scrollContent = document.createElement('div')
    scrollContent.appendChild(this.content)
    this.wrapper.appendChild(scrollContent)

    this.scrollContent = scrollContent
    this.scrollContentStyle = this.scrollContent.style
  }

  CustomScrollbar.prototype._calculateTrackOffset = function (e) {
    const scrollLeft = this.scrollContent.scrollLeft
    const scrollTop = this.scrollContent.scrollTop
    const contentRect = getRect(this.content)
    const contentWidth = contentRect.width
    const contentHeight = contentRect.height

    const leftRadio = scrollLeft / contentWidth * 100
    const topRadio = scrollTop / contentHeight * 100
    this.trackHStyle.left = `${leftRadio}%`
    this.trackVStyle.top = `${topRadio}%`
  }
}
