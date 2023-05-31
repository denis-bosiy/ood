import { CClient } from "./CClient";
import { exit } from "process";
import LineByLineReader from "line-by-line";

const { stdin: input, stdout: output } = require('process');
const rl = new LineByLineReader(input);

const client: CClient = new CClient(rl);
client.startProcessingStream().then(() => exit()).catch((e) => console.log(e));