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
		this.m_gumsCount = gumsCount;
		if (this.m_gumsCount > 0) {
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
		console.log("Inventory:", this.m_gumsCount + " gumball" + (this.m_gumsCount !== 1 ? "s" : ""));
		console.log("Machine is", this.m_state.toString());
	}

	public getGumsCount(): number {
		return this.m_gumsCount;
	}
	public releaseGum(): void {
		if (this.m_gumsCount !== 0) {
			console.log("A gumball comes rolling out the slot...");
			--this.m_gumsCount;
		}
	}
	public refill(gumsCount: number): void {
		if (gumsCount < 0) {
			console.log("Incorrect gums count value");
		} else {
			this.m_state.refill(gumsCount);
		}
	}
	public setGumsCount(gumsCount: number): void {
		this.m_gumsCount = gumsCount;
	}
	public addQuarter(): void {
		if (this.m_quartersCount === this.QUARTERS_LIMIT) {
			console.log("Can not add quarter, because of limit of quarters(5)");
		} else {
			this.m_quartersCount++;
		}
	}
	public removeQuarter(): void {
		if (this.m_quartersCount === 0) {
			console.log("Can not remove quarter, because there is no quarters");
		} else {
			this.m_quartersCount--;
		}
	}
	public resetQuarters(): void {
		this.m_quartersCount = 0;
	}
	public getQuartersCount(): number {
		return this.m_quartersCount;
	}
	public getQuartersLimit(): number {
		return this.QUARTERS_LIMIT;
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
	public setState(state: IState): void {
		this.m_state = state;
	}

	private m_quartersCount: number = 0;
	private m_gumsCount: number = 0;
	private m_state: IState;

	private readonly QUARTERS_LIMIT: number = 5;
};