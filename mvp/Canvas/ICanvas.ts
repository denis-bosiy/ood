import { CPoint } from "../Point/CPoint";
import { ICanvasElement } from "../CanvasElement/ICanvasElement";

export interface ICanvas {
    drawPolygon(points: CPoint[], isActive?: boolean, id?: string): void;
    drawEllipse(centerPoint: CPoint, radiusX: number, radiusY: number, isActive?: boolean, id?: string): void;
    clear(): void;

    getShape(id: string): ICanvasElement | null;
    getCurrentShape(): ICanvasElement | null;
}