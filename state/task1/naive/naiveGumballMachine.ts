namespace naive {

    enum State {
        SoldOut,		// Жвачка закончилась
        NoQuarter,		// Нет монетки
        HasQuarter,		// Есть монетка
        Sold,			// Монетка выдана
    };

    class CGumballMachine {
        constructor(count: number) {
            this.m_count = count;
            this.m_state = count > 0 ? State.NoQuarter : State.SoldOut;
        }

        public insertQuarter(): void {
            switch (this.m_state) {
                case State.SoldOut:
                    console.log("You can't insert a quarter, the machine is sold out");
                    break;
                case State.NoQuarter:
                    console.log("You inserted a quarter");
                    this.m_state = State.HasQuarter;
                    break;
                case State.HasQuarter:
                    console.log("You can't insert another quarter");
                    break;
                case State.Sold:
                    console.log("Please wait, we're already giving you a gumball");
                    break;
            }
        }

        public ejectQuarter(): void {
            switch (this.m_state) {
                case State.HasQuarter:
                    console.log("Quarter returned");
                    this.m_state = State.NoQuarter;
                    break;
                case State.NoQuarter:
                    console.log("You haven't inserted a quarter");
                    break;
                case State.Sold:
                    console.log("Sorry you already turned the crank");
                    break;
                case State.SoldOut:
                    console.log("You can't eject, you haven't inserted a quarter yet");
                    break;
            }
        }

        public turnCrank(): void {
            switch (this.m_state) {
                case State.SoldOut:
                    console.log("You turned but there's no gumballs");
                    break;
                case State.NoQuarter:
                    console.log("You turned but there's no quarter");
                    break;
                case State.HasQuarter:
                    console.log("You turned...");
                    this.m_state = State.Sold;
                    this.dispense();
                    break;
                case State.Sold:
                    console.log("Turning twice doesn't get you another gumball");
                    break;
            }
        }

        public refill(numBalls: number): void {
            this.m_count = numBalls;
            this.m_state = numBalls > 0 ? State.NoQuarter : State.SoldOut;
        }

        public toString(): string {
            const state: string =
                (this.m_state == State.SoldOut) ? "sold out" :
                    (this.m_state == State.NoQuarter) ? "waiting for quarter" :
                        (this.m_state == State.HasQuarter) ? "waiting for turn of crank"
                            : "delivering a gumball";

            return `Mighty Gumball, Inc.\n
        C++-enabled Standing Gumball Model #2016\n
        Inventory: ${this.m_count}\n gumball ${this.m_count !== 1 ? "s" : ""}\n
        Machine is ${state}\n`;
        }

        private dispense(): void {
            switch (this.m_state) {
                case State.Sold:
                    console.log("A gumball comes rolling out the slot");
                    --this.m_count;
                    if (this.m_count == 0) {
                        console.log("Oops, out of gumballs");
                        this.m_state = State.SoldOut;
                    }
                    else {
                        this.m_state = State.NoQuarter;
                    }
                    break;
                case State.NoQuarter:
                    console.log("You need to pay first");
                    break;
                case State.SoldOut:
                case State.HasQuarter:
                    console.log("No gumball dispensed");
                    break;
            }
        }

        private m_count: number;	// Количество шариков
        private m_state: State = State.SoldOut;
    };
}