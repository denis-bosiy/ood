import { CRGBAColor } from "./CRGBAColor";
import { IFillStyle } from "./IFillStyle";

export class CFillStyle implements IFillStyle {
    private m_color: CRGBAColor;
    private m_hasFilling: boolean;

    constructor(color: CRGBAColor = new CRGBAColor(0, 0, 0, 1), hasFilling: boolean = false) {
        this.m_color = color;
        this.m_hasFilling = hasFilling;
    }

    public getColor(): CRGBAColor {
        return this.m_color;
    }

    public hasFilling(): boolean {
        return this.m_hasFilling;
    }
}