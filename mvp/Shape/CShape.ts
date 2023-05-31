import { ICanvas } from "../Canvas/ICanvas";
import { CFrame } from "../Frame/CFrame";
import { guidGenerator } from "../utils/id";
import { CVector } from "../Vector/CVector";
import { CExportShape } from "./CExportShape";
import { IShape } from "./IShape";

export abstract class CShape implements IShape {
    private m_id: string;
    private m_frame: CFrame;

    constructor(frame: CFrame) {
        this.m_frame = frame;
        this.m_id = guidGenerator();
    }

    public getFrame(): CFrame {
        return this.m_frame;
    }
    public setFrame(frame: CFrame): void {
        this.move(new CVector(frame.x - this.m_frame.x, frame.y - this.m_frame.y));
        this.scale(frame.width / this.m_frame.width, frame.height / this.m_frame.height);
        this.m_frame = frame;
    }
    public getId(): string {
        return this.m_id;
    }
    public export(): CExportShape {
        const exportShape = this.exportConcreteObject();
        exportShape.frame = this.m_frame;

        return exportShape;
    }

    abstract draw(canvas: ICanvas, isActive: boolean): void;
    protected abstract scale(coefWidth: number, coefHeight: number): void;
    protected abstract move(delta: CVector): void;
    protected abstract exportConcreteObject(): CExportShape;
}