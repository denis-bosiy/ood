import { CFrame } from "../Frame/CFrame";
import { CPoint } from "../Point/CPoint";
import { IShape } from "./IShape";
import { ICanvas } from "../Canvas/ICanvas";
import { ICanvasElement } from "../CanvasElement/ICanvasElement";
import { CExportShape } from "./CExportShape";
import { ShapeType } from "../shapeType";
import { CTriangle } from "./CTriangle";

const mockDrawPolygon = jest.fn((points: CPoint[], isActive?: boolean, id?: string) => {});

class CMockCanvas implements ICanvas {
    drawPolygon(points: CPoint[], isActive?: boolean, id?: string): void {
        mockDrawPolygon(points, isActive, id);
    }
    drawEllipse(centerPoint: CPoint, radiusX: number, radiusY: number, isActive?: boolean, id?: string): void {}
    clear(): void {}

    getShape(id: string): ICanvasElement | null { return null}
    getCurrentShape(): ICanvasElement | null { return null }
}

describe("test CRectangle", () => {
    beforeEach(() => {
        mockDrawPolygon.mockClear();
    });

    test("getFrame should return frame of the shape", () => {
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const points: CPoint[] = [new CPoint(20, 80), new CPoint(30, 30), new CPoint(40, 80)];
        const triangle: IShape = new CTriangle(frame, points);

        const returnedFrame: CFrame = triangle.getFrame();

        expect(returnedFrame).toBe(frame);
    });

    test("setFrame should change shape's frame", () => {
        const oldFrame: CFrame = new CFrame(20, 30, 40, 50);
        const points: CPoint[] = [new CPoint(20, 80), new CPoint(30, 30), new CPoint(40, 80)];
        const triangle: IShape = new CTriangle(oldFrame, points);
        const newFrame: CFrame = new CFrame(10, 20, 30, 40);

        triangle.setFrame(newFrame);

        expect(triangle.getFrame().x).toBe(newFrame.x);
        expect(triangle.getFrame().y).toBe(newFrame.y);
        expect(triangle.getFrame().width).toBe(newFrame.width);
        expect(triangle.getFrame().height).toBe(newFrame.height);
    });

    test("draw should invoke drawPolygon with right parameters", () => {
        const canvas: ICanvas = new CMockCanvas();
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const points: CPoint[] = [new CPoint(20, 80), new CPoint(30, 30), new CPoint(40, 80)];
        const triangle: IShape = new CTriangle(frame, points);

        triangle.draw(canvas, false);

        expect(mockDrawPolygon).toBeCalledTimes(1);
        expect(mockDrawPolygon.mock.calls[0][0].length).toBe(3);
        expect(mockDrawPolygon.mock.calls[0][0][0].x).toBe(20);
        expect(mockDrawPolygon.mock.calls[0][0][0].y).toBe(80);
        expect(mockDrawPolygon.mock.calls[0][0][1].x).toBe(30);
        expect(mockDrawPolygon.mock.calls[0][0][1].y).toBe(30);
        expect(mockDrawPolygon.mock.calls[0][0][2].x).toBe(40);
        expect(mockDrawPolygon.mock.calls[0][0][2].y).toBe(80);
        expect(mockDrawPolygon.mock.calls[0][1]).toBe(false);
        expect(mockDrawPolygon.mock.calls[0][2]).toBe(triangle.getId());
    });

    test("export should return CExportShape with right attributes", () => {
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const points: CPoint[] = [new CPoint(20, 80), new CPoint(30, 30), new CPoint(40, 80)];
        const triangle: IShape = new CTriangle(frame, points);

        const exportShape: CExportShape = triangle.export();

        expect(exportShape.frame).toBe(frame);
        expect(exportShape.shapeType).toBe(ShapeType.Triangle);
        expect(Object.keys(exportShape.additionAttributes).length).toBe(1);
        expect(Object.keys(exportShape.additionAttributes.points).length).toBe(3);
        expect(exportShape.additionAttributes.points[0].x).toBe(20);
        expect(exportShape.additionAttributes.points[0].y).toBe(80);
        expect(exportShape.additionAttributes.points[1].x).toBe(30);
        expect(exportShape.additionAttributes.points[1].y).toBe(30);
        expect(exportShape.additionAttributes.points[2].x).toBe(40);
        expect(exportShape.additionAttributes.points[2].y).toBe(80);
    });
});