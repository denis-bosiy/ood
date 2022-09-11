export {};

// FlyBehavior 

interface IFlyBehavior {
    fly(): void;
};

class FlyWithWings implements IFlyBehavior {
    private departuresCount = 0;

    public fly(): void {
        this.departuresCount++;
        console.log("I'm flying with wings!!");
        console.log("Departures counts = ", this.departuresCount);
    }
};

class FlyNoWay implements IFlyBehavior {
    public fly(): void { }
};

// QuackBehavior

interface IQuackBehavior {
    quack(): void;
};

class QuackBehavior implements IQuackBehavior {
    public quack(): void {
        console.log("Quack Quack!!!");
    }
};

class SqueakBehavior implements IQuackBehavior {
    public quack(): void {
        console.log("Squeek!!!");
    }
};

class MuteQuackBehavior implements IQuackBehavior {
    public quack(): void { }
};

// DanceBehavior

interface IDanceBehavior {
    dance(): void;
}

class WaltzDanceBehavior implements IDanceBehavior {
    public dance(): void {
        console.log("I'm dancing waltz");
    }
}

class MinuetDanceBehavior implements IDanceBehavior {
    public dance(): void {
        console.log("I'm dancing minuet");
    }
}

class NoDanceBehavior implements IDanceBehavior {
    public dance(): void { }
}

// Duck

class Duck {
    constructor(flyBehavior: IFlyBehavior,
        quackBehavior: IQuackBehavior,
        danceBehavior: IDanceBehavior) {
        this.setQuackBehavior(quackBehavior);
        this.setFlyBehavior(flyBehavior);
        this.setDanceBehavior(danceBehavior);
    }
    public quack(): void {
        this.m_quackBehavior.quack();
    }
    public swim(): void {
        console.log("I'm swimming");
    }
    public fly(): void {
        this.m_flyBehavior.fly();
    }
    public dance(): void {
        this.m_danceBehavior.dance();
    }
    public setQuackBehavior(quackBehavior: IQuackBehavior): void {
        console.assert(!!quackBehavior);
        this.m_quackBehavior = quackBehavior;
    }
    public setFlyBehavior(flyBehavior: IFlyBehavior): void {
        console.assert(!!flyBehavior);
        this.m_flyBehavior = flyBehavior;
    }
    public setDanceBehavior(danceBehavior: IDanceBehavior): void {
        console.assert(!!danceBehavior);
        this.m_danceBehavior = danceBehavior;
    }
    public display(): void { }

    private m_flyBehavior: IFlyBehavior;
    private m_quackBehavior: IQuackBehavior;
    private m_danceBehavior: IDanceBehavior;
};

class MallardDuck extends Duck {
    constructor() {
        super(new FlyWithWings(), new QuackBehavior(), new WaltzDanceBehavior());
    }

    public display(): void {
        console.log("I'm mallard duck");
    }
};

class RedheadDuck extends Duck {
    constructor() {
        super(new FlyWithWings(), new QuackBehavior(), new MinuetDanceBehavior());
    }
    public display(): void {
        console.log("I'm redhead duck")
    }
};

class DecoyDuck extends Duck {
    constructor() {
        super(new FlyNoWay(), new MuteQuackBehavior(), new NoDanceBehavior());
    }

    public display(): void {
        console.log("I'm decoy duck");
    }
};

class RubberDuck extends Duck {
    constructor() {
        super(new FlyNoWay(), new SqueakBehavior(), new NoDanceBehavior());
    }

    public display(): void {
        console.log("I'm rubber duck");
    }
};

class ModelDuck extends Duck {
    constructor() {
        super(new FlyNoWay(), new QuackBehavior(), new NoDanceBehavior());
    }

    public display(): void {
        console.log("I'm model duck");
    }
};

// Функции для взаимодействия с утками

function makeDuckFly(duck: Duck): void {
    duck.fly();
}

function playWithDuck(duck: Duck): void {
    duck.display();
    makeDuckFly(duck);
    console.log();
}

// Основной код выполнения

const mallardDuck = new MallardDuck();
playWithDuck(mallardDuck);
playWithDuck(mallardDuck);
mallardDuck.setFlyBehavior(new FlyWithWings());
console.log("Changed behavior");
playWithDuck(mallardDuck);

const redheadDuck = new RedheadDuck();
playWithDuck(redheadDuck);

const decoyDuck = new DecoyDuck();
playWithDuck(decoyDuck); 