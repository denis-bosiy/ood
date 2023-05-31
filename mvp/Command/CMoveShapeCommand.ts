import { CAbstractCommand } from "./CAbstractCommand";
import { IShape } from "../Shape/IShape";
import { CFrame } from "../Frame/CFrame";
import { CVector } from "../Vector/CVector";
import { IModel } from "../Model/IModel";

export class CMoveShapeCommand extends CAbstractCommand {
    private m_model: IModel;
    private m_shape: IShape;
    private m_delta: CVector;

    constructor(model: IModel, shape: IShape, delta: CVector) {
        super();

        this.m_model = model;
        this.m_shape = shape;
        this.m_delta = new CVector(delta.x, delta.y);
    }

    protected doExecute(): void {
        const oldFrame: CFrame = this.m_shape.getFrame();

        const newFrame: CFrame = new CFrame(oldFrame.x + this.m_delta.x, oldFrame.y + this.m_delta.y, oldFrame.width, oldFrame.height);

        this.m_model.changeShapeFrame(this.m_shape, newFrame);
    }

    protected doUnexecute(): void {
        const oldFrame: CFrame = this.m_shape.getFrame();

        const newFrame: CFrame = new CFrame(oldFrame.x - this.m_delta.x, oldFrame.y - this.m_delta.y, oldFrame.width, oldFrame.height);

        this.m_model.changeShapeFrame(this.m_shape, newFrame);
    }
}