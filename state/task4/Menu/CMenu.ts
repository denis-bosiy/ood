import { ICommand } from "../Command/ICommand";
import { IMenu } from "./IMenu";

export class CMenu implements IMenu {
    constructor() {}

    public addCommand(command: ICommand, index: number): void {
        this.m_commands.splice(index, 0, command);
    }

    public executeCommandAtIndex(index: number): void {
        if (this.m_commands[index]) {
            this.m_commands[index].execute();
        } else {
            throw new Error("Can not get command at the index");
        }
    }

    private m_commands: ICommand[] = [];
}