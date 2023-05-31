import { IFileSystemElement } from "./IFileSystemElement";

export abstract class CAbstractFolder implements IFileSystemElement {
    private m_name: string;

    constructor(name: string) {
        this.m_name = name;
    }

    public getName(): string {
        return this.m_name;
    }

    public isFolder(): this is CAbstractFolder {
        return true;
    }

    public abstract add(element: IFileSystemElement): void;
    public abstract remove(element: IFileSystemElement): void;
    public abstract getElement(position: number): IFileSystemElement | undefined;
    public abstract getElementsCount(): number;
}