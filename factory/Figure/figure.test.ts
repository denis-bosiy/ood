import { ICanvas } from "../canvas/ICanvas";
import { CCross } from "./CCross";
import { CEllipse } from "./CEllipse";
import { Color } from "./CFigure";
import { CPoint } from "./CPoint";
import { CRectangle } from "./CRectangle";
import { CTriangle } from "./CTriangle";

class CMockCanvas implements ICanvas {
    constructor() {}

    public drawLine(from: CPoint, to: CPoint, outlineColor: string): void {
        console.log(from.x(), from.y(), to.x(), to.y(), outlineColor);
    }

    public drawEllipse(center: CPoint, largeSemiAxis: number, smallSemiAxis: number, outlineColor: string): void {
        console.log(center.x(), center.y(), largeSemiAxis, smallSemiAxis, outlineColor);
    }

    public clear(): void { }
    public saveToPng(path: string): Promise<string> { return new Promise(function (resolve, reject) { }) }
}

describe("figure creation", () => {
    const log = console.log;
    const canvas: ICanvas = new CMockCanvas();
  
    beforeEach(() => {
      console.log = jest.fn();
    });
  
    afterAll(() => {
      console.log = log;
    });

    test("parameters of created ellipse should be 10, 20, 30, 40, red", () => {
        const ellipse: CEllipse = new CEllipse(new CPoint(10, 20), 30, 40, Color.Red);

        ellipse.draw(canvas);

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe(10);
        expect((console.log as jest.Mock).mock.calls[0][1]).toBe(20);
        expect((console.log as jest.Mock).mock.calls[0][2]).toBe(30);
        expect((console.log as jest.Mock).mock.calls[0][3]).toBe(40);
        expect((console.log as jest.Mock).mock.calls[0][4]).toBe("red");
    });
    
    test("parameters of created rectangle should be 10, 20, 30, 40, red", () => {
        const rectangle: CRectangle = new CRectangle(new CPoint(10, 20), 20, 20, Color.Red);

        rectangle.draw(canvas);

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe(10);
        expect((console.log as jest.Mock).mock.calls[0][1]).toBe(20);
        expect((console.log as jest.Mock).mock.calls[0][2]).toBe(30);
        expect((console.log as jest.Mock).mock.calls[0][3]).toBe(20);
        expect((console.log as jest.Mock).mock.calls[0][4]).toBe("red");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe(30);
        expect((console.log as jest.Mock).mock.calls[1][1]).toBe(20);
        expect((console.log as jest.Mock).mock.calls[1][2]).toBe(30);
        expect((console.log as jest.Mock).mock.calls[1][3]).toBe(40);
        expect((console.log as jest.Mock).mock.calls[1][4]).toBe("red");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe(30);
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe(40);
        expect((console.log as jest.Mock).mock.calls[2][2]).toBe(10);
        expect((console.log as jest.Mock).mock.calls[2][3]).toBe(40);
        expect((console.log as jest.Mock).mock.calls[2][4]).toBe("red");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe(10);
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(40);
        expect((console.log as jest.Mock).mock.calls[3][2]).toBe(10);
        expect((console.log as jest.Mock).mock.calls[3][3]).toBe(20);
        expect((console.log as jest.Mock).mock.calls[3][4]).toBe("red");
    });

    test("parameters of created triangle should be 10, 20, 30, 40, 50, 60, red", () => {
        const triangle: CTriangle = new CTriangle([new CPoint(10, 20), new CPoint(30, 40), new CPoint(50, 60)], Color.Red);

        triangle.draw(canvas);

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe(10);
        expect((console.log as jest.Mock).mock.calls[0][1]).toBe(20);
        expect((console.log as jest.Mock).mock.calls[0][2]).toBe(30);
        expect((console.log as jest.Mock).mock.calls[0][3]).toBe(40);
        expect((console.log as jest.Mock).mock.calls[0][4]).toBe("red");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe(30);
        expect((console.log as jest.Mock).mock.calls[1][1]).toBe(40);
        expect((console.log as jest.Mock).mock.calls[1][2]).toBe(50);
        expect((console.log as jest.Mock).mock.calls[1][3]).toBe(60);
        expect((console.log as jest.Mock).mock.calls[1][4]).toBe("red");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe(50);
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe(60);
        expect((console.log as jest.Mock).mock.calls[2][2]).toBe(10);
        expect((console.log as jest.Mock).mock.calls[2][3]).toBe(20);
        expect((console.log as jest.Mock).mock.calls[2][4]).toBe("red");
    });

    test("parameters of created cross should be 10, 20, 30, red", () => {
        const cross: CCross = new CCross(new CPoint(10, 20), 30, Color.Red);

        cross.draw(canvas);

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe(10);
        expect((console.log as jest.Mock).mock.calls[0][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[0][2]).toBe(10);
        expect((console.log as jest.Mock).mock.calls[0][3]).toBe(35);
        expect((console.log as jest.Mock).mock.calls[0][4]).toBe("red");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe(-5);
        expect((console.log as jest.Mock).mock.calls[1][1]).toBe(20);
        expect((console.log as jest.Mock).mock.calls[1][2]).toBe(25);
        expect((console.log as jest.Mock).mock.calls[1][3]).toBe(20);
        expect((console.log as jest.Mock).mock.calls[1][4]).toBe("red");
    });
});