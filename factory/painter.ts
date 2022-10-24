import { ICanvas } from "./Canvas/ICanvas";
import { CFigure } from "./Figure/CFigure";
import { CLayout } from "./layout";

export class CPainter {
    constructor() { }

    public drawPainting(layout: CLayout, canvas: ICanvas): void {
        layout.figures.forEach((figure: CFigure) => {
            figure.draw(canvas);
        });
    }
}