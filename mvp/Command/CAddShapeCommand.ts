import { CAbstractCommand } from "./CAbstractCommand";
import { IShape } from "../Shape/IShape";
import { IModel } from "../Model/IModel";

export class CAddShapeCommand extends CAbstractCommand {
    private m_shape: IShape;
    private m_model: IModel;

    constructor(shape: IShape, model: IModel) {
        super();

        this.m_shape = shape;
        this.m_model = model;
    }

    protected doExecute(): void {
        this.m_model.addShape(this.m_shape);
    }

    protected doUnexecute(): void {
        this.m_model.deleteShape(this.m_shape);
    }
}