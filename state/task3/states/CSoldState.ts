import { IState } from "./IState";
import { IGumballMachine } from "../gumballMachine/IGumballMachine";

export class CSoldState implements IState {
    constructor(gumballMachine: IGumballMachine) {
        this.m_gumballMachine = gumballMachine;
    }

    public insertQuarter(): void {
        console.log("Please wait, we're already giving you a gumball");
    }
    public ejectQuarter(): void {
        console.log("Sorry you already turned the crank");
    }
    public turnCrank(): void {
        console.log("Turning twice doesn't get you another gumball");
    }
    public dispense(): void {
        this.m_gumballMachine.releaseGum();
        if (this.m_gumballMachine.getGumsCount() === 0) {
            console.log("Oops, out of gumballs");
            this.m_gumballMachine.setSoldOutState();
        } else {
            if (this.m_gumballMachine.getQuartersCount() !== 0) {
                this.m_gumballMachine.setHasQuarterState();
            } else {
                this.m_gumballMachine.setNoQuarterState();
            }
        }
    }
    public toString(): string {
        return "delivering a gumball";
    }

    public refill(gumsCount: number): void {
        console.log("Can not change gums count while delivering a gumball");
    }

    private m_gumballMachine: IGumballMachine;
};