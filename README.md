# Transform Zoom

## Usage

### import
```typescript
import { zoomIn, zoomOut } from "oj-transform-zoom";
```

### ZoomIn
default margin:     80px
default background: false
default transition: "transform .2s ease-out"

The class "transform-zoom" is added to the given element when it is zoomed-in.
If the background property is set to true, a new element with the class "zoom-bg" is added to the top of the body element.

The zoomOut function will be called when the user scrolls or clicks on the background or when the page is resized.
The 

```typescript
zoomIn(document.querySelector("some-element"))
```

```typescript
zoomIn(document.querySelector("some-element"), { margin: 20, background: true, transition: "transform 1s cubic-bezier(.25,.1,.51,1.35)" }, open => {
    document.body.classList.toggle("no-scroll", open)
})
```

### ZoomOut
The class "transform-zoom" is removed from the given element when it is zoomed-out.
The background element will be removed (if any).

```typescript
zoomOut(document.querySelector("some-element"))
```

```typescript
zoomOut(document.querySelector("some-element"), open => {
    document.body.classList.toggle("no-scroll", open)
})
```

## Types

### IZoomInOptions
```typescript
{ margin?: number,  background?: boolean, transition?: string | false }
```

### IZoomCallback
```typescript
(open: boolean, el: HTMLElement, data?: { x: number, y: number, scale: number }) => any
```