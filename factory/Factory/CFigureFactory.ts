import { CCross } from "../Figure/CCross";
import { CEllipse } from "../Figure/CEllipse";
import { Color } from "../Figure/CFigure";
import { CPoint } from "../Figure/CPoint";
import { CRectangle } from "../Figure/CRectangle";
import { CTriangle } from "../Figure/CTriangle";
import { IFigureFactory } from "./IFigureFactory";

export class CFigureFactory implements IFigureFactory {
    constructor() { }

    createEllipse(centerPoint: CPoint, largeSemiAxis: number, smallSemiAxis: number, color: Color): CEllipse {
        return new CEllipse(centerPoint, largeSemiAxis, smallSemiAxis, color);
    }

    createRectangle(leftTopPoint: CPoint, width: number, height: number, color: Color): CRectangle {
        return new CRectangle(leftTopPoint, width, height, color);
    }

    createTriangle(points: CPoint[], color: Color): CTriangle {
        return new CTriangle(points, color);
    }

    createCross(centerPoint: CPoint, length: number, color: Color): CCross {
        return new CCross(centerPoint, length, color);
    }
}