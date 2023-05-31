import { IStyle } from "./IStyle";

export interface IFillStyle extends IStyle {
    hasFilling(): boolean | undefined;
}