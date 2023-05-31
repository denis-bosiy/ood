import { IDocument } from "../states/IDocument";
import { CAbstractCommand } from "./CAbstractCommand";

export class CUndoCommand extends CAbstractCommand {
    private m_document: IDocument;

    constructor(document: IDocument) {
        super();

        this.m_document = document;
    }

    protected doExecute(): void {
        if (this.m_document.canUndo()) {
            this.m_document.undo();
        } else {
            throw new Error("Can not undo command");
        }
    }

    protected doUnexecute(): void {
        if (this.m_document.canRedo()) {
            this.m_document.redo();
        } else {
            throw new Error("Can not unexecute undo command");
        }
    }
}