import { CEllipse } from "./CEllipse";
import { CFrame } from "../Frame/CFrame";
import { CPoint } from "../Point/CPoint";
import { IShape } from "./IShape";
import { ICanvas } from "../Canvas/ICanvas";
import { ICanvasElement } from "../CanvasElement/ICanvasElement";
import { CExportShape } from "./CExportShape";
import { ShapeType } from "../shapeType";

const mockDrawEllipse = jest.fn((centerPoint: CPoint, radiusX: number, radiusY: number, isActive?: boolean, id?: string) => {});

class CMockCanvas implements ICanvas {
    drawPolygon(points: CPoint[], isActive?: boolean, id?: string): void {}
    drawEllipse(centerPoint: CPoint, radiusX: number, radiusY: number, isActive?: boolean, id?: string): void {
        mockDrawEllipse(centerPoint, radiusX, radiusY, isActive, id);
    }
    clear(): void {}

    getShape(id: string): ICanvasElement | null { return null}
    getCurrentShape(): ICanvasElement | null { return null }
}

describe("test CEllipse", () => {
    beforeEach(() => {
        mockDrawEllipse.mockClear();
    });

    test("getFrame should return frame of the shape", () => {
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);

        const returnedFrame: CFrame = ellipse.getFrame();

        expect(returnedFrame).toBe(frame);
    });

    test("setFrame should change shape's frame", () => {
        const oldFrame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(oldFrame, new CPoint(40, 55), 20, 25);
        const newFrame: CFrame = new CFrame(10, 20, 30, 40);

        ellipse.setFrame(newFrame);

        expect(ellipse.getFrame().x).toBe(newFrame.x);
        expect(ellipse.getFrame().y).toBe(newFrame.y);
        expect(ellipse.getFrame().width).toBe(newFrame.width);
        expect(ellipse.getFrame().height).toBe(newFrame.height);
    });

    test("draw should invoke drawEllipse with defined parameters", () => {
        const canvas: ICanvas = new CMockCanvas();
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);

        ellipse.draw(canvas, false);

        expect(mockDrawEllipse).toBeCalledTimes(1);
        expect(mockDrawEllipse.mock.calls[0][0].x).toBe(40);
        expect(mockDrawEllipse.mock.calls[0][0].y).toBe(55);
        expect(mockDrawEllipse.mock.calls[0][1]).toBe(20);
        expect(mockDrawEllipse.mock.calls[0][2]).toBe(25);
        expect(mockDrawEllipse.mock.calls[0][3]).toBe(false);
        expect(mockDrawEllipse.mock.calls[0][4]).toBe(ellipse.getId());
    });

    test("export should return CExportShape with right attributes", () => {
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);

        const exportShape: CExportShape = ellipse.export();

        expect(exportShape.frame).toBe(frame);
        expect(exportShape.shapeType).toBe(ShapeType.Ellipse);
        expect(Object.keys(exportShape.additionAttributes).length).toBe(3);
        expect(exportShape.additionAttributes.centerPoint.x).toBe(40);
        expect(exportShape.additionAttributes.centerPoint.y).toBe(55);
        expect(exportShape.additionAttributes.radiusX).toBe(20);
        expect(exportShape.additionAttributes.radiusY).toBe(25);
    });
});