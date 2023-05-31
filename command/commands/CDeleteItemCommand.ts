import { CDocumentItem } from "../states/CDocumentItem";
import { IDocument } from "../states/IDocument";
import { CAbstractCommand } from "./CAbstractCommand";

export class CDeleteItemCommand extends CAbstractCommand {
    private m_document: IDocument;
    private m_position: number;
    private m_previousItem: CDocumentItem;

    constructor(document: IDocument, position: number) {
        super();

        this.m_document = document;
        this.m_position = position;
    }

    protected doExecute(): void {
        if (this.m_document.getItemsCount() <= this.m_position) {
            throw new Error("Incorrect item position");
        }

        this.m_previousItem = this.m_document.getItem(this.m_position);
        this.m_document.deleteItem(this.m_position);
    }

    protected doUnexecute(): void {
        if (this.m_previousItem.getImage()) {
            const image = this.m_previousItem.getImage();

            this.m_document.insertImage(image.getPath(), image.getWidth(), image.getHeight(), this.m_position);
        }
        if (this.m_previousItem.getParagraph()) {
            const paragraph = this.m_previousItem.getParagraph();

            this.m_document.insertParagraph(paragraph.getText(), this.m_position);
        }
    }
}