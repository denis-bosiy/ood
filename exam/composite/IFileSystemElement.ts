import { CAbstractFolder } from "./CAbstractFolder";

export interface IFileSystemElement {
    getName(): string;
    isFolder(): this is CAbstractFolder;
}