import { CPoint } from "../Figure/CPoint";

export interface ISavableCanvas extends ICanvas {
    saveToPng(path: string): Promise<string>;
}

export interface ICanvas {
    drawLine(from: CPoint, to: CPoint, outlineColor: string): void;
    drawEllipse(center: CPoint, largeSemiAxis: number, smallSemiAxis: number, outlineColor: string): void;
    clear(): void;
}