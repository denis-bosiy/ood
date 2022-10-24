import { ICanvas } from "../Canvas/ICanvas";

export interface IDrawableFigure {
    draw(canvas: ICanvas): void;
}