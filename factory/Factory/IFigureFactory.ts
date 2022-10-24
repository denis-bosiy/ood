import { CFigure, Color } from "../Figure/CFigure";
import { CPoint } from "../Figure/CPoint";

export interface IFigureFactory {
    createEllipse(centerPoint: CPoint, largeSemiAxis: number, smallSemiAxis: number, color: Color): CFigure;
    createRectangle(leftTopPoint: CPoint, width: number, height: number, color: Color): CFigure;
    createTriangle(points: CPoint[], color: Color): CFigure;
    createCross(centerPoint: CPoint, length: number, color: Color): CFigure;
}