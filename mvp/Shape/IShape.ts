import { ICanvas } from "../Canvas/ICanvas";
import { CFrame } from "../Frame/CFrame";
import { CExportShape } from "./CExportShape";

export interface IShape {
    getId(): string;
    getFrame(): CFrame;
    setFrame(frame: CFrame): void;
    draw(canvas: ICanvas, isActive: boolean): void;
    export(): CExportShape;
}