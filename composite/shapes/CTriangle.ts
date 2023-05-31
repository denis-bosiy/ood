import { ICanvas } from "../canvas/ICanvas";
import { CFrame } from "../CFrame";
import { CPoint } from "../CPoint";
import { CRGBAColor } from "../styles/CRGBAColor";
import { IFillStyle } from "../styles/IFillStyle";
import { ILineStyle } from "../styles/ILineStyle";
import { CShape } from "./CShape";

export class CTriangle extends CShape {
    private m_points: CPoint[];

    constructor(frame: CFrame, lineStyle: ILineStyle, fillStyle: IFillStyle, points: CPoint[]) {
        if (points.length !== 3) {
            throw new Error("Incorrect points count. Points count should be 3");
        }
        super(frame, lineStyle, fillStyle);

        this.m_points = points;
    }

    public draw(canvas: ICanvas): void {
        const lineColor: CRGBAColor | undefined = this.m_lineStyle.getColor();
        const fillColor: CRGBAColor | undefined = this.m_fillStyle.getColor();
        const lineWidth: number | undefined = this.m_lineStyle.getLineWidth();

        if (lineColor) {
            canvas.setLineColor(lineColor.toString());
        }
        if (fillColor) {
            canvas.setFillColor(fillColor.toString());
        }
        if (lineWidth) {
            canvas.setLineWidth(lineWidth);
        }

        canvas.drawLine(this.m_points[0], this.m_points[1]);
        canvas.drawLine(this.m_points[1], this.m_points[2]);
        canvas.drawLine(this.m_points[2], this.m_points[0]);
        if (this.m_fillStyle.hasFilling()) {
            canvas.fillPolygon(this.m_points);
        }
    }

    protected scale(coefWidth: number, coefHeight: number): void {
        const xAverage = (this.m_points[0].x + this.m_points[1].x + this.m_points[2].x) / 3;
        const yAverage = (this.m_points[0].y + this.m_points[1].y + this.m_points[2].y) / 3;

        this.m_points[0].x = coefWidth * (this.m_points[0].x - xAverage) + xAverage;
        this.m_points[0].y = coefHeight * (this.m_points[0].y - yAverage) + yAverage;
        this.m_points[1].x = coefWidth * (this.m_points[1].x - xAverage) + xAverage;
        this.m_points[1].y = coefHeight * (this.m_points[1].y - yAverage) + yAverage;
        this.m_points[2].x = coefWidth * (this.m_points[2].x - xAverage) + xAverage;
        this.m_points[2].y = coefHeight * (this.m_points[2].y - yAverage) + yAverage;
    }

    protected move(deltaX: number, deltaY: number): void {
        this.m_points[0].x = this.m_points[0].x + deltaX;
        this.m_points[0].y = this.m_points[0].y + deltaY;
        this.m_points[1].x = this.m_points[1].x + deltaX;
        this.m_points[1].y = this.m_points[1].y + deltaY;
        this.m_points[2].x = this.m_points[2].x + deltaX;
        this.m_points[2].y = this.m_points[2].y + deltaY;
    }
}