import { ISlide } from "./ISlide";
import { IShape } from "../shapes/IShape";
import { ICanvas } from "../canvas/ICanvas";

export class CSlide implements ISlide {
    private m_shapes: IShape[];

    constructor() {
        this.m_shapes = [];
    }

    public addShape(shape: IShape): void {
        this.m_shapes.push(shape);
    }

    public draw(canvas: ICanvas): void {
        this.m_shapes.forEach((shape: IShape) => {
            shape.draw(canvas);
        });
    }
}