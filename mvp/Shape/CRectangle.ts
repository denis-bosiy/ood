import { ICanvas } from "../canvas/ICanvas";
import { CFrame } from "../Frame/CFrame";
import { CPoint } from "../Point/CPoint";
import { ShapeType } from "../shapeType";
import { CVector } from "../Vector/CVector";
import { CExportShape } from "./CExportShape";
import { CShape } from "./CShape";

export class CRectangle extends CShape {
    private m_leftTopPoint: CPoint;
    private m_width: number;
    private m_height: number;

    constructor(frame: CFrame, leftTopPoint: CPoint, width: number, height: number) {
        if (width < 0) {
            throw new Error("Width can not be negative");
        }
        if (height < 0) {
            throw new Error("Height can not be negative");
        }
        super(frame);

        this.m_leftTopPoint = leftTopPoint;
        this.m_width = width;
        this.m_height = height;
    }

    public draw(canvas: ICanvas, isActive: boolean = false): void {
        const rightTopPoint: CPoint = new CPoint(this.m_leftTopPoint.x + this.m_width, this.m_leftTopPoint.y);
        const rightBottomPoint: CPoint = new CPoint(this.m_leftTopPoint.x + this.m_width, this.m_leftTopPoint.y + this.m_height);
        const leftBottomPoint: CPoint = new CPoint(this.m_leftTopPoint.x, this.m_leftTopPoint.y + this.m_height);
        const points: CPoint[] = [this.m_leftTopPoint, rightTopPoint, rightBottomPoint, leftBottomPoint];
        
        canvas.drawPolygon(points, isActive, this.getId());
    }

    protected scale(coefWidth: number, coefHeight: number): void {
        this.m_width = coefWidth * this.m_width;
        this.m_height = coefHeight * this.m_height;
    }

    protected move(delta: CVector): void {
        this.m_leftTopPoint.x = this.m_leftTopPoint.x + delta.x;
        this.m_leftTopPoint.y = this.m_leftTopPoint.y + delta.y;
    }

    protected exportConcreteObject(): CExportShape {
        const exportShape: CExportShape = new CExportShape();

        exportShape.additionAttributes = {
            leftTopPoint: this.m_leftTopPoint,
            width: this.m_width,
            height: this.m_height
        };
        exportShape.shapeType = ShapeType.Rectangle;

        return exportShape;
    }
}