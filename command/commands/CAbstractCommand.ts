import { ICommand } from "./ICommand";

export abstract class CAbstractCommand implements ICommand {
    private m_executed: boolean;

    constructor() {
        this.m_executed = false;
    }

    public execute(): void {
        this.m_executed = true;
        this.doExecute();
    }

    public unexecute(): void {
        if (this.m_executed) {
            this.doUnexecute();
        }
    }

    protected abstract doExecute(): void;

    protected abstract doUnexecute(): void;
}