import { CDocumentItem } from "../states/CDocumentItem";
import { IDocument } from "../states/IDocument";
import { IImage } from "../states/IImage";
import { IParagraph } from "../states/IParagraph";
import { CAbstractCommand } from "./CAbstractCommand";

export class CListCommand extends CAbstractCommand {
    private m_document: IDocument;

    constructor(document: IDocument) {
        super();

        this.m_document = document;
    }

    protected doExecute(): void {
        console.log("Title:", this.m_document.getTitle());

        for(let i = 0; i < this.m_document.getItemsCount(); i++) {
            const item: CDocumentItem = this.m_document.getItem(i);

            if (item && item.getImage()) {
                const image: IImage = item.getImage();
                console.log(i + ". Image: " + image.getWidth() + " " + image.getHeight() + " " + image.getPath());
            }
            if (item && item.getParagraph()) {
                const paragraph: IParagraph = item.getParagraph();
                console.log(i + ". Paragraph: " + paragraph.getText());
            }
        }
    }

    protected doUnexecute(): void {}
}