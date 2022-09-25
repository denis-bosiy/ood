import * as readline from "readline";
import { IBeverage } from "./IBeverage";
import { CCoffee, CLatte, CTea } from "./Beverages";
import { CChocolateCrumbs, CCinnamon, CIceCubes, CLemon, IceType } from "./Condiments";

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question: string): Promise<string> {
  return new Promise<string>(resolve => {
    rl.question(question, (input: string) => resolve(input));
  });
}


async function dialogWithUser(): Promise<void> {
  let beverage: IBeverage | null = null;
  let answer: string = "";

  answer = await ask("Type 1 for coffee or 2 for tea");
  if (answer === "1") {
    beverage = new CCoffee();
  }
  else if (answer === "2") {
    beverage = new CTea();
  }
  else {
    return;
  }


  while (answer === "1" || answer === "2") {
    answer = await ask("1 - Lemon, 2 - Cinnamon, 0 - Checkout");
    if (answer === "1") {
      beverage = new CLemon(beverage);
    }
    if (answer === "2") {
      beverage = new CCinnamon(beverage);
    }
  }
  if (answer !== "0") {
    return;
  }

  console.log(beverage.getDescription(), "cost:", beverage.getCost());
  rl.close();
}


dialogWithUser();

// {
//   // Наливаем чашечку латте
//   const latte = new CLatte();
//   // добавляем корицы
//   const cinnamon = new CCinnamon(latte);
//   // добавляем пару долек лимона
//   const lemon = new CLemon(cinnamon, 2);
//   // добавляем пару кубиков льда
//   const iceCubes = new CIceCubes(lemon, 2, IceType.Dry);
//   // добавляем 2 грамма шоколадной крошки
//   const beverage = new CChocolateCrumbs(iceCubes, 2);

//   // Выписываем счет покупателю
//   console.log(beverage.getDescription(), "costs", beverage.getCost());
// }

// {
//   const beverage = new CChocolateCrumbs(new CIceCubes(new CLemon(new CCinnamon(new CLatte()), 2), 2, IceType.Dry), 2);

//   // Выписываем счет покупателю
//   console.log(beverage.getDescription(), "costs", beverage.getCost());
// }
