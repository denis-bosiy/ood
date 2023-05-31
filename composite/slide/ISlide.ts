import { ICanvas } from "../canvas/ICanvas";
import { IShape } from "../shapes/IShape";

export interface ISlide {
    addShape(shape: IShape): void;
    draw(canvas: ICanvas): void;
}