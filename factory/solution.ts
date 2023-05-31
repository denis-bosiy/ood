import { CClient } from "./CClient";
import { CCanvas } from "./Canvas/CCanvas";
import { exit } from "process";
import LineByLineReader from "line-by-line";

const { stdin: input, stdout: output } = require('process');
const IMAGE_SIZE: number = 1000;

console.log("Image size is 1000x1000 px");
// TODO: ICanvas
const canvas: CCanvas = new CCanvas(IMAGE_SIZE, IMAGE_SIZE);
const rl = new LineByLineReader(input);
const client: CClient = new CClient(canvas, rl);

client.startProcessingStream().then(() => exit()).catch((e) => console.log(e));