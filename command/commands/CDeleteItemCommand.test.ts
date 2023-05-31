import { CDocument } from "../states/CDocument";
import { CHistory } from "../CHistory";
import { CInsertParagraphCommand } from "./CInsertParagraphCommand";
import { CDeleteItemCommand } from "./CDeleteItemCommand";

describe("test delete item command", () => {
    const log = console.log;

    beforeEach(() => {
        console.log = jest.fn();
    });

    afterAll(() => {
        console.log = log;
    });

    test("execute delete item command at item", () => {
        const mockHistory: CHistory = new CHistory();
        const mockDocument: CDocument = new CDocument(mockHistory);
        const insertParagraphCommand: CInsertParagraphCommand = new CInsertParagraphCommand(mockDocument, "default text", 0);
        const deleteItemCommand: CDeleteItemCommand = new CDeleteItemCommand(mockDocument, 0);

        insertParagraphCommand.execute();
        deleteItemCommand.execute();

        expect(mockDocument.getItemsCount()).toBe(0);
    });

    test("execute delete item command at nonexistent item", () => {
        const mockHistory: CHistory = new CHistory();
        const mockDocument: CDocument = new CDocument(mockHistory);
        const deleteItemCommand: CDeleteItemCommand = new CDeleteItemCommand(mockDocument, 0);

        expect(() => deleteItemCommand.execute()).toThrowError("Incorrect item position");
    });
});