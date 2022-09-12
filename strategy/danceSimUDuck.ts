export { };

// FlyBehavior 

interface IFlyBehavior {
  fly(): void;
};

class FlyWithWings implements IFlyBehavior {
  public fly(): void {
    console.log("I'm flying with wings!!");
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
    if (!!quackBehavior) {
      this.m_quackBehavior = quackBehavior;
    }
  }
  public setFlyBehavior(flyBehavior: IFlyBehavior): void {
    console.assert(!!flyBehavior);
    if (!!flyBehavior) {
      this.m_flyBehavior = flyBehavior;
    }
  }
  public setDanceBehavior(danceBehavior: IDanceBehavior): void {
    console.assert(!!danceBehavior);
    if (!!danceBehavior) {
      this.m_danceBehavior = danceBehavior;
    }
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

function drawDuck(duck: Duck): void {
  duck.display();
}

function playWithDuck(duck: Duck): void {
  drawDuck(duck);
  duck.quack();
  duck.fly();
  duck.dance();
  console.log("");
}

// Основной код выполнения

const mallardDuck = new MallardDuck();
playWithDuck(mallardDuck);

const redheadDuck = new RedheadDuck();
playWithDuck(redheadDuck);

const rubberDuck = new RubberDuck();
playWithDuck(rubberDuck);

const decoyDuck = new DecoyDuck();
playWithDuck(decoyDuck);

const modelDuck = new ModelDuck();
playWithDuck(modelDuck);
modelDuck.setFlyBehavior(new FlyWithWings());
playWithDuck(modelDuck);