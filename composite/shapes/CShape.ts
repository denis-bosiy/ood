import { ICanvas } from "../canvas/ICanvas";
import { CFrame } from "../CFrame";
import { IGroup } from "../group/IGroup";
import { CFillStyle } from "../styles/CFillStyle";
import { CLineStyle } from "../styles/CLineStyle";
import { CRGBAColor } from "../styles/CRGBAColor";
import { IFillStyle } from "../styles/IFillStyle";
import { ILineStyle } from "../styles/ILineStyle";
import { IShape } from "./IShape";

export abstract class CShape implements IShape {
    protected m_frame: CFrame;
    protected m_lineStyle: ILineStyle;
    protected m_fillStyle: IFillStyle;

    constructor(frame: CFrame, lineStyle: ILineStyle, fillStyle: IFillStyle) {
        this.m_frame = frame;
        this.m_lineStyle = lineStyle;
        this.m_fillStyle = fillStyle;
    }

    public getFrame(): CFrame {
        return this.m_frame;
    }

    public setFrame(frame: CFrame): void {
        const coefWidth: number = frame.width / this.m_frame.width;
        const coefHeight: number = frame.height / this.m_frame.height;
        const deltaX: number = frame.x - this.m_frame.x;
        const deltaY: number = frame.y - this.m_frame.y;

        this.scale(coefWidth, coefHeight);
        this.move(deltaX, deltaY);
        this.m_frame = new CFrame(frame.x, frame.y, frame.width, frame.height);
    }

    public getLineStyle(): ILineStyle {
        return this.m_lineStyle;
    }

    public setLineStyle(style: ILineStyle): void {
        const outlineColor = style.getColor();
        const lineWidth = style.getLineWidth();

        if (outlineColor) {
            this.m_lineStyle = new CLineStyle(
                new CRGBAColor(outlineColor.getRedChannel(),
                    outlineColor.getGreenChannel(),
                    outlineColor.getBlueChannel(),
                    outlineColor.getAlphaChannel()
                ),
                lineWidth
            );
        }
    }

    public getFillStyle(): IFillStyle {
        return this.m_fillStyle;
    }

    public setFillStyle(style: IFillStyle): void {
        const fillColor = style.getColor();
        const hasFilling = style.hasFilling();

        if (fillColor) {
            this.m_fillStyle = new CFillStyle(
                new CRGBAColor(fillColor.getRedChannel(),
                    fillColor.getGreenChannel(),
                    fillColor.getBlueChannel(),
                    fillColor.getAlphaChannel()),
                hasFilling);
        }
    }

    public getGroup(): IGroup | undefined {
        return undefined;
    }

    abstract draw(canvas: ICanvas): void;
    protected abstract scale(coefWidth: number, coefHeight: number): void;
    protected abstract move(deltaX: number, deltaY: number): void;
}