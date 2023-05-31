import { ICommand } from "./commands/ICommand";

export interface IHistory {
    canUndo(): boolean;
    undo(): void;
    canRedo(): boolean;
    redo(): void;
    addAndExecuteCommand(command: ICommand): void;
}