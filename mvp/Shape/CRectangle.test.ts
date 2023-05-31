import { CRectangle } from "./CRectangle";
import { CFrame } from "../Frame/CFrame";
import { CPoint } from "../Point/CPoint";
import { IShape } from "./IShape";
import { ICanvas } from "../Canvas/ICanvas";
import { ICanvasElement } from "../CanvasElement/ICanvasElement";
import { CExportShape } from "./CExportShape";
import { ShapeType } from "../shapeType";

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
        const ellipse: IShape = new CRectangle(frame, new CPoint(20, 30), 40, 50);

        const returnedFrame: CFrame = ellipse.getFrame();

        expect(returnedFrame).toBe(frame);
    });

    test("setFrame should change shape's frame", () => {
        const oldFrame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CRectangle(oldFrame, new CPoint(20, 30), 40, 50);
        const newFrame: CFrame = new CFrame(10, 20, 30, 40);

        ellipse.setFrame(newFrame);

        expect(ellipse.getFrame().x).toBe(newFrame.x);
        expect(ellipse.getFrame().y).toBe(newFrame.y);
        expect(ellipse.getFrame().width).toBe(newFrame.width);
        expect(ellipse.getFrame().height).toBe(newFrame.height);
    });

    test("draw should invoke drawPolygon with right parameters", () => {
        const canvas: ICanvas = new CMockCanvas();
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const rectangle: IShape = new CRectangle(frame, new CPoint(20, 30), 40, 50);

        rectangle.draw(canvas, false);

        expect(mockDrawPolygon).toBeCalledTimes(1);
        expect(mockDrawPolygon.mock.calls[0][0].length).toBe(4);
        expect(mockDrawPolygon.mock.calls[0][0][0].x).toBe(20);
        expect(mockDrawPolygon.mock.calls[0][0][0].y).toBe(30);
        expect(mockDrawPolygon.mock.calls[0][0][1].x).toBe(60);
        expect(mockDrawPolygon.mock.calls[0][0][1].y).toBe(30);
        expect(mockDrawPolygon.mock.calls[0][0][2].x).toBe(60);
        expect(mockDrawPolygon.mock.calls[0][0][2].y).toBe(80);
        expect(mockDrawPolygon.mock.calls[0][0][3].x).toBe(20);
        expect(mockDrawPolygon.mock.calls[0][0][3].y).toBe(80);
        expect(mockDrawPolygon.mock.calls[0][1]).toBe(false);
        expect(mockDrawPolygon.mock.calls[0][2]).toBe(rectangle.getId());
    });

    test("export should return CExportShape with right attributes", () => {
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CRectangle(frame, new CPoint(20, 30), 40, 50);

        const exportShape: CExportShape = ellipse.export();

        expect(exportShape.frame).toBe(frame);
        expect(exportShape.shapeType).toBe(ShapeType.Rectangle);
        expect(Object.keys(exportShape.additionAttributes).length).toBe(3);
        expect(exportShape.additionAttributes.leftTopPoint.x).toBe(20);
        expect(exportShape.additionAttributes.leftTopPoint.y).toBe(30);
        expect(exportShape.additionAttributes.width).toBe(40);
        expect(exportShape.additionAttributes.height).toBe(50);
    });
});