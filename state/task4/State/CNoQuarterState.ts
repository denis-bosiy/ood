import { IState } from "./IState";
import { IGumballMachine } from "../GumballMachine/IGumballMachine";

export class CNoQuarterState implements IState {
    constructor(gumballMachine: IGumballMachine) {
        this.m_gumballMachine = gumballMachine;
    }

    public insertQuarter(): void {
        if (this.m_gumballMachine.getQuartersCount() === this.m_gumballMachine.getQuartersLimit()) {
            console.log("You can't insert another quarter. The Limit is " + this.m_gumballMachine.getQuartersLimit());
        } else {
            console.log("You inserted a quarter");
            this.m_gumballMachine.addQuarter();
            this.m_gumballMachine.setHasQuarterState();
        }
    }
    public ejectQuarter(): void {
        console.log("You haven't inserted a quarter");
    }
    public turnCrank(): void {
        console.log("You turned but there's no quarter");
    }
    public dispense(): void {
        console.log("You need to pay first");
    }
    public toString(): string {
        return "waiting for quarter";
    }

    private m_gumballMachine: IGumballMachine;
};