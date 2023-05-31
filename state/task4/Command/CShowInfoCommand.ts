import { IUserGumballMachine } from "../GumballMachine/IUserGumballMachine";
import { ICommand } from "./ICommand";

export class CShowInfoCommand implements ICommand {
    constructor(gumballMachine: IUserGumballMachine) {
        this.m_gumballMachine = gumballMachine;
    }

    public execute(): void {
        this.m_gumballMachine.showInfo();
    }

    private m_gumballMachine: IUserGumballMachine;
}