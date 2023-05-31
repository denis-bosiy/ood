import { ICanvas } from "../canvas/ICanvas";
import { CFrame } from "../CFrame";
import { CPoint } from "../CPoint";
import { CRGBAColor } from "../styles/CRGBAColor";
import { IFillStyle } from "../styles/IFillStyle";
import { ILineStyle } from "../styles/ILineStyle";
import { CShape } from "./CShape";

export class CRectangle extends CShape {
    private m_leftTopPoint: CPoint;
    private m_width: number;
    private m_height: number;

    constructor(frame: CFrame, lineStyle: ILineStyle, fillStyle: IFillStyle, leftTopPoint: CPoint, width: number, height: number) {
        if (width < 0) {
            throw new Error("Width can not be negative");
        }
        if (height < 0) {
            throw new Error("Height can not be negative");
        }
        super(frame, lineStyle, fillStyle);

        this.m_leftTopPoint = leftTopPoint;
        this.m_width = width;
        this.m_height = height;
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

        const rightTopPoint: CPoint = new CPoint(this.m_leftTopPoint.x + this.m_width, this.m_leftTopPoint.y);
        const rightBottomPoint: CPoint = new CPoint(this.m_leftTopPoint.x + this.m_width, this.m_leftTopPoint.y + this.m_height);
        const leftBottomPoint: CPoint = new CPoint(this.m_leftTopPoint.x, this.m_leftTopPoint.y + this.m_height);

        canvas.drawLine(this.m_leftTopPoint, rightTopPoint);
        canvas.drawLine(rightTopPoint, rightBottomPoint);
        canvas.drawLine(rightBottomPoint, leftBottomPoint);
        canvas.drawLine(leftBottomPoint, this.m_leftTopPoint);
        if (this.m_fillStyle.hasFilling()) {
            canvas.fillPolygon([this.m_leftTopPoint, rightTopPoint, rightBottomPoint, leftBottomPoint]);
        }
    }

    protected scale(coefWidth: number, coefHeight: number): void {
        this.m_width = coefWidth * this.m_width;
        this.m_height = coefHeight * this.m_height;
    }

    protected move(deltaX: number, deltaY: number): void {
        this.m_leftTopPoint.x = this.m_leftTopPoint.x + deltaX;
        this.m_leftTopPoint.y = this.m_leftTopPoint.y + deltaY;
    }
}