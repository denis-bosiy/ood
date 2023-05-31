import { CDocumentItem } from "../states/CDocumentItem";
import { CImage } from "../states/CImage";
import { CParagraph } from "../states/CParagraph";
import { IDocument } from "../states/IDocument";
import { IImage } from "../states/IImage";
import { IParagraph } from "../states/IParagraph";
import { CSetTitleCommand } from "./CSetTitleCommand";

const setTitleMockFunction = jest.fn((title: string) => {});

class CMockDocument implements IDocument {
    private m_items: CDocumentItem[];

    constructor() {
        this.m_items = [];
    }

    insertParagraph(text: string, position: number): IParagraph { return new CParagraph(""); }
    insertImage(path: string, width: number, height: number, position: number): IImage { return new CImage("", 0, 0); }
    getItemsCount(): number { return this.m_items.length; }
    getItem(index: number): CDocumentItem { return this.m_items[index]; }
    deleteItem(index: number): void { }
    getTitle(): string { return ""; }
    setTitle(title: string): void {setTitleMockFunction(title); }
    canUndo(): boolean { return false }
    undo(): void { }
    canRedo(): boolean { return false }
    redo(): void { }
    save(path: string): void { }
}

describe("test set title command", () => {
    beforeEach(() => {
        setTitleMockFunction.mockClear();
    });

    test("execute set title command", () => {
        const mockDocument: CMockDocument = new CMockDocument();
        const setTitleCommand: CSetTitleCommand = new CSetTitleCommand(mockDocument, "document name");

        setTitleCommand.execute();

        expect(setTitleMockFunction).toHaveBeenCalledTimes(1);
        expect(setTitleMockFunction.mock.calls[0][0]).toEqual("document name");
    });

    test("unexecute set title before setting title", () => {
        const mockDocument: CMockDocument = new CMockDocument();
        const setTitleCommand: CSetTitleCommand = new CSetTitleCommand(mockDocument, "document name");

        setTitleCommand.unexecute();

        expect(setTitleMockFunction).toHaveBeenCalledTimes(0);
    });

    test("unexecute insert image after setting title", () => {
        const mockDocument: CMockDocument = new CMockDocument();
        const setTitleCommand: CSetTitleCommand = new CSetTitleCommand(mockDocument, "document name");

        setTitleCommand.execute();
        setTitleCommand.unexecute();

        expect(setTitleMockFunction).toHaveBeenCalledTimes(2);
        expect(setTitleMockFunction.mock.calls[0][0]).toEqual("document name");
        expect(setTitleMockFunction.mock.calls[1][0]).toEqual("");
    });
});