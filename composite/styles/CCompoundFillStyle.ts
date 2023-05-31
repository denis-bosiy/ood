import { CShapeEnumerator } from "../shapes/CShapeEnumerator";
import { IShapeEnumerable } from "../shapes/IShapeEnumerable";
import { CRGBAColor } from "./CRGBAColor";
import { IFillStyle } from "./IFillStyle";

export class CCompoundFillStyle implements IFillStyle {
    private m_shapeEnumerator: CShapeEnumerator;

    constructor(shapeEnumerator: CShapeEnumerator) {
        this.m_shapeEnumerator = shapeEnumerator;
    }

    public getColor(): CRGBAColor | undefined {
        this.m_shapeEnumerator.reset();
        let lineStyle: IFillStyle | undefined;

        while(this.m_shapeEnumerator.hasNext()) {
            const shape: IShapeEnumerable = this.m_shapeEnumerator.next();
            const shapeLineStyle: IFillStyle = shape.getFillStyle();
            
            if (!lineStyle) {
                lineStyle = shapeLineStyle;
            } else {
                if (lineStyle?.getColor()?.toString() !== shapeLineStyle?.getColor()?.toString() ||
                    lineStyle?.hasFilling() !== shapeLineStyle?.hasFilling()) {
                        return undefined;
                }
            }
        }

        return lineStyle?.getColor();
    }

    public hasFilling(): boolean | undefined {
        this.m_shapeEnumerator.reset();
        let lineStyle: IFillStyle | undefined;

        while(this.m_shapeEnumerator.hasNext()) {
            const shape: IShapeEnumerable = this.m_shapeEnumerator.next();
            const shapeLineStyle: IFillStyle = shape.getFillStyle();
            
            if (!lineStyle) {
                lineStyle = shapeLineStyle;
            } else {
                if (lineStyle?.getColor()?.toString() !== shapeLineStyle?.getColor()?.toString() ||
                    lineStyle?.hasFilling() !== shapeLineStyle?.hasFilling()) {
                        return undefined;
                }
            }
        }

        return lineStyle?.hasFilling();
    }
}