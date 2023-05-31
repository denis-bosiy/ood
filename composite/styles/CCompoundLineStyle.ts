import { CShapeEnumerator } from "../shapes/CShapeEnumerator";
import { IShapeEnumerable } from "../shapes/IShapeEnumerable";
import { CRGBAColor } from "./CRGBAColor";
import { ILineStyle } from "./ILineStyle";

export class CCompoundLineStyle implements ILineStyle {
    private m_shapeEnumerator: CShapeEnumerator;

    constructor(shapeEnumerator: CShapeEnumerator) {
        this.m_shapeEnumerator = shapeEnumerator;
    }

    public getColor(): CRGBAColor | undefined {
        this.m_shapeEnumerator.reset();
        let lineStyle: ILineStyle | undefined;

        while(this.m_shapeEnumerator.hasNext()) {
            const shape: IShapeEnumerable = this.m_shapeEnumerator.next();
            const shapeLineStyle: ILineStyle = shape.getLineStyle();
            
            if (!lineStyle) {
                lineStyle = shapeLineStyle;
            } else {
                if (lineStyle?.getColor()?.toString() !== shapeLineStyle?.getColor()?.toString() ||
                    lineStyle?.getLineWidth() !== shapeLineStyle?.getLineWidth()) {
                        return undefined;
                }
            }
        }

        return lineStyle?.getColor();
    }

    public hasOutline(): boolean | undefined {
        this.m_shapeEnumerator.reset();
        let lineStyle: ILineStyle | undefined;

        while(this.m_shapeEnumerator.hasNext()) {
            const shape: IShapeEnumerable = this.m_shapeEnumerator.next();
            const shapeLineStyle: ILineStyle = shape.getLineStyle();
            
            if (!lineStyle) {
                lineStyle = shapeLineStyle;
            } else {
                if (lineStyle?.getColor()?.toString() !== shapeLineStyle?.getColor()?.toString() ||
                    lineStyle?.getLineWidth() !== shapeLineStyle?.getLineWidth()) {
                        return undefined;
                }
            }
        }

        return lineStyle?.hasOutline();
    }

    public getLineWidth(): number | undefined {
        this.m_shapeEnumerator.reset();
        let lineStyle: ILineStyle | undefined;

        while(this.m_shapeEnumerator.hasNext()) {
            const shape: IShapeEnumerable = this.m_shapeEnumerator.next();
            const shapeLineStyle: ILineStyle = shape.getLineStyle();
            
            if (!lineStyle) {
                lineStyle = shapeLineStyle;
            } else {
                if (lineStyle?.getColor()?.toString() !== shapeLineStyle?.getColor()?.toString() ||
                    lineStyle?.getLineWidth() !== shapeLineStyle?.getLineWidth()) {
                        return undefined;
                }
            }
        }

        return lineStyle?.getLineWidth();        
    }
}