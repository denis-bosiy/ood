import { IGumballMachine } from "./IGumballMachine";
import { IUserGumballMachine } from "./IUserGumballMachine";
import { CSoldState } from "../states/CSoldState";
import { CSoldOutState } from "../states/CSoldOutState";
import { CNoQuarterState } from "../states/CNoQuarterState";
import { CHasQuarterState } from "../states/CHasQuarterState";
import { IState } from "../states/IState";

export class CGumballMachine implements IGumballMachine, IUserGumballMachine {
	constructor(gumsCount: number) {
		if (gumsCount < 0) {
			throw new Error("Gums count can not be negative number");
		}

		this.m_state = new CSoldOutState(this);
		this.m_count = gumsCount;
		if (this.m_count > 0) {
			this.m_state = new CNoQuarterState(this);
		}
	}

	public ejectQuarter(): void {
		this.m_state.ejectQuarter();
	}
	public insertQuarter(): void {
		this.m_state.insertQuarter();
	}
	public turnCrank(): void {
		this.m_state.turnCrank();
		this.m_state.dispense();
	}
	public showInfo(): void {
		console.log("Mighty Gumball, Inc");
		console.log("Typescript-enabled Standing Gumball Model #2022");
		console.log("Inventory:", this.m_count + " gumball" + (this.m_count !== 1 ? "s" : ""));
		console.log("Machine is", this.m_state.toString());
	}

	public getGumsCount(): number {
		return this.m_count;
	}
	public releaseGum(): void {
		if (this.m_count !== 0) {
			console.log("A gumball comes rolling out the slot...");
			--this.m_count;
		}
	}

	public setSoldOutState(): void {
		this.m_state = new CSoldOutState(this);
	}
	public setNoQuarterState(): void {
		this.m_state = new CNoQuarterState(this);
	}
	public setSoldState(): void {
		this.m_state = new CSoldState(this);
	}
	public setHasQuarterState(): void {
		this.m_state = new CHasQuarterState(this);
	}

	private m_count: number = 0;
	private m_state: IState;
};