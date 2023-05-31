import LineByLineReader from "line-by-line";
import { CDocument } from "./states/CDocument";
import { CHistory } from "./CHistory";
import { IHistory } from "./IHistory";
import { CInsertParagraphCommand } from "./commands/CInsertParagraphCommand";
import { CInsertImageCommand } from "./commands/CInsertImageCommand";
import { ICommand } from "./commands/ICommand";
import { CSaveCommand } from "./commands/CSaveCommand";
import { CListCommand } from "./commands/CListCommand";
import { CReplaceTextCommand } from "./commands/CReplaceTextCommand";
import { CResizeImageCommand } from "./commands/CResizeImageCommand";
import { CDeleteItemCommand } from "./commands/CDeleteItemCommand";
import { CHelpCommand } from "./commands/CHelpCommand";
import { CRedoCommand } from "./commands/CRedoCommand";
import { CUndoCommand } from "./commands/CUndoCommand";
import { CSetTitleCommand } from "./commands/CSetTitleCommand";
import { CMacroCommand } from "./commands/CMacroCommand";
import { CParser } from "./CParser";

export class CClient {
    private m_readableStream: LineByLineReader;

    constructor(stream: LineByLineReader) {
        this.m_readableStream = stream;
    }

    public startProcessingStream(): Promise<void> {
        const availableCommands: string[] = [
            "InsertParagraph",
            "InsertImage",
            "SetTitle",
            "List",
            "ReplaceText",
            "ResizeImage",
            "DeleteItem",
            "Help",
            "Undo",
            "Redo",
            "Save",
            "begin_macro",
            "end_macro",
            "Exit",
        ];
        const macroCommandsMap: Map<string, ICommand> = new Map<string, ICommand>();
        const availableCommandDescriptions: Map<string, string> = new Map<string, string>();
        availableCommandDescriptions.set("insertparagraph", "<position>|end <text> — inserts paragraph to position with specific text");
        availableCommandDescriptions.set("insertimage", "<position>|end <width> <height> <path> — inserts image to position with specific path, width and height");
        availableCommandDescriptions.set("settitle", "<text> — sets title to the current document");
        availableCommandDescriptions.set("list", "shows the list of items of the current document");
        availableCommandDescriptions.set("replacetext", "<position>|end <text> — replaces text of the paragraph in the specific position");
        availableCommandDescriptions.set("resizeimage", "<position>|end <width> <height> — resizes image in the specific position");
        availableCommandDescriptions.set("deleteitem", "<position>|end — deletes item in the specific position");
        availableCommandDescriptions.set("help", "shows list of available commands");
        availableCommandDescriptions.set("undo", "reverts last command");
        availableCommandDescriptions.set("redo", "reverts last reverted command");
        availableCommandDescriptions.set("save", "saves document as html file to the specific path");
        availableCommandDescriptions.set("exit", "closes the program");
        availableCommandDescriptions.set("begin_macro", "<macrocommand name> <macrocommand description> — starts recording new macrocommand");
        availableCommandDescriptions.set("end_macro", "stops recording macrocommand");
        const helpCommand: ICommand = new CHelpCommand(availableCommands, availableCommandDescriptions);
        helpCommand.execute();

        const history: IHistory = new CHistory();
        const document: CDocument = new CDocument(history);

        enum AvailableCommand {
            InsertParagraph = "insertparagraph",
            InsertImage = "insertimage",
            SetTitle = "settitle",
            List = "list",
            ReplaceText = "replacetext",
            ResizeImage = "resizeimage",
            DeleteItem = "deleteitem",
            Help = "help",
            Undo = "undo",
            Redo = "redo",
            Save = "save",
            Exit = "exit",
            BeginMacro = "begin_macro",
            EndMacro = "end_macro"
        };

        return new Promise<void>((resolve, reject) => {
            let isMacroCommandRecording: boolean = false;
            let newMacroCommandName: string = "";
            let newMacroCommandDescription: string = "";
            let macroCommands: ICommand[] = [];

            const processClientsMessages = (line: string) => {
                const args: string[] = line.split(" ");

                switch (args[0].toLowerCase()) {
                    case AvailableCommand.InsertParagraph:
                        try {
                            const parsedArgs: any[] = CParser.parseInsertParagraphArgs(args.slice(1, args.length), document.getItemsCount());
                            const insertParagraphCommand: ICommand = new CInsertParagraphCommand(document, parsedArgs[1],
                                parsedArgs[0]);
                            if (!isMacroCommandRecording) {
                                history.addAndExecuteCommand(insertParagraphCommand);
                                console.log("Inserting paragraph was successfully executed");
                            } else {
                                macroCommands.push(insertParagraphCommand);
                            }
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.InsertImage:
                        try {
                            const parsedArgs: any[] = CParser.parseInsertImageArgs(args.slice(1, args.length), document.getItemsCount());
                            const insertImageCommand: ICommand = new CInsertImageCommand(document, parsedArgs[3],
                                parsedArgs[1], parsedArgs[2],
                                parsedArgs[0]);
                            if (!isMacroCommandRecording) {
                                history.addAndExecuteCommand(insertImageCommand);
                                console.log("Inserting image was successfully executed");
                            } else {
                                macroCommands.push(insertImageCommand);
                            }
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.SetTitle:
                        try {
                            const parsedArgs: any[] = CParser.parseSetTitleArgs(args.slice(1, args.length));
                            const setTitleCommand: ICommand = new CSetTitleCommand(document, parsedArgs[0]);
                            if (!isMacroCommandRecording) {
                                history.addAndExecuteCommand(setTitleCommand);
                                console.log("Setting title was successfully executed");
                            } else {
                                macroCommands.push(setTitleCommand);
                            }
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.List:
                        try {
                            const listCommand: ICommand = new CListCommand(document);
                            if (!isMacroCommandRecording) {
                                listCommand.execute();
                            } else {
                                macroCommands.push(listCommand);
                            }
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.ReplaceText:
                        try {
                            const parsedArgs: any[] = CParser.parseReplaceTextArgs(args.slice(1, args.length), document.getItemsCount());
                            const replaceTextCommand: ICommand = new CReplaceTextCommand(document, parsedArgs[1],
                                parsedArgs[0]);
                            if (!isMacroCommandRecording) {
                                history.addAndExecuteCommand(replaceTextCommand);
                                console.log("Replacing text was successfully executed");
                            } else {
                                macroCommands.push(replaceTextCommand);
                            }
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.ResizeImage:
                        try {
                            const parsedArgs: any[] = CParser.parseResizeImageArgs(args.slice(1, args.length), document.getItemsCount());
                            const resizeImageCommand: ICommand = new CResizeImageCommand(document, parsedArgs[1], parsedArgs[2], parsedArgs[0]);
                            if (!isMacroCommandRecording) {
                                history.addAndExecuteCommand(resizeImageCommand);
                                console.log("Resizing image was successfully executed");
                            } else {
                                macroCommands.push(resizeImageCommand);
                            }
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.DeleteItem:
                        try {
                            const parsedArgs: any[] = CParser.parseDeleteItemArgs(args.slice(1, args.length), document.getItemsCount());
                            const deleteItemCommand: ICommand = new CDeleteItemCommand(document, parsedArgs[0]);
                            if (!isMacroCommandRecording) {
                                history.addAndExecuteCommand(deleteItemCommand);
                                console.log("Deleting item was successfully executed");
                            } else {
                                macroCommands.push(deleteItemCommand);
                            }
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.Help:
                        try {
                            const helpCommand: ICommand = new CHelpCommand(availableCommands, availableCommandDescriptions);
                            if (!isMacroCommandRecording) {
                                helpCommand.execute();
                            } else {
                                macroCommands.push(helpCommand);
                            }
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.BeginMacro:
                        try {
                            if (isMacroCommandRecording) {
                                throw new Error("Macrocommand is already recording");
                            }
                            const parsedArgs: any[] = CParser.parseBeginMacroArgs(args.slice(1, args.length));
                            isMacroCommandRecording = true;
                            newMacroCommandName = parsedArgs[0];
                            newMacroCommandDescription = parsedArgs[1];
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.EndMacro:
                        try {
                            if (!isMacroCommandRecording) {
                                throw new Error("Macrocommand was not recording");
                            }
                            const macroCommand: ICommand = new CMacroCommand(macroCommands);
                            availableCommands.push(newMacroCommandName);
                            availableCommandDescriptions.set(newMacroCommandName.toLowerCase(), newMacroCommandDescription);
                            macroCommandsMap.set(newMacroCommandName.toLowerCase(), macroCommand);
                            isMacroCommandRecording = false;
                            macroCommands = [];
                            console.log("Macrocommand recording has successfully stopped. New macrocommand was added to available commands");
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.Undo:
                        try {
                            const undoCommand: ICommand = new CUndoCommand(document);
                            if (!isMacroCommandRecording) {
                                undoCommand.execute();
                                console.log("Undo action was successfully executed");
                            } else {
                                macroCommands.push(undoCommand);
                            }
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.Redo:
                        try {
                            const redoCommand: ICommand = new CRedoCommand(document);
                            if (!isMacroCommandRecording) {
                                redoCommand.execute();
                                console.log("Redo action was successfully executed");
                            } else {
                                macroCommands.push(redoCommand);
                            }
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.Save:
                        try {
                            const parsedArgs: any[] = CParser.parseSaveArgs(args.slice(1, args.length));
                            const saveCommand: ICommand = new CSaveCommand(document, parsedArgs[0]);
                            if (!isMacroCommandRecording) {
                                history.addAndExecuteCommand(saveCommand);
                                console.log("Saving was successfully executed");
                            } else {
                                macroCommands.push(saveCommand);
                            }
                        } catch (e) {
                            console.log(String(e));
                        }
                        break;
                    case AvailableCommand.Exit:
                        resolve();
                        break;
                    default:
                        if (macroCommandsMap.has(args[0].toLowerCase())) {
                            try {
                                const macroCommand: ICommand | undefined = macroCommandsMap.get(args[0].toLowerCase());
                                if (macroCommand) {
                                    history.addAndExecuteCommand(macroCommand);
                                }
                                console.log(args[0] + " was successfully executed");
                            } catch (e) {
                                console.log(String(e));
                            }
                        } else {
                            console.log("Unknown command. Try again");
                        }
                        break;
                }
            }
            this.m_readableStream.on('line', processClientsMessages);
            this.m_readableStream.on('end', () => resolve());
            this.m_readableStream.on('error', (e) => reject(e));
        })
    }
}