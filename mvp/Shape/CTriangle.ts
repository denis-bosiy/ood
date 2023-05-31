import { ICanvas } from "../canvas/ICanvas";
import { CFrame } from "../Frame/CFrame";
import { CPoint } from "../Point/CPoint";
import { ShapeType } from "../shapeType";
import { getTopLeftPoint } from "../utils/points";
import { CVector } from "../Vector/CVector";
import { CExportShape } from "./CExportShape";
import { CShape } from "./CShape";

export class CTriangle extends CShape {
    private m_points: CPoint[];

    constructor(frame: CFrame, points: CPoint[]) {
        if (points.length !== 3) {
            throw new Error("Incorrect points count. Points count should be 3");
        }
        super(frame);

        this.m_points = points;
    }

    public draw(canvas: ICanvas, isActive: boolean = false): void {
        canvas.drawPolygon(this.m_points, isActive, this.getId());
    }

    protected scale(coefWidth: number, coefHeight: number): void {
        const oldtopLeftPoint: CPoint = getTopLeftPoint(this.m_points);

        this.m_points[0].x = this.m_points[0].x * coefWidth;
        this.m_points[0].y = this.m_points[0].y * coefHeight;
        this.m_points[1].x = this.m_points[1].x * coefWidth;
        this.m_points[1].y = this.m_points[1].y * coefHeight;
        this.m_points[2].x = this.m_points[2].x * coefWidth;
        this.m_points[2].y = this.m_points[2].y * coefHeight;

        const newTopLeftPoint: CPoint = getTopLeftPoint(this.m_points);
        this.move(new CVector(oldtopLeftPoint.x - newTopLeftPoint.x, oldtopLeftPoint.y - newTopLeftPoint.y));
    }

    protected move(delta: CVector): void {
        this.m_points[0].x = this.m_points[0].x + delta.x;
        this.m_points[0].y = this.m_points[0].y + delta.y;
        this.m_points[1].x = this.m_points[1].x + delta.x;
        this.m_points[1].y = this.m_points[1].y + delta.y;
        this.m_points[2].x = this.m_points[2].x + delta.x;
        this.m_points[2].y = this.m_points[2].y + delta.y;
    }

    protected exportConcreteObject(): CExportShape {
        const exportShape: CExportShape = new CExportShape();

        exportShape.additionAttributes = {
            points: this.m_points
        };
        exportShape.shapeType = ShapeType.Triangle;

        return exportShape;
    }
}