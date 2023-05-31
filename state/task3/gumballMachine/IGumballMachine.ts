import { IState } from "../states/IState";

export interface IGumballMachine {
    refill(gumsCount: number): void;
    setGumsCount(gumsCount: number): void;
    addQuarter(): void;
    removeQuarter(): void;
    resetQuarters(): void;
    getQuartersCount(): number;
    releaseGum(): void;
    getGumsCount(): number;
    getQuartersLimit(): number;

    setSoldOutState(): void;
    setNoQuarterState(): void;
    setSoldState(): void;
    setHasQuarterState(): void;
};