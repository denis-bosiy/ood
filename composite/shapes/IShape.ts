import { ICanvas } from "../canvas/ICanvas";
import { CFrame } from "../CFrame";
import { IGroup } from "../group/IGroup";
import { IFillStyle } from "../styles/IFillStyle";
import { ILineStyle } from "../styles/ILineStyle";

export interface IShape {
    getFrame(): CFrame;
    setFrame(frame: CFrame): void;
    getLineStyle(): ILineStyle;
    setLineStyle(style: ILineStyle): void;
    getFillStyle(): IFillStyle;
    setFillStyle(style: IFillStyle): void;
    draw(canvas: ICanvas): void;
    getGroup(): IGroup | undefined;
}