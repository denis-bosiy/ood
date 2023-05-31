import { ICanvas } from "../canvas/ICanvas";
import { CFrame } from "../CFrame";
import { CPoint } from "../CPoint";
import { CRGBAColor } from "../styles/CRGBAColor";
import { IFillStyle } from "../styles/IFillStyle";
import { ILineStyle } from "../styles/ILineStyle";
import { CShape } from "./CShape";

export class CEllipse extends CShape {
    private m_centerPoint: CPoint;
    private m_radiusX: number;
    private m_radiusY: number;

    constructor(frame: CFrame, lineStyle: ILineStyle, fillStyle: IFillStyle, centerPoint: CPoint, radiusX: number, radiusY: number) {
        super(frame, lineStyle, fillStyle);

        this.m_centerPoint = centerPoint;
        this.m_radiusX = radiusX;
        this.m_radiusY = radiusY;
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

        canvas.drawEllipse(this.m_centerPoint, this.m_radiusX, this.m_radiusY);
        if (this.m_fillStyle.hasFilling()) {
            canvas.fillEllipse(this.m_centerPoint, this.m_radiusX, this.m_radiusY);
        }
    }

    protected scale(coefWidth: number, coefHeight: number): void {
        this.m_radiusX = coefWidth * this.m_radiusX;
        this.m_radiusY = coefHeight * this.m_radiusY;
    }

    protected move(deltaX: number, deltaY: number): void {
        this.m_centerPoint.x = this.m_centerPoint.x + deltaX;
        this.m_centerPoint.y = this.m_centerPoint.y + deltaY;
    }
}