export interface IGumballMachine {
    releaseGum(): void;
    getGumsCount(): number;

    setSoldOutState(): void;
    setNoQuarterState(): void;
    setSoldState(): void;
    setHasQuarterState(): void;
};