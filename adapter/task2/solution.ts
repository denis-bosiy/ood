import { app } from "./app/app";

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Should we use new API? [y/n] ', (answer) => {
    switch (answer.toLowerCase()) {
        case 'y':
            app.paintPictureOnModernGraphicsRenderer();
            break;
        case 'n':
            app.paintPictureOnCanvas();
            break;
        default:
            console.log('Invalid answer!');
    }

    rl.close();
});