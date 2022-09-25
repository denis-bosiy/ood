import { IBeverage } from "./IBeverage";

// Базовый декоратор "Добавка к напитку". Также является напитком
abstract class CCondimentDecorator implements IBeverage {
  private m_beverage: IBeverage;

  protected constructor(beverage: IBeverage) {
    this.m_beverage = beverage;
  }

  // Стоимость и описание добавки вычисляется в классах конкретных декораторов
  protected abstract getCondimentCost(): number;

  protected abstract getCondimentDescription(): string;

  getDescription(): string {
    // Описание декорированного напитка добавляется к описанию оборачиваемого напитка
    return this.m_beverage.getDescription() + ", " + this.getCondimentDescription();
  }

  getCost(): number {
    // Стоимость складывается из стоимости добавки и стоимости декорируемого напитка
    return this.m_beverage.getCost() + this.getCondimentCost();
  }
};

// Добавка из корицы
export class CCinnamon extends CCondimentDecorator {
  protected getCondimentCost(): number {
    return 20;
  }

  constructor(beverage: IBeverage) {
    super(beverage);
  }

  getCondimentDescription(): string {
    return "Cinnamon";
  }
};

// Лимонная добавка
export class CLemon extends CCondimentDecorator {
  private m_quantity: number;

  protected getCondimentCost(): number {
    return 10.0 * this.m_quantity;
  }

  constructor(beverage: IBeverage, quantity: number = 1) {
    super(beverage);
    this.m_quantity = quantity;
  }

  getCondimentDescription(): string {
    return "Lemon x " + this.m_quantity;
  }
};

export enum IceType {
  Dry,	// Сухой лед (для суровых сибирских мужиков)
  Water	// Обычные кубики из воды
};

// Добавка "Кубики льда". Определяется типом и количеством кубиков, что влияет на стоимость
// и описание
export class CIceCubes extends CCondimentDecorator {
  private m_iceType: IceType;
  private m_quantity: number;

  protected getCondimentCost(): number {
    // Чем больше кубиков, тем больше стоимость.
    // Сухой лед стоит дороже
    return (this.m_iceType == IceType.Dry ? 10 : 5) * this.m_quantity;
  }

  constructor(beverage: IBeverage, quantity: number, type: IceType = IceType.Water) {
    super(beverage);
    this.m_quantity = quantity;
    this.m_iceType = type;
  }

  getCondimentDescription(): string {
    return this.m_iceType == IceType.Dry ? "Dry" : "Water"
      + " ice cubes x " + this.m_quantity;
  }
};

// Тип сиропа
enum SyrupType {
	Chocolate,	// Шоколадный
	Maple	// Кленовый
};

// Добавка "Сироп"
export class CSyrup extends CCondimentDecorator
{
  private m_syrupType: SyrupType;

  protected getCondimentCost(): number
  {
    return 15;
  }

  protected getCondimentDescription(): string
  {
    return this.m_syrupType == SyrupType.Chocolate ? "Chocolate" : "Maple"
      + " syrup";
  }

  constructor(beverage: IBeverage, syrupType: SyrupType)
  {
    super(beverage);
    this.m_syrupType = syrupType;
  }
};

// Шоколадная крошка
export class CChocolateCrumbs extends CCondimentDecorator
{
  private m_mass: number;

  constructor(beverage: IBeverage, mass: number)
  {
    super(beverage);
    this.m_mass = mass;
  }

	getCondimentCost(): number
  {
    return 2.0 * this.m_mass;
  }

  getCondimentDescription(): string
  {
    return "Chocolate crumbs " + this.m_mass + "g";
  }
};

// Кокосовая стружка
export class CCoconutFlakes extends CCondimentDecorator
{
  private m_mass: number;

  protected getCondimentCost(): number
  {
    return 1.0 * this.m_mass;
  }

  protected getCondimentDescription(): string
  {
    return "Coconut flakes " + this.m_mass + "g";
  }

  constructor(beverage: IBeverage, mass: number)
  {
    super(beverage);
    this.m_mass = mass;
  }
};

// Сливки
export class CCream extends CCondimentDecorator
{
  protected getCondimentCost(): number
  {
    return 25;
  }

  protected getCondimentDescription(): string
  {
    return "Cream";
  }

  constructor(beverage: IBeverage)
  {
    super(beverage);
  }
};

// Шоколадные дольки
export class CChocolateSlices extends CCondimentDecorator
{
  private m_count: number;

  protected getCondimentCost(): number
  {
    return 10 * this.m_count;
  }

  protected getCondimentDescription(): string
  {
    return "Chocolate slices " + this.m_count + " count";
  }

  constructor(beverage: IBeverage, count: number = 1)
  {
    if (count < 0 || count > 5)
    {
      throw new Error("Count of chocolate slices should be less than 5 and more than 0, you type: " + count);
    }
    super(beverage);
    this.m_count = count;
  }
};

// Тип ликёра
export enum LiquorType {
	Chocolate,	// Шоколадный
	Nutty	// Ореховый
};

// Добавка "Ликёр"
export class CLiquor extends CCondimentDecorator
{
  private m_liquorType: LiquorType;

  protected getCondimentCost(): number
  {
    return 50;
  }

  protected getCondimentDescription(): string
  {
    switch(this.m_liquorType)
    {
      case LiquorType.Chocolate:
        return "Chocolate liquor";
      case LiquorType.Nutty:
        return "Nutty liquor";
      default:
        return "Liquor";
    }
  }

  constructor(beverage: IBeverage, liquorType: LiquorType)
  {
    super(beverage);
    this.m_liquorType = liquorType;
  }
};