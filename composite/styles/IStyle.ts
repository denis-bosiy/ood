import { CRGBAColor } from "./CRGBAColor";

export interface IStyle {
    getColor(): CRGBAColor | undefined;
}