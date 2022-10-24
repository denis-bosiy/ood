import { ICanvas } from "../Canvas/ICanvas";
import { CFigure, Color, getColorString } from "./CFigure";
import { CPoint } from "./CPoint";

export class CCross extends CFigure {
    private m_centerPoint: CPoint;
    private m_length: number = 0;

    constructor(centerPoint: CPoint, length: number, color: Color) {
        super(color);

        this.m_centerPoint = centerPoint;
        this.m_length = length;
    }

    public draw(canvas: ICanvas): void {
        const stringColor: string = getColorString(this.m_color);
        const topPoint = new CPoint(this.m_centerPoint.x(), this.m_centerPoint.y() - this.m_length / 2);
        const leftPoint = new CPoint(this.m_centerPoint.x() - this.m_length / 2, this.m_centerPoint.y());
        const rightPoint = new CPoint(this.m_centerPoint.x() + this.m_length / 2, this.m_centerPoint.y());
        const bottomPoint = new CPoint(this.m_centerPoint.x(), this.m_centerPoint.y() + this.m_length / 2);

        canvas.drawLine(topPoint, bottomPoint, stringColor);
        canvas.drawLine(leftPoint, rightPoint, stringColor);
    }

    public get centerPoint(): CPoint {
        return this.m_centerPoint;
    }

    public get length(): number {
        return this.m_length;
    }
}