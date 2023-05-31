import { IEnumerable } from "../enumerator/IEnumerable";
import { IEnumerator } from "../enumerator/IEnumerator";
import { IShapeEnumerable } from "./IShapeEnumerable";

export class CShapeEnumerator implements IEnumerator {
    private m_shapes: IShapeEnumerable[];
    private m_currentIndex: number;

    constructor(shapes: IShapeEnumerable[]) {
        this.m_shapes = shapes;
        this.m_currentIndex = 0;
    }

    public reset(): void {
        this.m_currentIndex = 0;
    }

    public hasNext(): boolean {
        return this.m_currentIndex < this.m_shapes.length;
    }

    public next(): IShapeEnumerable {
        if (!this.hasNext()) {
            throw new Error("Can not get the next element, because there is no next elements");
        }

        return this.m_shapes[this.m_currentIndex++];
    }
}