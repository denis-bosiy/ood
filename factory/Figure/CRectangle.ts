import { ICanvas } from "../Canvas/ICanvas";
import { CFigure, Color, getColorString } from "./CFigure";
import { CPoint } from "./CPoint";

export class CRectangle extends CFigure {
    private m_leftTopPoint: CPoint;
    private m_rightBottomPoint: CPoint;

    constructor(leftTopPoint: CPoint, width: number, height: number, color: Color) {
        super(color);
        this.m_leftTopPoint = leftTopPoint;
        this.m_rightBottomPoint = new CPoint(leftTopPoint.x() + width, leftTopPoint.y() + height);
    }

    public draw(canvas: ICanvas): void {
        const stringColor: string = getColorString(this.m_color);
        const rightTopPoint: CPoint = new CPoint(this.m_rightBottomPoint.x(), this.m_leftTopPoint.y());
        const leftBottomPoint: CPoint = new CPoint(this.m_leftTopPoint.x(), this.m_rightBottomPoint.y());

        canvas.drawLine(this.m_leftTopPoint, rightTopPoint, stringColor);
        canvas.drawLine(rightTopPoint, this.m_rightBottomPoint, stringColor);
        canvas.drawLine(this.m_rightBottomPoint, leftBottomPoint, stringColor);
        canvas.drawLine(leftBottomPoint, this.m_leftTopPoint, stringColor);
    }

    public get leftTopPoint(): CPoint {
        return this.m_leftTopPoint;
    }

    public get rightBottomPoint(): CPoint {
        return this.m_rightBottomPoint;
    }
}