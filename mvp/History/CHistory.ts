import { ICommand } from "../Command/ICommand";
import { IHistory } from "./IHistory";

export class CHistory implements IHistory {
    private m_commands: ICommand[];
    private m_currentActionIndex: number;

    constructor() {
        this.m_commands = [];
        this.m_currentActionIndex = -1;
    }

    public canUndo(): boolean {
        return this.m_currentActionIndex >= 0;
    }

    public canRedo(): boolean {
        return (this.m_commands.length - 1) > this.m_currentActionIndex;
    }

    public undo(): void {
        if (!this.canUndo()) {
            throw new Error("Can not execute undo action");
        }

        this.m_commands[this.m_currentActionIndex].unexecute();
        this.m_currentActionIndex--;
    }

    public redo(): void {
        if (!this.canRedo()) {
            throw new Error("Can not execute redo action");
        }

        this.m_currentActionIndex++;
        this.m_commands[this.m_currentActionIndex].execute();
    }

    public addAndExecuteCommand(command: ICommand): void {
        const newActionIndex: number = this.m_currentActionIndex + 1;
        if (this.m_commands.length < newActionIndex) {
            this.m_commands.push(command);
        }
        this.m_commands[newActionIndex] = command;
        this.m_currentActionIndex = newActionIndex;
        command.execute();
    }
}