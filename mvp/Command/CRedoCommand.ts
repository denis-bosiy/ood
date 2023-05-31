import { CAbstractCommand } from "./CAbstractCommand";
import { IModel } from "../Model/IModel";

export class CRedoCommand extends CAbstractCommand {
    private m_model: IModel;

    constructor(model: IModel) {
        super();

        this.m_model = model;
    }

    protected doExecute(): void {
        if (this.m_model.canRedo()) {
            this.m_model.redo();
        } else {
            throw new Error("Can not redo command");
        }
    }

    protected doUnexecute(): void {
        if (this.m_model.canUndo()) {
            this.m_model.undo();
        } else {
            throw new Error("Can not unexecute redo command");
        }
    }
}