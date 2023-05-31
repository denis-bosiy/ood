import { CAbstractCommand } from "./CAbstractCommand";
import { ICommand } from "./ICommand";

export class CMacroCommand extends CAbstractCommand {
    private m_commands: ICommand[];

    constructor(commands: ICommand[]) {
        super();

        this.m_commands = commands;
    }

    protected doExecute(): void {
        this.m_commands.forEach((command: ICommand) => {
            command.execute();
        });
    }

    protected doUnexecute(): void {
        this.m_commands.forEach((command: ICommand) => {
            command.unexecute();
        });
    }
}