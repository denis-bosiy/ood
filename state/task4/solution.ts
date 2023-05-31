import { CClient } from "./CClient";
import { CEjectQuarterCommand } from "./Command/CEjectQuarterCommand";
import { CInsertQuarterCommand } from "./Command/CInsertQuarterCommand";
import { CShowInfoCommand } from "./Command/CShowInfoCommand";
import { CTurnCrankCommand } from "./Command/CTurnCrankCommand";
import { CGumballMachine } from "./GumballMachine/CGumballMachine";
import { IUserGumballMachine } from "./GumballMachine/IUserGumballMachine";
import { CMenu } from "./Menu/CMenu";
import LineByLineReader from "line-by-line";
import { exit } from "process";

const DEFAULT_GUMS_COUNT = 10;
const { stdin: input, stdout: output } = require('process');

const menu: CMenu = new CMenu();
const menuDescription = {
    "eject": 0,
    "insert": 1,
    "turncrank": 2,
    "showinfo": 3
};
const rl = new LineByLineReader(input);
const gumballMachine: IUserGumballMachine = new CGumballMachine(DEFAULT_GUMS_COUNT);
menu.addCommand(new CEjectQuarterCommand(gumballMachine), 0);
menu.addCommand(new CInsertQuarterCommand(gumballMachine), 1);
menu.addCommand(new CTurnCrankCommand(gumballMachine), 2);
menu.addCommand(new CShowInfoCommand(gumballMachine), 3);
const client = new CClient(rl, menu, menuDescription);

client.startProcessingStream().then(() => exit()).catch((e) => console.log(e));