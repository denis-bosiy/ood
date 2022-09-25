import { CCoffee } from "./Beverages";
import { CChocolateSlices, CCream, CLiquor, LiquorType } from "./Condiments"
import { IBeverage } from "./IBeverage";

describe("test cream", () => {
    test("cost of cream should be 25", () => {
        const coffee: IBeverage = new CCoffee();
        const coffeeWithCream = new CCream(coffee);

        expect(coffeeWithCream.getCost()).toBe(25 + coffee.getCost());
    });

    test("description of cream should be 'Cream'", () => {
        const coffee: IBeverage = new CCoffee();
        const coffeWithCream = new CCream(coffee);

        expect(coffeWithCream.getDescription()).toBe("Coffee, Cream");
    });
});

describe("test chocolate slices", () => {
    test("const of 1 chocolate slice should be 10", () => {
        const coffee: IBeverage = new CCoffee();
        const coffeeWithCream = new CChocolateSlices(coffee, 1);

        expect(coffeeWithCream.getCost()).toBe(10 + coffee.getCost());
    });

    test("default count of chocolate slices should be 1", () => {
        const coffee: IBeverage = new CCoffee();
        const coffeeWithCream = new CChocolateSlices(coffee);

        expect(coffeeWithCream.getCost()).toBe(10 + coffee.getCost());
    });

    test("if count of chocolate slices more than 5, then exception should be throwed", () => {
        const coffee: IBeverage = new CCoffee();
        
        expect(() => new CChocolateSlices(coffee, 6)).toThrow("Count of chocolate slices should be less than 5 and more than 0, you type: 6");
    });

    test("if count of chocolate slices less than 0, then exception should be throwed", () => {
        const coffee: IBeverage = new CCoffee();
        
        expect(() => new CChocolateSlices(coffee, -1)).toThrow("Count of chocolate slices should be less than 5 and more than 0, you type: -1");
    });
});

describe("test liquor", () => {
    test("price of chocolate liquor should be 50", () => {
        const coffee: IBeverage = new CCoffee();
        const coffeeWithLiquor = new CLiquor(coffee, LiquorType.Chocolate);

        expect(coffeeWithLiquor.getCost()).toBe(50 + coffee.getCost());
    });

    test("price of nutty liquor should be 50", () => {
        const coffee: IBeverage = new CCoffee();
        const coffeeWithLiquor = new CLiquor(coffee, LiquorType.Nutty);

        expect(coffeeWithLiquor.getCost()).toBe(50 + coffee.getCost());
    });

    test("description of chocolate liqour should be 'Chocolate liquor'", () => {
        const coffee: IBeverage = new CCoffee();
        const coffeeWithLiquor = new CLiquor(coffee, LiquorType.Chocolate);

        expect(coffeeWithLiquor.getDescription()).toBe("Coffee, Chocolate liquor");
    });

    test("description of nutty liqour should be 'Nutty liquor'", () => {
        const coffee: IBeverage = new CCoffee();
        const coffeeWithLiquor = new CLiquor(coffee, LiquorType.Nutty);

        expect(coffeeWithLiquor.getDescription()).toBe("Coffee, Nutty liquor");
    });
});