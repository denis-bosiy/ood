import { CFile } from "./CFile";
import { CFolder } from "./CFolder";
import { IFileSystemElement } from "./IFileSystemElement";

const folder: IFileSystemElement = new CFolder("folder1");
const file: IFileSystemElement = new CFile("image", "png");

console.log(folder.getName());
console.log(file.getName());
console.log("-------");

if (folder.isFolder()) {
    folder.add(file);
    console.log(folder.getElementsCount());
    console.log(folder.getElement(0)?.getName());
    console.log(folder.getElement(1)?.getName());
    folder.remove(file);
    console.log(folder.getElementsCount());
    console.log(folder.getElement(0)?.getName());
    console.log("-------");
}

if (!file.isFolder()) {
    console.log("File is not a folder");
    // Do some operations with the file
}