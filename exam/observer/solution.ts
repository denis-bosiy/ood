import { CDog } from "./CDog";
import { CWatchman } from "./CWatchman";
import { CEnclosure } from "./CEnclosure";

const dog: CDog = new CDog(0, 3);
const enclosure: CEnclosure = new CEnclosure(0, 10);
const watchman: CWatchman = new CWatchman(dog, enclosure);
dog.addObserver(watchman);

dog.tick(10);