import { CDecompressDecorator } from "./inputStream/CDecompressDecorator";
import { CDecryptionDecorator } from "./inputStream/CDecryptionDecorator";
import { CFileInputStream } from "./inputStream/CFileInputStream";
import { IInputStream } from "./inputStream/IInputStream";
import { CCompressDecorator } from "./outputStream/CCompressDecorator";
import { CEncryptionDecorator } from "./outputStream/CEncryptionDecorator";
import { CFileOutputStream } from "./outputStream/CFileOutputStream";
import { IOutputStream } from "./outputStream/IOutputStream";

enum ArgsOption {
    Encrypt = '--encrypt',
    Decrypt = '--decrypt',
    Compress = '--compress',
    Decompress = '--decompress'
};
const DEFAULT_BLOCK_SIZE: number = 4;
const cliArgs: string[] = process.argv.slice(2);

export function run(args: string[]) {
    console.log(args);
    try {
        if (args.length < 2) {
            throw new Error("Invalid arguments count, count should be greater than 1");
        }
        let inputStream: IInputStream = new CFileInputStream(args[args.length - 2]);
        let outputStream: IOutputStream = new CFileOutputStream(args[args.length - 1]);
    
        let i = 0;
        while (i < args.length - 2) {
            switch (args[i]) {
                case ArgsOption.Decrypt:
                    if (++i >= args.length - 2) {
                        throw new Error("Not provided key for decryption");
                    }
                    const decryptKey: number = Number(args[i]);
                    inputStream = new CDecryptionDecorator(inputStream, decryptKey);
                    break;
                case ArgsOption.Encrypt:
                    if (++i >= args.length - 2) {
                        throw new Error("Not provided key for encryption");
                    }
                    const encryptKey: number = Number(args[i]);
                    outputStream = new CEncryptionDecorator(outputStream, encryptKey);
                    break;
                case ArgsOption.Compress:
                    outputStream = new CCompressDecorator(outputStream);
                    break;
                case ArgsOption.Decompress:
                    inputStream = new CDecompressDecorator(inputStream);
                    break;
                default:
                    throw new Error("Invalid argument");
            }
            i++;
        }
        while (!inputStream.isEof()) {
            const buff: number[] = [];
            const actualBlockSize: number = inputStream.readBlock(buff, DEFAULT_BLOCK_SIZE);
            outputStream.writeBlock(Buffer.from(buff), actualBlockSize);
        }
        outputStream.finishTransmitting();
    
    } catch (e) {
        console.log(e.message);
    }
}

run(cliArgs);
