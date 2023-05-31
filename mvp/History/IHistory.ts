import { ICommand } from "../Command/ICommand";

export interface IHistory {
    canUndo(): boolean;
    canRedo(): boolean;
    undo(): void;
    redo(): void;
    addAndExecuteCommand(command: ICommand): void;
}