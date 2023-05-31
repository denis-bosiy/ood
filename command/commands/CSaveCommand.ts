import { IDocument } from "../states/IDocument";
import { CAbstractCommand } from "./CAbstractCommand";

export class CSaveCommand extends CAbstractCommand {
    private m_document: IDocument;
    private m_path: string;

    constructor(document: IDocument, path: string) {
        super();

        this.m_document = document;
        this.m_path = path;
    }

    protected doExecute(): void {
        this.m_document.save(this.m_path);
    }

    protected doUnexecute(): void {}
}