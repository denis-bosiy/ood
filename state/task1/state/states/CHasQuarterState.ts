import { IState } from "./IState";
import { IGumballMachine } from "../gumballMachine/IGumballMachine";

export class CHasQuarterState implements IState {
    constructor(gumballMachine: IGumballMachine) {
        this.m_gumballMachine = gumballMachine;
    }

    public insertQuarter(): void {
        console.log("You can't insert another quarter");
    }
    public ejectQuarter(): void {
        console.log("Quarter returned");
        this.m_gumballMachine.setNoQuarterState();
    }
    public turnCrank(): void {
        console.log("You turned...");
        this.m_gumballMachine.setSoldState();
    }
    public dispense(): void {
        console.log("No gumball dispensed");
    }
    public toString(): string {
        return "waiting for turn of crank";
    }

    private m_gumballMachine: IGumballMachine;
};