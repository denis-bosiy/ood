import { ICanvas } from "../Canvas/ICanvas";
import { CFigure, Color, getColorString } from "./CFigure";
import { CPoint } from "./CPoint";

export class CEllipse extends CFigure {
    private m_centerPoint: CPoint;
    private m_largeSemiAxis: number = 0;
    private m_smallSemiAxis: number = 0;

    constructor(centerPoint: CPoint, largeSemiAxis: number, smallSemiAxis: number, color: Color) {
        super(color);
        this.m_centerPoint = centerPoint;
        this.m_largeSemiAxis = largeSemiAxis;
        this.m_smallSemiAxis = smallSemiAxis;
    }

    public draw(canvas: ICanvas): void {
        canvas.drawEllipse(this.m_centerPoint, this.m_largeSemiAxis, this.m_smallSemiAxis, getColorString(this.m_color));
    }

    public get centerPoint(): CPoint {
        return this.m_centerPoint;
    }

    public get largeSemiAxis(): number {
        return this.m_largeSemiAxis;
    }

    public get smallSemiAxis(): number {
        return this.m_smallSemiAxis;
    }
}