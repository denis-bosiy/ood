import { CHistory } from "./CHistory";
import { ICommand } from "./commands/ICommand";
import { CSaveCommand } from "./commands/CSaveCommand";
import { CDocument } from "./states/CDocument";

describe("test history", () => {
    test("History with 1 command. can undo -> true, can redo -> false", () => {
        const history: CHistory = new CHistory();
        const document: CDocument = new CDocument(history);
        const saveCommand: ICommand = new CSaveCommand(document, "command/document.html");
        
        history.addAndExecuteCommand(saveCommand);

        expect(history.canUndo()).toBeTruthy();
        expect(history.canRedo()).toBeFalsy();
    });

    test("Empty history. can undo -> false, can redo -> false", () => {
        const history: CHistory = new CHistory();

        expect(history.canUndo()).toBeFalsy();
        expect(history.canRedo()).toBeFalsy();
    });

    test("History with 1 undone command. can undo -> false, can redo -> true", () => {
        const history: CHistory = new CHistory();
        const document: CDocument = new CDocument(history);
        const saveCommand: ICommand = new CSaveCommand(document, "command/document.html");
    
        history.addAndExecuteCommand(saveCommand);
        history.undo();
        
        expect(history.canUndo()).toBeFalsy();
        expect(history.canRedo()).toBeTruthy();
    });

    test("History with 1 undone and redone command. can undo -> true, can redo -> false", () => {
        const history: CHistory = new CHistory();
        const document: CDocument = new CDocument(history);
        const saveCommand: ICommand = new CSaveCommand(document, "command/document.html");
    
        history.addAndExecuteCommand(saveCommand);
        history.undo();
        history.redo();

        expect(history.canUndo()).toBeTruthy();
        expect(history.canRedo()).toBeFalsy();
    });

    test("History: 1 command + undone command + 1 command. can undo -> true, can redo -> false", () => {
        const history: CHistory = new CHistory();
        const document: CDocument = new CDocument(history);
        const saveCommand: ICommand = new CSaveCommand(document, "command/document.html");

        history.addAndExecuteCommand(saveCommand);
        history.undo();
        history.addAndExecuteCommand(saveCommand);

        expect(history.canUndo()).toBeTruthy();
        expect(history.canRedo()).toBeFalsy();
    });
});