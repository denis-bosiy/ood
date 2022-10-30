import { CPainter } from "./CPainter";
import { CLayout } from "./CLayout";
import { CFigure, Color } from "./Figure/CFigure";
import { ICanvas } from "./Canvas/ICanvas";
import { CCanvas } from "./Canvas/CCanvas";

class CMockFigure extends CFigure {
    constructor(color: Color) {
        super(color);
    }

    public draw(canvas: ICanvas): void {
        console.log(this.m_color);
    }
}

describe("test painter", () => {
    const log = console.log;

    beforeEach(() => {
        console.log = jest.fn();
    });

    afterAll(() => {
        console.log = log;
    });

    test("painter should invoke draw method at every figure", () => {
        const painter: CPainter = new CPainter();
        const mock1: CMockFigure = new CMockFigure(Color.Red);
        const mock2: CMockFigure = new CMockFigure(Color.Black);
        const mock3: CMockFigure = new CMockFigure(Color.Blue);
        const mock4: CMockFigure = new CMockFigure(Color.Green);
        const layout: CLayout = new CLayout();
        layout.addFigure(mock1);
        layout.addFigure(mock2);
        layout.addFigure(mock3);
        layout.addFigure(mock4);

        painter.drawPainting(layout, new CCanvas(10, 10));

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe(Color.Red);
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe(Color.Black);
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe(Color.Blue);
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe(Color.Green);
    });
})