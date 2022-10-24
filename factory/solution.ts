import { readline } from "./libs";
import { CClient } from "./client";
import { CCanvas } from "./Canvas/CCanvas";

const { stdin: input, stdout: output } = require('process');

const canvas: CCanvas = new CCanvas(1000, 1000);
const rl = readline.createInterface({ input, output });
const client: CClient = new CClient(canvas, rl);

client.startProcessingStream();