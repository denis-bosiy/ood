import { CAbstractCommand } from "./CAbstractCommand";

export class CHelpCommand extends CAbstractCommand {
    private m_availableCommands: string[];
    private m_availableCommandDescriptions: Map<string, string>;

    constructor(availableCommands: string[], availableCommandDescriptions: Map<string, string>) {
        super();
        
        this.m_availableCommands = availableCommands;
        this.m_availableCommandDescriptions = availableCommandDescriptions;
    }

    protected doExecute(): void {
        this.m_availableCommands.forEach((availableCommand: string) => {
            console.log(availableCommand + " — " + this.m_availableCommandDescriptions.get(availableCommand.toLowerCase()));
        })
    }

    protected doUnexecute(): void {}
}