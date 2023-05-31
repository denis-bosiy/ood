import { CDocumentItem } from "../states/CDocumentItem";
import { CImage } from "../states/CImage";
import { CParagraph } from "../states/CParagraph";
import { IDocument } from "../states/IDocument";
import { IImage } from "../states/IImage";
import { IParagraph } from "../states/IParagraph";
import { CInsertParagraphCommand } from "./CInsertParagraphCommand";

const insertParagraphMockFunction = jest.fn((text: string, position: number) => { return new CParagraph(text);});
const deleteItemMockFunction = jest.fn((index: number) => {});

class CMockDocument implements IDocument {
    private m_items: CDocumentItem[];

    constructor() {
        this.m_items = [];
    }

    insertParagraph(text: string, position: number): IParagraph { 
        const insertedParagraph: IParagraph = insertParagraphMockFunction(text, position);

        this.m_items.splice(position, 0, new CDocumentItem(undefined, insertedParagraph));

        return insertedParagraph; 
    }
    insertImage(path: string, width: number, height: number, position: number): IImage { return new CImage("", 0, 0); }
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

describe("test insert paragraph command", () => {
    beforeEach(() => {
        insertParagraphMockFunction.mockClear();
        deleteItemMockFunction.mockClear();
    });

    test("execute insert paragraph with 0 index", () => {
        const mockDocument: CMockDocument = new CMockDocument();
        const insertParagraphCommand: CInsertParagraphCommand = new CInsertParagraphCommand(mockDocument, "svetocopy", 0);

        insertParagraphCommand.execute();

        expect(insertParagraphMockFunction).toHaveBeenCalledTimes(1);
        expect(insertParagraphMockFunction.mock.calls[0][0]).toEqual("svetocopy");
        expect(insertParagraphMockFunction.mock.calls[0][1]).toEqual(0);
    });

    test("execute insert paragraph with 1 index", () => {
        const mockDocument: CMockDocument = new CMockDocument();
        const insertParagraphCommand: CInsertParagraphCommand = new CInsertParagraphCommand(mockDocument, "svetocopy", 1);

        insertParagraphCommand.execute();

        expect(insertParagraphMockFunction).toHaveBeenCalledTimes(1);
        expect(insertParagraphMockFunction.mock.calls[0][0]).toEqual("svetocopy");
        expect(insertParagraphMockFunction.mock.calls[0][1]).toEqual(1);
    });

    test("unexecute insert paragraph before inserting", () => {
        const mockDocument: CMockDocument = new CMockDocument();
        const insertParagraphCommand: CInsertParagraphCommand = new CInsertParagraphCommand(mockDocument, "svetocopy", 1);

        insertParagraphCommand.unexecute();

        expect(insertParagraphMockFunction).toHaveBeenCalledTimes(0);
        expect(deleteItemMockFunction).toHaveBeenCalledTimes(0);
    });

    test("unexecute insert paragraph after inserting", () => {
        const mockDocument: CMockDocument = new CMockDocument();
        const insertParagraphCommand: CInsertParagraphCommand = new CInsertParagraphCommand(mockDocument, "svetocopy", 1);

        insertParagraphCommand.execute();
        insertParagraphCommand.unexecute();

        expect(insertParagraphMockFunction).toHaveBeenCalledTimes(1);
        expect(deleteItemMockFunction).toHaveBeenCalledTimes(1);
        expect(deleteItemMockFunction.mock.calls[0][0]).toEqual(1);
    });
});