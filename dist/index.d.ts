import "oj-event";
export interface IZoomInOptions {
    margin?: number;
    background?: boolean;
    transition?: string | false;
}
export declare type IZoomCallback = (open: boolean, el: HTMLElement, data?: {
    x: number;
    y: number;
    scale: number;
}) => any;
export declare const zoomIn: (el: HTMLElement, { margin, background, transition }?: IZoomInOptions, cb?: IZoomCallback) => void;
export declare const zoomOut: (el: HTMLElement, cb?: IZoomCallback) => void;
