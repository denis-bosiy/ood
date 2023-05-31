import { ICanvas } from "./ICanvas";
import { CPoint } from "../Point/CPoint";
import { getBottomRightPoint, getHeight, getTopLeftPoint, getWidth } from "../utils/points";
import { ICanvasElement } from "../CanvasElement/ICanvasElement";
import { CCanvasElement } from "../CanvasElement/CCanvasElement";

export class CCanvas implements ICanvas {
    public readonly RESIZER_ID: string = "resizer";
    public readonly CURRENT_SHAPE_ID: string = "current-shape";
    public readonly FRAME_ID: string = "frame";
    private readonly DEFAULT_RESIZER_SIZE: number = 6;

    private m_canvasElement: HTMLElement;
    private m_width: number;
    private m_height: number;

    constructor(canvasElement: HTMLElement, width: number, height: number) {
        this.m_canvasElement = canvasElement;
        this.m_width = width;
        this.m_height = height;
    }

    public drawPolygon(points: CPoint[], isActive: boolean = false, id?: string): void {
        const resizerSize: number = isActive ? this.DEFAULT_RESIZER_SIZE : 0;
        const additionalGAttributes: string[] = [];
        const additionalShapeAttributes: string[] = [];
        const activeClass: string = "-active";
        const frameTopLeftPoint: CPoint = getTopLeftPoint(points);
        const frameBottomRightPoint: CPoint = getBottomRightPoint(points);
        const frameWidth: number = getWidth(points);
        const frameHeight: number = getHeight(points);
        const frame: string = `<rect ${isActive ? `id="${this.FRAME_ID}"` : ""} x="${frameTopLeftPoint.x}" y="${frameTopLeftPoint.y}" width="${frameWidth}" height="${frameHeight}" style="fill:none;stroke:red;stroke-width:${isActive ? 2 : 0}"/>`;
        const resizer: string = `<rect class="resizer" ${isActive ? `id="${this.RESIZER_ID}"` : ""} x=${frameBottomRightPoint.x - resizerSize / 2} y="${frameBottomRightPoint.y - resizerSize / 2}" width="${resizerSize}" height="${resizerSize}" style="fill:red;" />`;
        if (isActive) {
            additionalShapeAttributes.push(`id="current-shape"`);
        }
        if (id) {
            additionalGAttributes.push(`id="${id}"`);
        }

        this.m_canvasElement.innerHTML += `<g ${additionalGAttributes.join(" ")}><polygon class="shape ${isActive ? activeClass : ""}" ${additionalShapeAttributes.join(" ")} points="${points.map((point: CPoint) => point.toString(',')).join(' ')}" />${frame}${resizer}</g>`
    }

    public drawEllipse(center: CPoint, radiusX: number, radiusY: number, isActive: boolean = false, id?: string): void {
        const resizerSize: number = isActive ? this.DEFAULT_RESIZER_SIZE : 0;
        const additionalGAttributes: string[] = [];
        const additionalShapeAttributes: string[] = [];
        const activeClass: string = "-active";
        const frameTopLeftPoint: CPoint = new CPoint(center.x - radiusX, center.y - radiusY);
        const frameBottomRightPoint: CPoint = new CPoint(center.x + radiusX, center.y + radiusY);
        const frameWidth: number = radiusX * 2;
        const frameHeight: number = radiusY * 2;
        const frame: string = `<rect ${isActive ? `id="${this.FRAME_ID}"` : ""} x="${frameTopLeftPoint.x}" y="${frameTopLeftPoint.y}" width="${frameWidth}" height="${frameHeight}" style="fill:none;stroke:red;stroke-width:${isActive ? 2 : 0}"/>`;
        const resizer: string = `<rect class="resizer" ${isActive ? `id="${this.RESIZER_ID}"` : ""} x=${frameBottomRightPoint.x - resizerSize / 2} y="${frameBottomRightPoint.y - resizerSize / 2}" width="${resizerSize}" height="${resizerSize}" style="fill:red;" />`;
        if (isActive) {
            additionalShapeAttributes.push(`id="current-shape"`);
        }
        if (id) {
            additionalGAttributes.push(`id="${id}"`);
        }

        this.m_canvasElement.innerHTML += `<g ${additionalGAttributes.join(" ")}><ellipse class="shape ${isActive ? activeClass : ""}" ${additionalShapeAttributes.join(" ")} cx="${center.x}" cy="${center.y}" rx="${radiusX}" ry="${radiusY}"/>${frame}${resizer}</g>`
    }

    public clear(): void {
        this.m_canvasElement.innerHTML = "";
    }

    public getShape(id: string): ICanvasElement | null {
        const shape: HTMLElement | null = this.m_canvasElement.querySelector(`#${id}`);

        return shape ? new CCanvasElement(this, shape) : null;
    }

    public getCurrentShape(): ICanvasElement | null {
        const currentShape: HTMLElement | null = this.m_canvasElement.querySelector(`#${this.CURRENT_SHAPE_ID}`);

        return currentShape ? new CCanvasElement(this, currentShape) : null;
    }

    public getWidth(): number {
        return this.m_width;
    }

    public getHeight(): number {
        return this.m_height;
    }
}