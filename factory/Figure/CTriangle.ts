import { ICanvas } from "../Canvas/ICanvas";
import { CFigure, Color, getColorString } from "./CFigure";
import { CPoint } from "./CPoint";

export class CTriangle extends CFigure {
    private m_points: CPoint[] = [];

    constructor(points: CPoint[], color: Color) {
        super(color);
        if (points.length !== 3) {
            throw new Error("Points count should be 3");
        }

        this.m_points = points;
    }

    public draw(canvas: ICanvas): void {
        const stringColor: string = getColorString(this.m_color);

        canvas.drawLine(this.m_points[0], this.m_points[1], stringColor);
        canvas.drawLine(this.m_points[1], this.m_points[2], stringColor);
        canvas.drawLine(this.m_points[2], this.m_points[0], stringColor);
    }

    public get points(): CPoint[] {
        return this.m_points;
    }
}