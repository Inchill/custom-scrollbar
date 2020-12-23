import { getRect } from '../utils/dom'

export function coreMixin (CustomScrollbar) {
  CustomScrollbar.prototype._styleInit = function () {
    this.wrapperStyle.overflow = 'scroll'
    this.wrapperStyle.position = 'relative'

    this.contentStyle.width = 'fit-content'
    this.contentStyle.height = 'fit-content'
    this.contentStyle.overflow = 'scroll'
  
    // set the style of -webkit-scrollbar.
    let styleElement = document.createElement('style')
    styleElement.appendChild(document.createTextNode('div::-webkit-scrollbar { display: none }'))
    this.content.appendChild(styleElement)

    this._createCustomScrollbar()
  }

  CustomScrollbar.prototype._setStyle = function () {
    this.scrollbar = document.querySelector('.custom-scrollbar')
    this.scrollbarStyle = this.scrollbar.style

    this.thumb = document.querySelector('.custom-scrollbar-thumb')
    this.thumbStyle = this.thumb.style

    this.track = document.querySelector('.custom-scrollbar-track')
    this.trackStyle = this.track.style

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

  CustomScrollbar.prototype._calculateCtntChildrenSize = function () {
    const len = this.content.children.length
    const totalSize = {
      width: 0,
      height: 0
    }

    for (var i = 0; i < len; i++) {
      const child = this.content.children[i]
      const childRect = getRect(child)
      totalSize.width += childRect.width
      totalSize.height += childRect.height
    }
  }
}