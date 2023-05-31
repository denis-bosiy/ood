import { CAbstractFolder } from "./CAbstractFolder";
import { IFileSystemElement } from "./IFileSystemElement";

export class CFile implements IFileSystemElement {
    private m_name: string;
    private m_ext: string;

    constructor(name: string, ext: string) {
        this.m_name = name;
        this.m_ext = ext;
    }

    getName(): string {
        return this.m_name + "." + this.m_ext;
    }

    isFolder(): this is CAbstractFolder {
        return false;
    }
}