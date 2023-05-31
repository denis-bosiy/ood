import { ICanvas } from "../canvas/ICanvas";
import { CFrame } from "../CFrame";
import { CShapeEnumerator } from "../shapes/CShapeEnumerator";
import { IShape } from "../shapes/IShape";
import { CCompoundFillStyle } from "../styles/CCompoundFillStyle";
import { CCompoundLineStyle } from "../styles/CCompoundLineStyle";
import { CLineStyle } from "../styles/CLineStyle";
import { CFillStyle } from "../styles/CFillStyle";
import { IFillStyle } from "../styles/IFillStyle";
import { ILineStyle } from "../styles/ILineStyle";
import { IGroup } from "./IGroup";

export class CGroup implements IGroup {
    private m_frame: CFrame;
    private m_lineStyle: ILineStyle;
    private m_fillStyle: IFillStyle;
    private m_shapes: IShape[];

    constructor(frame: CFrame) {
        this.m_frame = frame;
        this.m_shapes = [];
        this.m_lineStyle = new CCompoundLineStyle(new CShapeEnumerator(this.m_shapes));
        this.m_fillStyle = new CCompoundFillStyle(new CShapeEnumerator(this.m_shapes));
    }

    public getFrame(): CFrame {
        return this.m_frame;
    }

    public setFrame(frame: CFrame): void {
        const coefWidth: number = frame.width / this.m_frame.width;
        const coefHeight: number = frame.height / this.m_frame.height;
        const deltaX: number = frame.x - this.m_frame.x;
        const deltaY: number = frame.y - this.m_frame.y;

        this.m_shapes.forEach((shape: IShape) => {
            const shapeFrame: CFrame = shape.getFrame();

            shape.setFrame(new CFrame(shapeFrame.x + deltaX, shapeFrame.y + deltaY, shapeFrame.width * coefWidth, shapeFrame.height * coefHeight));
        });
        this.m_frame = frame;
    }

    public getLineStyle(): ILineStyle {
        return this.m_lineStyle;
    }

    public setLineStyle(style: ILineStyle): void {
        this.m_shapes.forEach((shape: IShape) => {
            shape.setLineStyle(new CLineStyle(style.getColor(), style.getLineWidth()));
        });
    }

    public getFillStyle(): IFillStyle {
        return this.m_fillStyle;
    }

    public setFillStyle(style: IFillStyle): void {
        this.m_shapes.forEach((shape: IShape) => {
            shape.setFillStyle(new CFillStyle(style.getColor(), style.hasFilling()));
        });
    }

    public draw(canvas: ICanvas): void {
        this.m_shapes.forEach((shape: IShape) => {
            shape.draw(canvas);
        });
    }

    public getGroup(): IGroup {
        return this;
    }

    public getShapesCount(): number {
        return this.m_shapes.length;
    }

    public getShapeAtIndex(index: number): IShape {
        if (index > this.m_shapes.length - 1) {
            throw new Error("Incorrect index");
        }

        return this.m_shapes[index];
    }

    public insertShape(shape: IShape, index: number): void {
        if (shape !== this) {
            this.m_shapes.splice(index, 0, shape);
        }
    }

    public removeShapeAtIndex(index: number): void {
        this.m_shapes.splice(index, 1);
    }
}