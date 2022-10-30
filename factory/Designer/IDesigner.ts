import { CLayout } from "../CLayout";
import LineByLineReader from "line-by-line";

export interface IDesigner {
    getLayout(stream: LineByLineReader): Promise<CLayout>;
}
