import { ICanvasElement } from "./ICanvasElement";
import { CCanvas } from "../Canvas/CCanvas";
import { getTopLeftPoint } from "../utils/points";
import { CPoint } from "../Point/CPoint";

export class CCanvasElement implements ICanvasElement {
    private m_htmlElement: HTMLElement;
    private m_canvas: CCanvas;

    constructor(canvas: CCanvas, htmlElement: HTMLElement) {
        this.m_canvas = canvas;
        this.m_htmlElement = htmlElement;
    }

    public getX(): number {
        let x: number = 0;

        if (this.m_htmlElement.tagName === "g") {
            x = this.getFrame()?.getX() ?? -1;
        } else if (this.m_htmlElement.tagName === "rect") {
            x = Number(this.m_htmlElement.getAttribute("x")) ?? -1;
        }

        return x;
    }

    public getY(): number {
        let y: number = 0;

        if (this.m_htmlElement.tagName === "g") {
            y = this.getFrame()?.getY() ?? -1;
        } else if (this.m_htmlElement.tagName === "rect") {
            y = Number(this.m_htmlElement.getAttribute("y")) ?? -1;
        }

        return y;
    }

    public getWidth(): number {
        let width: number = 0;

        if (this.m_htmlElement.tagName === "g") {
            width = this.getFrame()?.getWidth() ?? -1;
        } else if (this.m_htmlElement.tagName === "rect") {
            width = Number(this.m_htmlElement.getAttribute("width")) ?? -1;
        }

        return width;
    }

    public getHeight(): number {
        let height: number = 0;

        if (this.m_htmlElement.tagName === "g") {
            height = this.getFrame()?.getHeight() ?? -1;
        } else if (this.m_htmlElement.tagName === "rect") {
            height = Number(this.m_htmlElement.getAttribute("height")) ?? -1;
        }

        return height;
    }

    public setX(x: number): void {
        if (x <= 0 || x + this.getWidth() >= this.m_canvas.getWidth()) return;
    
        if (this.m_htmlElement.tagName === "g") {
            const ellipse: SVGEllipseElement | null = this.m_htmlElement.querySelector("ellipse");
            const polygon: SVGPolygonElement | null = this.m_htmlElement.querySelector("polygon");
            const frame: ICanvasElement | null = this.getFrame();
            const resizer: ICanvasElement | null = this.getResizer();

            if (ellipse) {
                const rx: string | null = ellipse.getAttribute("rx");
                if (rx) {
                    const cx: number = x + Number(ellipse.getAttribute("rx"));
                    ellipse.setAttribute("cx", cx.toString());
                }
            }
            if (polygon) {
                const oldPoints: CPoint[] | undefined = polygon.getAttribute("points")?.split(' ').map((str: string) => {
                    const points: string[] = str.split(",");

                    return new CPoint(Number(points[0]), Number(points[1]))
                });
                if (oldPoints) {
                    const leftTopPoint: CPoint = getTopLeftPoint(oldPoints);
                    const deltaX = x - leftTopPoint.x;

                    const newPoints: string[] = oldPoints.map((oldPoint: CPoint) => {
                        oldPoint.x += deltaX;
                        return oldPoint.toString(",")
                    });

                    polygon.setAttribute("points", newPoints.join(" "));
                }
            }

            if (frame && resizer) {
                frame.setX(x);
                resizer.setX(x + frame.getWidth() - resizer.getWidth() / 2);
            }
        } else if (this.m_htmlElement.tagName === "rect") {
            this.m_htmlElement.setAttribute("x", x.toString());
        }
    }

    public setY(y: number): void {
        if (y <= 0 || y + this.getHeight() >= this.m_canvas.getHeight()) return;

        if (this.m_htmlElement.tagName === "g") {
            const ellipse: SVGEllipseElement | null = this.m_htmlElement.querySelector("ellipse");
            const polygon: SVGPolygonElement | null = this.m_htmlElement.querySelector("polygon");
            const frame: ICanvasElement | null = this.getFrame();
            const resizer: ICanvasElement | null = this.getResizer();

            if (ellipse) {
                const ry: string | null = ellipse.getAttribute("ry");
                if (ry) {
                    const cy: number = y + Number(ellipse.getAttribute("ry"));
                    ellipse.setAttribute("cy", cy.toString());
                }
            }
            if (polygon) {
                const oldPoints: CPoint[] | undefined = polygon.getAttribute("points")?.split(' ').map((str: string) => {
                    const points: string[] = str.split(",");

                    return new CPoint(Number(points[0]), Number(points[1]))
                });
                if (oldPoints) {
                    const leftTopPoint: CPoint = getTopLeftPoint(oldPoints);
                    const deltaY = y - leftTopPoint.y;

                    const newPoints: string[] = oldPoints.map((oldPoint: CPoint) => {
                        oldPoint.y += deltaY;
                        return oldPoint.toString(",")
                    });

                    polygon.setAttribute("points", newPoints.join(" "));
                }
            }

            if (frame && resizer) {
                frame.setY(y);
                resizer.setY(y + frame.getHeight() - resizer.getHeight() / 2);
            }
        } else if (this.m_htmlElement.tagName === "rect") {
            this.m_htmlElement.setAttribute("y", y.toString());
        }
    }

    public setWidth(width: number): void {
        if (width <= 0 || this.getX() + width >= this.m_canvas.getWidth()) return;

        if (this.m_htmlElement.tagName === "g") {
            const frame: ICanvasElement | null = this.getFrame();
            const resizer: ICanvasElement | null = this.getResizer();

            if (frame && resizer) {
                const oldFrameWidth: number = frame.getWidth();

                frame.setWidth(width);
                resizer.setX(resizer.getX() + frame.getWidth() - oldFrameWidth);
            }
        } else if (this.m_htmlElement.tagName === "rect") {
            this.m_htmlElement.setAttribute("width", width.toString());
        }
    }

    public setHeight(height: number): void {
        if (height <= 0 || this.getY() + height >= this.m_canvas.getHeight()) return;

        if (this.m_htmlElement.tagName === "g") {
            const frame: ICanvasElement | null = this.getFrame();
            const resizer: ICanvasElement | null = this.getResizer();

            if (frame && resizer) {
                const oldFrameHeight: number = frame.getHeight();

                frame.setHeight(height);
                resizer.setY(resizer.getY() + frame.getHeight() - oldFrameHeight);
            }
        } else if (this.m_htmlElement.tagName === "rect") {
            this.m_htmlElement.setAttribute("height", height.toString());
        }
    }

    public addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
        this.m_htmlElement.addEventListener(type, listener);
    }

    public removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void {
        this.m_htmlElement.removeEventListener(type, listener);
    }

    public dispatchEvent(event: Event): boolean {
        return this.m_htmlElement.dispatchEvent(event);
    }

    public getResizer(): ICanvasElement | null {
        const resizer: HTMLElement | null = this.m_htmlElement.querySelector(`#${this.m_canvas.RESIZER_ID}`);

        return resizer ? new CCanvasElement(this.m_canvas, resizer) : null;
    }

    public getFrame(): ICanvasElement | null {
        const frame: HTMLElement | null = this.m_htmlElement.querySelector(`#${this.m_canvas.FRAME_ID}`);

        return frame ? new CCanvasElement(this.m_canvas, frame) : null;
    }
}