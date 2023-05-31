import LineByLineReader from "line-by-line";
import { IMenu } from "./Menu/IMenu";

// TODO: Вынести ответственность за считывание сообщений в класс Menu(есть у Малова в репе)
export class CClient {
    private m_readableStream: LineByLineReader;
    private m_menu: IMenu;
    private m_menuDescription: { [key: string]: number; };

    private printHelpMessage(): void {
        console.log("-----------------------------");
        console.log("Available commands:");
        console.log("eject - eject quarter from the machine");
        console.log("insert - insert quarter to the machine");
        console.log("turnCrank - turn crank of the machine");
        console.log("showInfo - show info about the machine");
        console.log("help - print help message");
        console.log("exit - close the program");
        console.log("-----------------------------");
    }

    constructor(stream: LineByLineReader, menu: IMenu, menuDescription: { [key: string]: number; }) {
        this.m_readableStream = stream;
        this.m_menu = menu;
        this.m_menuDescription = menuDescription;
    }

    public startProcessingStream(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.printHelpMessage();

            enum AvailableCommand {
                Eject = "eject",
                Insert = "insert",
                TurnCrank = "turncrank",
                ShowInfo = "showinfo",
                Help = "help",
                Exit = "exit"
            };

            const processClientsMessages = (line: string) => {
                switch (line.toLowerCase()) {
                    case AvailableCommand.Eject:
                    case AvailableCommand.Insert:
                    case AvailableCommand.TurnCrank:
                    case AvailableCommand.ShowInfo:
                        this.m_menu.executeCommandAtIndex(this.m_menuDescription[line.toLowerCase()]);
                        console.log("Command successfully executed");
                        break;
                    case AvailableCommand.Help:
                        this.printHelpMessage();
                        break;
                    case AvailableCommand.Exit:
                        this.m_readableStream.off("line", processClientsMessages);
                        resolve();
                        break;
                    default:
                        console.log("Unknown message. Try again");
                        break;
                }
            }
            this.m_readableStream.on('line', processClientsMessages);
            this.m_readableStream.on('end', () => resolve());
            this.m_readableStream.on('error', (e) => reject(e));
        })
    }
}