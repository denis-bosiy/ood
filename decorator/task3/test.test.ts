import { promises } from "fs";
import { run } from "./solution";

describe("bdd testing", () => {
    test("compress scenario", (done: any) => {
        run(["--compress", "decorator/task3/testFiles/compress/in.txt", "decorator/task3/testFiles/compress/out.txt"]);
        promises.readFile("decorator/task3/testFiles/compress/out.txt", 'ascii').then((data: string) => {
            expect(data).toEqual('helo');
            done();
        });
    });

    test("compress + decompress scenario", (done: any) => {
        run(["--compress", "--decompress", "decorator/task3/testFiles/compressDecompress/in.txt", "decorator/task3/testFiles/compressDecompress/out.txt"]);

        promises.readFile("decorator/task3/testFiles/compressDecompress/out.txt", 'ascii').then((data: string) => {
            expect(data).toEqual('abc');
            done();
        });
    });

    test("encrypt scenario", (done: any) => {
        run(["--encrypt", "15", "decorator/task3/testFiles/encrypt/in.txt", "decorator/task3/testFiles/encrypt/out.txt"]);

        promises.readFile("decorator/task3/testFiles/encrypt/out.txt", 'ascii').then((data: string) => {
            expect(data).toEqual('efojt=fp');
            done();
        });
    });

    test("decrypt scenario", (done: any) => {
        run(["--decrypt", "15", "decorator/task3/testFiles/decrypt/in.txt", "decorator/task3/testFiles/decrypt/out.txt"]);

        promises.readFile("decorator/task3/testFiles/decrypt/out.txt", 'ascii').then((data: string) => {
            expect(data).toEqual(' br');
            done();
        });
    });

    test("encrypt + decrypt scenario", (done: any) => {
        run(["--encrypt", "15", "--decrypt", "15", "decorator/task3/testFiles/encryptDecrypt/in.txt", "decorator/task3/testFiles/encryptDecrypt/out.txt"]);

        promises.readFile("decorator/task3/testFiles/encryptDecrypt/out.txt", 'ascii').then((data: string) => {
            expect(data).toEqual('denis, hello!');
            done();
        });
    });
});