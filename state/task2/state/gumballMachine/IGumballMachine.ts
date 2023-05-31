export interface IGumballMachine {
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