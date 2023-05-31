import { IBeverage } from "./IBeverage";

// Базовая реализация напитка, предоставляющая его описание
abstract class CBeverage implements IBeverage {
  private m_description: string;

  constructor(description: string) {
    this.m_description = description;
  }

  getDescription(): string {
    return this.m_description;
  }

  abstract getCost(): number;
};

// Кофе
export class CCoffee extends CBeverage {
  constructor(description: string = "Coffee") {
    super(description);
  }

  getCost(): number {
    return 60;
  }
};

export enum CappuccinoType {
  Standard,
  Double
};

// Капуччино
export class CCappuccino extends CCoffee {
  // TODO: CappuccinoType -> CappuccinoSize
  private m_type: CappuccinoType;

  constructor(type: CappuccinoType = CappuccinoType.Standard) {
    let description = "";
    switch (type) {
      case CappuccinoType.Standard:
        description += "Standard";
        break;
      case CappuccinoType.Double:
        description += "Double";
        break;
      default:
        break;
    }
    description += " Cappuccino";
    super(description);
    this.m_type = type;
  }

  getCost(): number {
    switch (this.m_type) {
      case CappuccinoType.Standard:
        return 80;
      case CappuccinoType.Double:
        return 120;
      default:
        return 0;
    }
  }
};

export enum LatteType {
  Standard,
  Double
};

// Латте
export class CLatte extends CCoffee {
  // TODO: LatteType -> LatteSize
  private m_type: LatteType;

  constructor(type: LatteType = LatteType.Standard) {
    let description = "";
    switch (type) {
      case LatteType.Standard:
        description += "Standard";
        break;
      case LatteType.Double:
        description += "Double";
        break;
      default:
        break;
    }
    description += " Latte";
    super(description);
    this.m_type = type;
  }

  getCost(): number {
    switch (this.m_type) {
      case LatteType.Standard:
        return 90;
      case LatteType.Double:
        return 130;
      default:
        return 0;
    }
  }
};

export enum TeaVariety {
  Standard,
  Darjeeling,
  Assam,
  Nilgiri,
  Kangra
};

// Чай
export class CTea extends CBeverage {
  private m_variety: TeaVariety;

  constructor(variety: TeaVariety = TeaVariety.Standard) {
    let description = "";
    switch (variety) {
      case TeaVariety.Standard:
        description += "Standard";
        break;
      case TeaVariety.Darjeeling:
        description += "Darjeeling";
        break;
      case TeaVariety.Assam:
        description += "Assam";
        break;
      case TeaVariety.Nilgiri:
        description += "Nilgiri";
        break;
      case TeaVariety.Kangra:
        description += "Kangra";
        break;
      default:
        break;
    }
    description += " Tea";
    super(description);
    this.m_variety = variety;
  }

  getCost(): number {
    return 30;
  }
};

export enum BeverageSize {
  Small,
  Medium,
  Big
};

// Молочный коктейль
export class CMilkshake extends CBeverage {
  private m_size: BeverageSize;

  constructor(size: BeverageSize = BeverageSize.Medium) {
    let description = "";
    switch (size) {
      case BeverageSize.Small:
        description += "Small";
        break;
      case BeverageSize.Medium:
        description += "Medium";
        break;
      case BeverageSize.Big:
        description += "Big";
        break;
      default:
        break;
    }
    description += " Milkshake";
    super(description);
    this.m_size = size;
  }

  getCost(): number {
    switch (this.m_size) {
      case BeverageSize.Small:
        return 50;
      case BeverageSize.Medium:
        return 60;
      case BeverageSize.Big:
        return 80;
      default:
        return 0;
    }
  }
};