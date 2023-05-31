import { IUserGumballMachine } from "../GumballMachine/IUserGumballMachine";
import { ICommand } from "./ICommand";

export class CEjectQuarterCommand implements ICommand {
    constructor(gumballMachine: IUserGumballMachine) {
        this.m_gumballMachine = gumballMachine;
    }

    public execute(): void {
        this.m_gumballMachine.ejectQuarter();
    }

    private m_gumballMachine: IUserGumballMachine;
}