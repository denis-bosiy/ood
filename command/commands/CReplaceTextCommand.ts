import { CDocumentItem } from "../states/CDocumentItem";
import { IDocument } from "../states/IDocument";
import { CAbstractCommand } from "./CAbstractCommand";

export class CReplaceTextCommand extends CAbstractCommand {
    private m_document: IDocument;
    private m_position: number;
    private m_text: string;
    private m_previousText: string;

    constructor(document: IDocument, text: string, position: number) {
        super();

        this.m_document = document;
        this.m_position = position;
        this.m_text = text;
    }

    protected doExecute(): void {
        if (this.m_document.getItemsCount() <= this.m_position) {
            throw new Error("Incorrect item position");
        }
        const documentItem: CDocumentItem = this.m_document.getItem(this.m_position);
        if (!documentItem.getParagraph()) {
            throw new Error("Item in the position is not a paragraph");
        }

        this.m_previousText = documentItem.getParagraph().getText();
        documentItem.getParagraph().setText(this.m_text);
    }

    protected doUnexecute(): void {
        this.m_document.getItem(this.m_position).getParagraph().setText(this.m_previousText);
    }
}