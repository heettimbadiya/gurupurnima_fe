declare module "html2canvas" {
  interface Html2CanvasOptions {
    scale?: number
    logging?: boolean
    useCORS?: boolean
    allowTaint?: boolean
    backgroundColor?: string
    foreignObjectRendering?: boolean
    imageTimeout?: number
    ignoreElements?: (element: Element) => boolean
    onclone?: (document: Document) => void
    proxy?: string
    removeContainer?: boolean
    width?: number
    height?: number
    x?: number
    y?: number
    scrollX?: number
    scrollY?: number
    windowWidth?: number
    windowHeight?: number
  }

  export default function html2canvas(element: HTMLElement, options?: Html2CanvasOptions): Promise<HTMLCanvasElement>
}
