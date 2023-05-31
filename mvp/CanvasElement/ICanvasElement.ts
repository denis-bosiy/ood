export interface ICanvasElement {
    getResizer(): ICanvasElement | null;
    getFrame(): ICanvasElement | null;

    getX(): number;
    getY(): number;
    getWidth(): number;
    getHeight(): number;

    setX(x: number): void;
    setY(y: number): void;
    setWidth(width: number): void;
    setHeight(height: number): void;

    addEventListener?<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    removeEventListener?<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    dispatchEvent?(event: Event): boolean;
}