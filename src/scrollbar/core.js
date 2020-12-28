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
    this.scrollbar = document.querySelector('.custom-scrollbar')
    this.scrollbarStyle = this.scrollbar.style

    this.thumb = document.querySelector('.custom-scrollbar-thumb')
    this.thumbStyle = this.thumb.style
    this.thumbStyle.position = 'relative'

    this.track = document.querySelector('.custom-scrollbar-track')
    this.trackStyle = this.track.style
    this.trackStyle.position = 'absolute'

    const wrapperRect = getRect(this.wrapper)
    const contentRect = getRect(this.content)
    const contentWidth = contentRect.width
    const wrapperWidth = wrapperRect.width
    
    this.scrollbarStyle.width = this.options.scrollbarWidth + 'px'
    this.scrollbarStyle.height = this.options.scrollbarHeight + 'px'
    this.scrollbarStyle.position = 'absolute'
    this.scrollbarStyle.bottom = 0
    this.scrollbarStyle.left = '50%'
    this.scrollbarStyle.transform = 'translateX(-50%)'

    const radio = wrapperWidth / contentWidth * 100
    this.trackStyle.width = `${radio}%`
  }

  CustomScrollbar.prototype.setStyle = function () {
    
  }

  CustomScrollbar.prototype._createCustomScrollbar = function () {
    // 1. create scrollbar
    let scrollbar = document.createElement('div')
    scrollbar.classList.add('custom-scrollbar')
    // 2. create thumb
    let thumb = document.createElement('div')
    thumb.classList.add('custom-scrollbar-thumb')
    // 3. create track
    let track = document.createElement('div')
    track.classList.add('custom-scrollbar-track')
    // 4. append child
    thumb.appendChild(track)
    scrollbar.appendChild(thumb)
    this.wrapper.appendChild(scrollbar)

    this._setScrollbarStyle()
  }

  CustomScrollbar.prototype._createScrollContent = function () {
    // In order to prevent the custom scrollbar from scrolling with the wrapper, a layer of scrollContent is added to the content element.
    let scrollContent = document.createElement('div')
    scrollContent.appendChild(this.content)
    this.wrapper.appendChild(scrollContent)

    this.scrollContent = scrollContent
    this.scrollContentStyle = this.scrollContent.style
  }

  CustomScrollbar.prototype._calculateTrackOffset = function (e) {
    const scrollLeft = this.scrollContent.scrollLeft
    const contentRect = getRect(this.content)
    const contentWidth = contentRect.width

    const leftRadio = scrollLeft / contentWidth * 100
    this.trackStyle.left = `${leftRadio}%`
  }
}