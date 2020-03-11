import "oj-event"

export interface IZoomInOptions {
  margin?: number,
  background?: boolean,
  transition?: string | false
}

export type IZoomCallback = (open: boolean, el: HTMLElement, data?: { x: number, y: number, scale: number }) => any

export const zoomIn = (el: HTMLElement, { margin, background, transition }: IZoomInOptions = {}, cb?: IZoomCallback) => {
  if (margin === undefined)
    margin = 80
  if (transition === undefined)
    transition = "transform .2s ease-out"
  if (transition !== false)
    Object.assign(el.style, { transition })
  let bg: HTMLElement
  if (background) bg = document.querySelector(".zoom-bg")
  if (background && !bg) {
    bg = document.createElement("div")
    bg.classList.add("zoom-bg")
    Object.assign(bg.style, { transition: transition === false ? "" : transition, position: "fixed", left: "0", top: "0", width: "100%", height: "100%", zIndex: "0", pointerEvents: "none", opacity: "0" })
    document.body.insertBefore(bg, document.body.firstChild)
  }

  setTimeout(() => {
    const rect = el.getBoundingClientRect()
    const container = { width: window.innerWidth - (margin * 2), height: window.innerHeight - (margin * 2) }
    const scale = Math.min(container.width / rect.width, container.height / rect.height)
    const x = -((rect.left - ((container.width / 2) - (rect.width / 2))) - margin) * (1 / scale)
    const y = -((rect.top - ((container.height / 2) - (rect.height / 2))) - margin) * (1 / scale)
    Object.assign(el.style, { transform: `scale(${scale}) translate3d(${x}px, ${y}px, 0)`, zIndex: "2" })
    el.classList.add("transform-zoom")
    if (bg) {
      Object.assign(bg.style, { opacity: "1", zIndex: "1", pointerEvents: "" })
      bg.classList.add("transform-zoom")
    }

    setTimeout(() => window.on("scroll.Zoom", e => zoomOut(el, cb)), 400)
    window.on("resize.Zoom", e => zoomOut(el, cb))
    if (bg) bg.on("click.Zoom", e => zoomOut(el, cb))

    if (cb) cb(true, el, { x, y, scale: scale })
  }, 100)
}

export const zoomOut = (el: HTMLElement, cb?: IZoomCallback) => {
  const bg = document.querySelector(".zoom-bg") as HTMLElement

  Object.assign(el.style, { transform: "" })
  el.classList.remove("transform-zoom")
  if (bg) {
    Object.assign(bg.style, { opacity: "0", pointerEvents: "none" })
    bg.classList.remove("transform-zoom")
  }
  setTimeout(() => {
    Object.assign(el.style, { zIndex: "" })
    if (bg) Object.assign(bg.style, { zIndex: "0" })

    if (cb) cb(false, el)
  }, 400)

  window.off("scroll.Zoom")
  window.off("resize.Zoom")
  if (bg) bg.off("click.Zoom")
}