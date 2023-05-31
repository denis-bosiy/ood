import { IState } from "./IState";
import { IGumballMachine } from "../GumballMachine/IGumballMachine";

export class CHasQuarterState implements IState {
    constructor(gumballMachine: IGumballMachine) {
        this.m_gumballMachine = gumballMachine;
    }

    public insertQuarter(): void {
        if (this.m_gumballMachine.getQuartersCount() === this.m_gumballMachine.getQuartersLimit()) {
            console.log("You can't insert another quarter. The Limit is " + this.m_gumballMachine.getQuartersLimit());
        } else {
            this.m_gumballMachine.addQuarter();
            console.log("Quarter has inserted");
        }
    }
    public ejectQuarter(): void {
        console.log("Quarters returned");
        this.m_gumballMachine.resetQuarters();
        this.m_gumballMachine.setNoQuarterState();
    }
    public turnCrank(): void {
        if (this.m_gumballMachine.getQuartersCount() !== 0) {
            console.log("You turned...");
            this.m_gumballMachine.removeQuarter();
            this.m_gumballMachine.setSoldState();
        }
    }
    public dispense(): void {
        console.log("No gumball dispensed");
    }
    public toString(): string {
        return "waiting for turn of crank";
    }

    private m_gumballMachine: IGumballMachine;
};