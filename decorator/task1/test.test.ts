import { BeverageSize, CappuccinoType, CCappuccino, CLatte, CMilkshake, CTea, LatteType, TeaVariety } from "./Beverages";

describe("test latte types", () => {
    test ("name of standard latte should be 'Standard Latte'", () => {
        const beverage = new CLatte(LatteType.Standard);
    
        expect(beverage.getDescription()).toBe("Standard Latte");
    });

    test("cost of standard latte should be 90", () => {
        const beverage = new CLatte(LatteType.Standard);
    
        expect(beverage.getCost()).toBe(90);
    });

    test ("name of double latte should be 'Double Latte'", () => {
        const beverage = new CLatte(LatteType.Double);
    
        expect(beverage.getDescription()).toBe("Double Latte");
    });

    test("cost of double latte should be 130", () => {
        const beverage = new CLatte(LatteType.Double);
    
        expect(beverage.getCost()).toBe(130);
    });
});

describe("test cappuccino types", () => {
    test ("name of standard cappuccino should be 'Standard Cappuccino'", () => {
        const beverage = new CCappuccino(CappuccinoType.Standard);
    
        expect(beverage.getDescription()).toBe("Standard Cappuccino");
    });

    test("cost of standard cappuccino should be 80", () => {
        const beverage = new CCappuccino(CappuccinoType.Standard);
    
        expect(beverage.getCost()).toBe(80);
    });

    test ("name of double latte should be 'Double Cappuccino'", () => {
        const beverage = new CCappuccino(CappuccinoType.Double);
    
        expect(beverage.getDescription()).toBe("Double Cappuccino");
    });

    test("cost of double cappuccino should be 120", () => {
        const beverage = new CCappuccino(CappuccinoType.Double);
    
        expect(beverage.getCost()).toBe(120);
    });
});

describe("test tea's varieties", () => {
    test("name of darjeeling variety should be 'Darjeeling Tea'", () => 
    {
        const bevarage = new CTea(TeaVariety.Darjeeling);

        expect(bevarage.getDescription()).toBe("Darjeeling Tea");
    });

    test("const of darjeeling variety should be 30", () =>
    {
        const bevarage = new CTea(TeaVariety.Darjeeling);

        expect(bevarage.getCost()).toBe(30);
    });

    test("name of assam variety should be 'Assam Tea'", () =>
    {
        const bevarage = new CTea(TeaVariety.Assam);

        expect(bevarage.getDescription()).toBe("Assam Tea");
    });

    test("const of assam variety should be 30", () =>
    {
        const bevarage = new CTea(TeaVariety.Assam);

        expect(bevarage.getCost()).toBe(30);
    });

    test("name of kangra variety should be 'Kangra Tea'", () =>
    {
        const bevarage = new CTea(TeaVariety.Kangra);

        expect(bevarage.getDescription()).toBe("Kangra Tea");
    });

    test("const of kangra variety should be 30", () =>
    {
        const bevarage = new CTea(TeaVariety.Kangra);

        expect(bevarage.getCost()).toBe(30);
    });

    test("name of nilgiri variety should be 'Nilgiri Tea'", () =>
    {
        const bevarage = new CTea(TeaVariety.Nilgiri);

        expect(bevarage.getDescription()).toBe("Nilgiri Tea");
    });

    test("const of nilgiri variety should be 30", () =>
    {
        const bevarage = new CTea(TeaVariety.Nilgiri);

        expect(bevarage.getCost()).toBe(30);
    });
});

describe("test milkshake's sizes", () => {
    test("default size of milkshake should be medium", () => {
        const beverage = new CMilkshake();

        expect(beverage.getDescription()).toBe("Medium Milkshake");
        expect(beverage.getCost()).toBe(60);
    });

    test("small size of milkshake should have small size properties", () => {
        const beverage = new CMilkshake(BeverageSize.Small);

        expect(beverage.getDescription()).toBe("Small Milkshake");
        expect(beverage.getCost()).toBe(50);
    });

    test("medium size of milkshake should have medium size properties", () => {
        const beverage = new CMilkshake(BeverageSize.Medium);

        expect(beverage.getDescription()).toBe("Medium Milkshake");
        expect(beverage.getCost()).toBe(60);
    });

    test("big size of milkshake should have big size properties", () => {
        const beverage = new CMilkshake(BeverageSize.Big);

        expect(beverage.getDescription()).toBe("Big Milkshake");
        expect(beverage.getCost()).toBe(80);
    });
})