import { ICanvas } from "../Canvas/ICanvas";
import { CFrame } from "../Frame/CFrame";
import { CPoint } from "../Point/CPoint";
import { ShapeType } from "../shapeType";
import { CVector } from "../Vector/CVector";
import { CExportShape } from "./CExportShape";
import { CShape } from "./CShape";

export class CEllipse extends CShape {
    private m_centerPoint: CPoint;
    private m_radiusX: number;
    private m_radiusY: number;

    constructor(frame: CFrame, centerPoint: CPoint, radiusX: number, radiusY: number) {
        super(frame);

        this.m_centerPoint = centerPoint;
        this.m_radiusX = radiusX;
        this.m_radiusY = radiusY;
    }

    // TODO: Убрать метод draw во view
    public draw(canvas: ICanvas, isActive: boolean = false): void {
        canvas.drawEllipse(this.m_centerPoint, this.m_radiusX, this.m_radiusY, isActive, this.getId());
    }

    protected scale(coefWidth: number, coefHeight: number): void {
        const newRadiusX: number = coefWidth * this.m_radiusX;
        const newRadiusY: number = coefHeight * this.m_radiusY;

        this.move(new CVector(newRadiusX - this.m_radiusX, newRadiusY - this.m_radiusY));
        this.m_radiusX = newRadiusX;
        this.m_radiusY = newRadiusY;
    }

    protected move(delta: CVector): void {
        this.m_centerPoint.x = this.m_centerPoint.x + delta.x;
        this.m_centerPoint.y = this.m_centerPoint.y + delta.y;
    }

    protected exportConcreteObject(): CExportShape {
        const exportShape: CExportShape = new CExportShape();

        exportShape.additionAttributes = {
            centerPoint: this.m_centerPoint,
            radiusX: this.m_radiusX,
            radiusY: this.m_radiusY
        };
        exportShape.shapeType = ShapeType.Ellipse;

        return exportShape;
    }
}