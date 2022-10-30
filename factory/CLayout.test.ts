import { CCross } from "./Figure/CCross";
import { CFigure, Color } from "./Figure/CFigure";
import { CPoint } from "./Figure/CPoint";
import { CLayout } from "./Clayout";

describe("test layout", () => {
    test("adding one figure to layout should increment figures array's length", () => {
        const figure: CFigure = new CCross(new CPoint(1, 2), 3, Color.Red);
        const layout: CLayout = new CLayout();

        layout.addFigure(figure);

        expect(layout.figures.length).toBe(1);
    });
});