import { CDocumentItem } from "../states/CDocumentItem";
import { CImage } from "../states/CImage";
import { CParagraph } from "../states/CParagraph";
import { IDocument } from "../states/IDocument";
import { IImage } from "../states/IImage";
import { IParagraph } from "../states/IParagraph";
import { CSaveCommand } from "./CSaveCommand";

const saveMockFunction = jest.fn((path: string) => {});

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
    setTitle(title: string): void { }
    canUndo(): boolean { return false }
    undo(): void { }
    canRedo(): boolean { return false }
    redo(): void { }
    save(path: string): void { saveMockFunction(path) }
}

describe("test save command", () => {
    beforeEach(() => {
        saveMockFunction.mockClear();
    });

    test("execute save command", () => {
        const mockDocument: IDocument = new CMockDocument();
        const saveCommand: CSaveCommand = new CSaveCommand(mockDocument, "document.html");

        saveCommand.execute();

        expect(saveMockFunction).toBeCalledTimes(1);
        expect(saveMockFunction.mock.calls[0][0]).toEqual("document.html");
    });
});