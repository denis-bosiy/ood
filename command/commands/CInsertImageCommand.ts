import { IDocument } from "../states/IDocument";
import { CAbstractCommand } from "./CAbstractCommand";

export class CInsertImageCommand extends CAbstractCommand {
    private m_document: IDocument;
    private m_path: string;
    private m_width: number;
    private m_height: number;
    private m_position: number;

    constructor(document: IDocument, path: string, width: number, height: number, position: number) {
        super();

        this.m_document = document;
        this.m_position = position;
        this.m_path = path;
        this.m_width = width;
        this.m_height = height;
    }

    protected doExecute(): void {
        this.m_document.insertImage(this.m_path, this.m_width, this.m_height, this.m_position);
    }

    protected doUnexecute(): void {
        this.m_document.deleteItem(this.m_position);
    }
}