import { IState } from "./IState";
import { CState } from "./CState";
import { CEllipse } from "../Shape/CEllipse";
import { CFrame } from "../Frame/CFrame";
import { IShape } from "../Shape/IShape";
import { CPoint } from "../Point/CPoint";

describe("test CState", () => {
    test("state after construction should have empty shapes array", () => {
        const state: IState = new CState();

        expect(state.getShapes().length).toBe(0);
    });

    test("setShapes should change shapes of the state", () => {
        const state: IState = new CState();
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const shape: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);

        state.setShapes([shape]);

        expect(state.getShapes().length).toBe(1);
        expect(state.getShapes()[0]).toBe(shape);
    });

    test("getShapes should return shapes of the state", () => {
        const state: IState = new CState();
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const shape: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);
        const shapes: IShape[] = [shape];

        state.setShapes(shapes);

        expect(state.getShapes()).toBe(shapes);
    });
});