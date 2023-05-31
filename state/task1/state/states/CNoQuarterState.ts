import { IState } from "./IState";
import { IGumballMachine } from "../gumballMachine/IGumballMachine";

export class CNoQuarterState implements IState {
    constructor(gumballMachine: IGumballMachine) {
        this.m_gumballMachine = gumballMachine;
    }

    public insertQuarter(): void {
        console.log("You inserted a quarter");
        this.m_gumballMachine.setHasQuarterState();
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