import { CRGBAColor } from "./CRGBAColor";
import { ILineStyle } from "./ILineStyle";

export class CLineStyle implements ILineStyle {
    private m_color: CRGBAColor;
    private m_lineWidth: number;

    constructor(color: CRGBAColor = new CRGBAColor(0, 0, 0, 1), lineWidth: number = 0) {
        this.m_color = color;
        this.m_lineWidth = lineWidth;
    }

    public getColor(): CRGBAColor {
        return this.m_color;
    }

    public hasOutline(): boolean  {
        return this.m_lineWidth !== 0; 
    }

    public getLineWidth(): number {
        return this.m_lineWidth;
    }
}