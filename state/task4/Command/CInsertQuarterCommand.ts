import { IUserGumballMachine } from "../GumballMachine/IUserGumballMachine";
import { ICommand } from "./ICommand";

export class CInsertQuarterCommand implements ICommand {
    constructor(gumballMachine: IUserGumballMachine) {
        this.m_gumballMachine = gumballMachine;
    }

    public execute(): void {
        this.m_gumballMachine.insertQuarter();
    }

    private m_gumballMachine: IUserGumballMachine;
}