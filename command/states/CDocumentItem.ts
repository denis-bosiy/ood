import { IImage } from "./IImage";
import { IParagraph } from "./IParagraph";

export class CDocumentItem {
    private m_image: IImage;
    private m_paragraph: IParagraph;

    constructor(image?: IImage, paragraph?: IParagraph) {
        if (image) {
            this.m_image = image;
        }
        if (paragraph) {
            this.m_paragraph = paragraph;
        }
    }

    public getImage(): IImage {
        return this.m_image;
    }

    public getParagraph(): IParagraph {
        return this.m_paragraph;
    }
}