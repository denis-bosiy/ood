import { IDocument } from "../states/IDocument";
import { CAbstractCommand } from "./CAbstractCommand";

export class CInsertParagraphCommand extends CAbstractCommand {
    private m_document: IDocument;
    private m_position: number;
    private m_text: string;

    constructor(document: IDocument, text: string, position: number) {
        super();

        this.m_document = document;
        this.m_position = position;
        this.m_text = text;
    }

    protected doExecute(): void {
        this.m_document.insertParagraph(this.m_text, this.m_position);
    }

    protected doUnexecute(): void {
        this.m_document.deleteItem(this.m_position);
    }
}