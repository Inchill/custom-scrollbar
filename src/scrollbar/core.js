import { getRect } from '../utils/dom'

export function coreMixin (CustomScrollbar) {
  CustomScrollbar.prototype._styleInit = function () {
    this.contentStyle.overflow = 'scroll'
  
    // set the style of -webkit-scrollbar.
    let styleElement = document.createElement('style')
    styleElement.appendChild(document.createTextNode('div ::-webkit-scrollbar { display: none }'))
    this.content.appendChild(styleElement)
  }

  CustomScrollbar.prototype._setStyle = function () {
    this.scrollbar = document.querySelector('.custom-scrollbar')
    this.scrollbarStyle = this.scrollbar.style

    this.thumb = document.querySelector('.custom-scrollbar-thumb')
    this.thumbStyle = this.thumb.style

    this.track = document.querySelector('.custom-scrollbar-track')
    this.trackStyle = this.track.style

    const wrapperRect = getRect(this.wrapper)
    const contentWidth = this.content.scrollWidth
    const wrapperWidth = wrapperRect.width

    console.log('contetn width=', contentWidth)
    console.log('wrapper width=', wrapperWidth)
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

    this._setStyle()
  }
}