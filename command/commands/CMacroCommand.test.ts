import { CDocumentItem } from "../states/CDocumentItem";
import { CImage } from "../states/CImage";
import { CParagraph } from "../states/CParagraph";
import { IDocument } from "../states/IDocument";
import { IImage } from "../states/IImage";
import { IParagraph } from "../states/IParagraph";
import { CMacroCommand } from "./CMacroCommand";
import { CSaveCommand } from "./CSaveCommand";
import { CSetTitleCommand } from "./CSetTitleCommand";

const saveMockFunction = jest.fn((path: string) => {});
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
    setTitle(title: string): void { setTitleMockFunction(title); }
    canUndo(): boolean { return false }
    undo(): void { }
    canRedo(): boolean { return false }
    redo(): void { }
    save(path: string): void { saveMockFunction(path) }
}

describe("test macrocommand", () => {
    beforeEach(() => {
        saveMockFunction.mockClear();
        setTitleMockFunction.mockClear();
    });

    test("execute macrocommand with commands list consists of one command", () => {
        const mockDocument: IDocument = new CMockDocument();
        const saveCommand: CSaveCommand = new CSaveCommand(mockDocument, "document.html");
        const macroCommand: CMacroCommand = new CMacroCommand([saveCommand]);

        macroCommand.execute();

        expect(saveMockFunction).toBeCalledTimes(1);
        expect(saveMockFunction.mock.calls[0][0]).toEqual("document.html");
    });

    test("unexecute macrocommand with commands list consists of one command", () => {
        const mockDocument: IDocument = new CMockDocument();
        const saveCommand: CSaveCommand = new CSaveCommand(mockDocument, "document.html");
        const macroCommand: CMacroCommand = new CMacroCommand([saveCommand]);

        macroCommand.execute();
        macroCommand.unexecute();

        expect(saveMockFunction).toBeCalledTimes(1);
        expect(saveMockFunction.mock.calls[0][0]).toEqual("document.html");
    });

    test("execute macrocommand with commands list consists of two commands", () => {
        const mockDocument: IDocument = new CMockDocument();
        const saveCommand: CSaveCommand = new CSaveCommand(mockDocument, "document.html");
        const setTitleCommand: CSetTitleCommand = new CSetTitleCommand(mockDocument, "new title");
        const macroCommand: CMacroCommand = new CMacroCommand([saveCommand, setTitleCommand]);

        macroCommand.execute();

        expect(saveMockFunction).toBeCalledTimes(1);
        expect(saveMockFunction.mock.calls[0][0]).toEqual("document.html");
        expect(setTitleMockFunction).toBeCalledTimes(1);
        expect(setTitleMockFunction.mock.calls[0][0]).toEqual("new title");
    });

    test("unexecute macrocommand with commands list consists of two commands", () => {
        const mockDocument: IDocument = new CMockDocument();
        const saveCommand: CSaveCommand = new CSaveCommand(mockDocument, "document.html");
        const setTitleCommand: CSetTitleCommand = new CSetTitleCommand(mockDocument, "new title");
        const macroCommand: CMacroCommand = new CMacroCommand([saveCommand, setTitleCommand]);

        macroCommand.execute();
        macroCommand.unexecute();

        expect(saveMockFunction).toBeCalledTimes(1);
        expect(saveMockFunction.mock.calls[0][0]).toEqual("document.html");
        expect(setTitleMockFunction).toBeCalledTimes(2);
        expect(setTitleMockFunction.mock.calls[0][0]).toEqual("new title");
        expect(setTitleMockFunction.mock.calls[1][0]).toEqual("");
    });
});