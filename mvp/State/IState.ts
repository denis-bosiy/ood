import { IShape } from "../Shape/IShape";

export interface IState {
    getShapes(): IShape[];
    setShapes(shapes: IShape[]): void;
}