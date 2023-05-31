import { CDocumentItem } from "../states/CDocumentItem";
import { CImage } from "../states/CImage";
import { CParagraph } from "../states/CParagraph";
import { IDocument } from "../states/IDocument";
import { IImage } from "../states/IImage";
import { IParagraph } from "../states/IParagraph";
import { CRedoCommand } from "./CRedoCommand";

const undoMockFunction = jest.fn(() => {});
const falsyCanUndoMockFunction = jest.fn(() => {return false});
const truthyCanUndoMockFunction = jest.fn(() => {return true});
const redoMockFunction = jest.fn(() => {});
const falsyCanRedoMockFunction = jest.fn(() => {return false});
const truthyCanRedoMockFunction = jest.fn(() => {return true});


class CFalsyMockDocument implements IDocument {
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
    canUndo(): boolean { return falsyCanUndoMockFunction(); }
    undo(): void { undoMockFunction(); }
    canRedo(): boolean { return falsyCanRedoMockFunction(); }
    redo(): void { redoMockFunction(); }
    save(path: string): void { }
}

class CFalsyTruthyMockDocument implements IDocument {
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
    canUndo(): boolean { return falsyCanUndoMockFunction(); }
    undo(): void { undoMockFunction(); }
    canRedo(): boolean { return truthyCanRedoMockFunction(); }
    redo(): void { redoMockFunction(); }
    save(path: string): void { }
}

class CTruthyMockDocument implements IDocument {
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
    canUndo(): boolean { return truthyCanUndoMockFunction(); }
    undo(): void { undoMockFunction(); }
    canRedo(): boolean { return truthyCanRedoMockFunction(); }
    redo(): void { redoMockFunction(); }
    save(path: string): void { }
}

class CTruthyFalsyMockDocument implements IDocument {
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
    canUndo(): boolean { return truthyCanUndoMockFunction(); }
    undo(): void { undoMockFunction(); }
    canRedo(): boolean { return falsyCanRedoMockFunction(); }
    redo(): void { redoMockFunction(); }
    save(path: string): void { }
}

describe("test redo command", () => {
    beforeEach(() => {
        undoMockFunction.mockClear();
        falsyCanUndoMockFunction.mockClear();
        truthyCanUndoMockFunction.mockClear();
        redoMockFunction.mockClear();
        falsyCanRedoMockFunction.mockClear();
        truthyCanRedoMockFunction.mockClear();
    });

    test("unexecute undo command with falsy can undo and redo", () => {
        const mockDocument: IDocument = new CFalsyMockDocument();
        const redoCommand: CRedoCommand = new CRedoCommand(mockDocument);

        expect(() => redoCommand.execute()).toThrowError("Can not redo command");
        expect(() => redoCommand.unexecute()).toThrowError("Can not unexecute redo command");
        expect(falsyCanUndoMockFunction).toHaveBeenCalledTimes(1);
        expect(undoMockFunction).toHaveBeenCalledTimes(0);
        expect(falsyCanRedoMockFunction).toHaveBeenCalledTimes(1);
        expect(redoMockFunction).toHaveBeenCalledTimes(0);
    });

    test("unexecute undo command with falsy can undo and truthy can redo", () => {
        const mockDocument: IDocument = new CFalsyTruthyMockDocument();
        const redoCommand: CRedoCommand = new CRedoCommand(mockDocument);

        redoCommand.execute();
        expect(() => redoCommand.unexecute()).toThrowError("Can not unexecute redo command");
        expect(falsyCanUndoMockFunction).toHaveBeenCalledTimes(1);
        expect(undoMockFunction).toHaveBeenCalledTimes(0);
        expect(truthyCanRedoMockFunction).toHaveBeenCalledTimes(1);
        expect(redoMockFunction).toHaveBeenCalledTimes(1);
    });

    test("execute undo command with truthy can undo and falsy can redo", () => {
        const mockDocument: IDocument = new CTruthyFalsyMockDocument();
        const redoCommand: CRedoCommand = new CRedoCommand(mockDocument);

        expect(() => redoCommand.execute()).toThrowError("Can not redo command");
        expect(truthyCanUndoMockFunction).toHaveBeenCalledTimes(0);
        expect(undoMockFunction).toHaveBeenCalledTimes(0);
        expect(falsyCanRedoMockFunction).toHaveBeenCalledTimes(1);
        expect(redoMockFunction).toHaveBeenCalledTimes(0);
    });

    test("execute undo command with truthy can undo and redo", () => {
        const mockDocument: IDocument = new CTruthyMockDocument();
        const redoCommand: CRedoCommand = new CRedoCommand(mockDocument);

        redoCommand.execute();

        expect(truthyCanUndoMockFunction).toHaveBeenCalledTimes(0);
        expect(undoMockFunction).toHaveBeenCalledTimes(0);
        expect(truthyCanRedoMockFunction).toHaveBeenCalledTimes(1);
        expect(redoMockFunction).toHaveBeenCalledTimes(1);
    });
});