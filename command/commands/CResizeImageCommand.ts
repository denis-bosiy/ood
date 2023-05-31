import { CDocumentItem } from "../states/CDocumentItem";
import { IDocument } from "../states/IDocument";
import { CAbstractCommand } from "./CAbstractCommand";

export class CResizeImageCommand extends CAbstractCommand {
    private m_document: IDocument;
    private m_position: number;
    private m_width: number;
    private m_height: number;
    private m_previousWidth: number;
    private m_previousHeight: number;

    constructor(document: IDocument, width: number, height: number, position: number) {
        super();

        this.m_document = document;
        this.m_width = width;
        this.m_height = height;
        this.m_position = position;
    }

    protected doExecute(): void {
        if (this.m_document.getItemsCount() <= this.m_position) {
            throw new Error("Incorrect item position");
        }
        const documentItem: CDocumentItem = this.m_document.getItem(this.m_position);
        if (!documentItem.getImage()) {
            throw new Error("Item in the position is not an image");
        }

        this.m_previousWidth = documentItem.getImage().getWidth();
        this.m_previousHeight = documentItem.getImage().getHeight();
        documentItem.getImage().resize(this.m_width, this.m_height);
    }

    protected doUnexecute(): void {
        this.m_document.getItem(this.m_position).getImage().resize(this.m_previousWidth, this.m_previousHeight);
    }
}