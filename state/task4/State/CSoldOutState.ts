import { IState } from "./IState";
import { IGumballMachine } from "../GumballMachine/IGumballMachine";

export class CSoldOutState implements IState {
    constructor(gumballMachine: IGumballMachine) {
        this.m_gumballMachine = gumballMachine;
    }

    public insertQuarter(): void {
        console.log("You can't insert a quarter, the machine is sold out");
    }
    public ejectQuarter(): void {
        if (this.m_gumballMachine.getQuartersCount() !== 0) {
            console.log("Quarters returned");
            this.m_gumballMachine.resetQuarters();
        } else {
            console.log("You can't eject, you haven't inserted a quarter yet");
        }
    }
    public turnCrank(): void {
        console.log("You turned but there's no gumballs");
    }
    public dispense(): void {
        console.log("No gumball dispensed");
    }
    public toString(): string {
        return "sold out";
    }

    private m_gumballMachine: IGumballMachine;
};