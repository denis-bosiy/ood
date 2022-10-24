import { CCross } from "../Figure/CCross";
import { CEllipse } from "../Figure/CEllipse";
import { Color } from "../Figure/CFigure";
import { CPoint } from "../Figure/CPoint";
import { CRectangle } from "../Figure/CRectangle";
import { CTriangle } from "../Figure/CTriangle";
import { CFigureFactory } from "./CFigureFactory";

describe("test factory", () => {
    const figureFactory: CFigureFactory = new CFigureFactory();

    test("createEllipse should return ellipse with passed parameters", () => {
        const ellipse: CEllipse = figureFactory.createEllipse(new CPoint(1, 2), 3, 4, Color.Red);

        expect(ellipse.centerPoint.x()).toBe(1);
        expect(ellipse.centerPoint.y()).toBe(2);
        expect(ellipse.largeSemiAxis).toBe(3);
        expect(ellipse.smallSemiAxis).toBe(4);
        expect(ellipse.color).toBe(Color.Red);
    });

    test("createRectangle should return rectangle with passed parameters", () => {
        const rectangle: CRectangle = figureFactory.createRectangle(new CPoint(1, 2), 3, 4, Color.Red);

        expect(rectangle.leftTopPoint.x()).toBe(1);
        expect(rectangle.leftTopPoint.y()).toBe(2);
        expect(rectangle.rightBottomPoint.x()).toBe(4);
        expect(rectangle.rightBottomPoint.y()).toBe(6);
        expect(rectangle.color).toBe(Color.Red);
    });

    test("createTriangle should return triangle with passed parameters", () => {
        const triangle: CTriangle = figureFactory.createTriangle([new CPoint(1, 2), new CPoint(3, 4), new CPoint(5, 6)], Color.Red);

        expect(triangle.points[0].x()).toBe(1);
        expect(triangle.points[0].y()).toBe(2);
        expect(triangle.points[1].x()).toBe(3);
        expect(triangle.points[1].y()).toBe(4);
        expect(triangle.points[2].x()).toBe(5);
        expect(triangle.points[2].y()).toBe(6);
        expect(triangle.color).toBe(Color.Red);
    });

    test("createCross should return cross with passed parameters", () => {
        const cross: CCross = figureFactory.createCross(new CPoint(1, 2), 3, Color.Red);

        expect(cross.centerPoint.x()).toBe(1);
        expect(cross.centerPoint.y()).toBe(2);
        expect(cross.length).toBe(3);
        expect(cross.color).toBe(Color.Red);
    });
});