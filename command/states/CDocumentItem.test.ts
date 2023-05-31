import { CDocumentItem } from "./CDocumentItem";
import { CImage } from "./CImage";
import { CParagraph } from "./CParagraph";
import { IImage } from "./IImage";
import { IParagraph } from "./IParagraph";

describe("test document item", () => {
    test("empty document item should be empty", () => {
        const documentItem: CDocumentItem = new CDocumentItem();

        expect(documentItem.getImage()).toBeUndefined();
        expect(documentItem.getParagraph()).toBeUndefined();
    });

    test("document item with image should contain only image", () => {
        const image: IImage = new CImage("document.html", 20, 30);
        const documentItem: CDocumentItem = new CDocumentItem(image);

        expect(documentItem.getImage()).toBe(image);
        expect(documentItem.getParagraph()).toBeUndefined();
    });

    test("document item with paragraph should contain only paragraph", () => {
        const paragraph: IParagraph = new CParagraph("default paragraph text");
        const documentItem: CDocumentItem = new CDocumentItem(undefined, paragraph);

        expect(documentItem.getImage()).toBeUndefined();
        expect(documentItem.getParagraph()).toBe(paragraph);
    });

    test("document item with both paragraph and image should containt both elements", () => {
        const image: IImage = new CImage("document.html", 20, 30);
        const paragraph: IParagraph = new CParagraph("default paragraph text");
        const documentItem: CDocumentItem = new CDocumentItem(image, paragraph);

        expect(documentItem.getImage()).toBe(image);
        expect(documentItem.getParagraph()).toBe(paragraph);
    });
});