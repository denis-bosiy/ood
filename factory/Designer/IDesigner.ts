import { readline } from "../libs";
import { CLayout } from "../layout";

export interface IDesigner {
    getLayout(stream: readline.Interface): Promise<CLayout>;
}
