import { IUserGumballMachine } from "../GumballMachine/IUserGumballMachine";
import { ICommand } from "./ICommand";

export class CTurnCrankCommand implements ICommand {
    constructor(gumballMachine: IUserGumballMachine) {
        this.m_gumballMachine = gumballMachine;
    }

    public execute(): void {
        this.m_gumballMachine.turnCrank();
    }

    private m_gumballMachine: IUserGumballMachine;
}