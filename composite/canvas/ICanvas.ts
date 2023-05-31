import { CPoint } from "../CPoint";

export interface ICanvas {
    drawLine(from: CPoint, to: CPoint): void;
    drawEllipse(center: CPoint, radiusX: number, radiusY: number): void;
    fillEllipse(center: CPoint, radiusX: number, radiusY: number): void;
    fillPolygon(points: CPoint[]): void;
    setFillColor(color: string): void;
    setLineColor(color: string): void;
    setLineWidth(width: number): void;
    saveToPng(path: string): Promise<string>;
}