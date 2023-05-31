import { CDocumentItem } from "../states/CDocumentItem";
import { CImage } from "../states/CImage";
import { CParagraph } from "../states/CParagraph";
import { IDocument } from "../states/IDocument";
import { IImage } from "../states/IImage";
import { IParagraph } from "../states/IParagraph";
import { CInsertImageCommand } from "./CInsertImageCommand";

const insertImageMockFunction = jest.fn((path: string, width: number, height: number, position: number) => { return new CImage(path, width, height);});
const deleteItemMockFunction = jest.fn((index: number) => {});

class CMockDocument implements IDocument {
    private m_items: CDocumentItem[];

    constructor() {
        this.m_items = [];
    }

    insertParagraph(text: string, position: number): IParagraph { return new CParagraph(""); }
    insertImage(path: string, width: number, height: number, position: number): IImage { 
        const insertedImage: IImage = insertImageMockFunction(path, width, height, position);

        this.m_items.splice(position, 0, new CDocumentItem(insertedImage));

        return insertedImage; 
    }
    getItemsCount(): number { return this.m_items.length; }
    getItem(index: number): CDocumentItem { return this.m_items[index]; }
    deleteItem(index: number): void { deleteItemMockFunction(index); }
    getTitle(): string { return ""; }
    setTitle(title: string): void { }
    canUndo(): boolean { return false }
    undo(): void { }
    canRedo(): boolean { return false }
    redo(): void { }
    save(path: string): void { }
}

describe("test insert image command", () => {
    beforeEach(() => {
        insertImageMockFunction.mockClear();
        deleteItemMockFunction.mockClear();
    });

    test("execute insert image with 0 index", () => {
        const mockDocument: CMockDocument = new CMockDocument();
        const insertImageCommand: CInsertImageCommand = new CInsertImageCommand(mockDocument, "document.html", 10, 20, 0);

        insertImageCommand.execute();

        expect(insertImageMockFunction).toHaveBeenCalledTimes(1);
        expect(insertImageMockFunction.mock.calls[0][0]).toEqual("document.html");
        expect(insertImageMockFunction.mock.calls[0][1]).toEqual(10);
        expect(insertImageMockFunction.mock.calls[0][2]).toEqual(20);
        expect(insertImageMockFunction.mock.calls[0][3]).toEqual(0);
    });

    test("execute insert image with 1 index", () => {
        const mockDocument: CMockDocument = new CMockDocument();
        const insertImageCommand: CInsertImageCommand = new CInsertImageCommand(mockDocument, "document.html", 10, 20, 1);

        insertImageCommand.execute();

        expect(insertImageMockFunction).toHaveBeenCalledTimes(1);
        expect(insertImageMockFunction.mock.calls[0][0]).toEqual("document.html");
        expect(insertImageMockFunction.mock.calls[0][1]).toEqual(10);
        expect(insertImageMockFunction.mock.calls[0][2]).toEqual(20);
        expect(insertImageMockFunction.mock.calls[0][3]).toEqual(1);
    });

    test("unexecute insert image before inserting", () => {
        const mockDocument: CMockDocument = new CMockDocument();
        const insertImageCommand: CInsertImageCommand = new CInsertImageCommand(mockDocument, "document.html", 10, 20, 1);

        insertImageCommand.unexecute();

        expect(deleteItemMockFunction).toHaveBeenCalledTimes(0);
        expect(insertImageMockFunction).toHaveBeenCalledTimes(0);
    });

    test("unexecute insert image after inserting", () => {
        const mockDocument: CMockDocument = new CMockDocument();
        const insertImageCommand: CInsertImageCommand = new CInsertImageCommand(mockDocument, "document.html", 10, 20, 1);

        insertImageCommand.execute();
        insertImageCommand.unexecute();

        expect(insertImageMockFunction).toHaveBeenCalledTimes(1);
        expect(deleteItemMockFunction).toHaveBeenCalledTimes(1);
        expect(deleteItemMockFunction.mock.calls[0][0]).toEqual(1);
    });
});