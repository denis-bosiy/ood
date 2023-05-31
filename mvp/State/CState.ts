import { IShape } from "../Shape/IShape";
import { IState } from "./IState";

export class CState implements IState {
    private m_shapes: IShape[];

    constructor() {
        this.m_shapes = [];
    }

    public getShapes(): IShape[] {
        return this.m_shapes;
    }

    public setShapes(shapes: IShape[]): void {
        this.m_shapes = shapes;
    }
}