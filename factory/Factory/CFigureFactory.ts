import { CCross } from "../Figure/CCross";
import { CEllipse } from "../Figure/CEllipse";
import { CFigure, Color } from "../Figure/CFigure";
import { CPoint } from "../Figure/CPoint";
import { CRectangle } from "../Figure/CRectangle";
import { CTriangle } from "../Figure/CTriangle";
import { IFigureFactory } from "./IFigureFactory";

enum AvailableFigures {
    Ellipse = "ellipse",
    Rectangle = "rectangle",
    Triangle = "triangle",
    Cross = "cross"
};

export class CFigureFactory implements IFigureFactory {
    constructor() { }

    createFigure(description: any[]): CFigure {
        if (description.length < 1) {
            throw new Error("Incorrect args count");
        }
        switch(description[0])
        {
            case AvailableFigures.Ellipse:
                if (description.length !== 5) {
                    throw new Error("Incorrect args count");
                }
                return this.createEllipse.apply(null, description.slice(1, description.length));
            case AvailableFigures.Rectangle:
                if (description.length !== 5) {
                    throw new Error("Incorrect args count");
                }
                return this.createRectangle.apply(null, description.slice(1, description.length));
            case AvailableFigures.Triangle:
                if (description.length !== 3) {
                    throw new Error("Incorrect args count");
                }
                return this.createTriangle.apply(null, description.slice(1, description.length));
            case AvailableFigures.Cross:
                if (description.length !== 4) {
                    throw new Error("Incorrect args count");
                }
                return this.createCross.apply(null, description.slice(1, description.length));
            default:
                throw new Error("Incorrect figure name");
        }
    }

    private createEllipse(centerPoint: CPoint, largeSemiAxis: number, smallSemiAxis: number, color: Color): CEllipse {
        return new CEllipse(centerPoint, largeSemiAxis, smallSemiAxis, color);
    }

    private createRectangle(leftTopPoint: CPoint, width: number, height: number, color: Color): CRectangle {
        return new CRectangle(leftTopPoint, width, height, color);
    }

    private createTriangle(points: CPoint[], color: Color): CTriangle {
        return new CTriangle(points, color);
    }

    private createCross(centerPoint: CPoint, length: number, color: Color): CCross {
        return new CCross(centerPoint, length, color);
    }
}