import { IStyle } from "./IStyle";

export interface ILineStyle extends IStyle {
    hasOutline(): boolean | undefined;
    getLineWidth(): number | undefined;
}