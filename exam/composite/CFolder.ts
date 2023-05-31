import { CAbstractFolder } from "./CAbstractFolder";
import { IFileSystemElement } from "./IFileSystemElement";

export class CFolder extends CAbstractFolder {
    private m_elements: IFileSystemElement[];

    constructor(name: string) {
        super(name);
        this.m_elements = [];
    }

    public add(element: IFileSystemElement): void {
        this.m_elements.push(element);
    }

    public remove(element: IFileSystemElement): void {
        const foundElementIndex: number = this.m_elements.indexOf(element);

        if (foundElementIndex !== -1) {
            this.m_elements.splice(foundElementIndex, 1);
        }
    }

    public getElement(position: number): IFileSystemElement | undefined {
        let element: IFileSystemElement | undefined = undefined;

        const lastIndex: number = this.m_elements.length - 1;
        if (position >= 0 || position <= lastIndex) {
            element = this.m_elements[position];
        }

        return element;
    }

    public getElementsCount(): number {
        return this.m_elements.length;
    }
}