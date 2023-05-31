import { CCanvas } from "./canvas/CCanvas";
import { ICanvas } from "./canvas/ICanvas";
import { CFrame } from "./CFrame";
import { CPoint } from "./CPoint";
import { CGroup } from "./group/CGroup";
import { IGroup } from "./group/IGroup";
import { CEllipse } from "./shapes/CEllipse";
import { CRectangle } from "./shapes/CRectangle";
import { CTriangle } from "./shapes/CTriangle";
import { IShape } from "./shapes/IShape";
import { CSlide } from "./slide/CSlide";
import { ISlide } from "./slide/ISlide";
import { CFillStyle } from "./styles/CFillStyle";
import { CLineStyle } from "./styles/CLineStyle";
import { CRGBAColor } from "./styles/CRGBAColor";

const slide: ISlide = new CSlide();
const canvas: ICanvas = new CCanvas(1000, 1000);

const leftEye: IShape = new CEllipse(new CFrame(70, 70, 30, 30), new CLineStyle(new CRGBAColor(255, 255, 0, 1), 3), new CFillStyle(new CRGBAColor(0, 0, 0, 0), false), new CPoint(100, 100), 30, 30);
const rightEye: IShape = new CEllipse(new CFrame(870, 70, 30, 30), new CLineStyle(new CRGBAColor(255, 255, 0, 1), 3), new CFillStyle(new CRGBAColor(0, 0, 0, 0), false), new CPoint(900, 100), 30, 30);
const eyes: IGroup = new CGroup(new CFrame(70, 70, 860, 30));
eyes.insertShape(leftEye, 0);
eyes.insertShape(rightEye, 1);
eyes.insertShape(eyes, 2);
const eyebrow: IShape = new CRectangle(new CFrame(250, 100, 500, 30), new CLineStyle(new CRGBAColor(0, 0, 0, 1), 3), new CFillStyle(new CRGBAColor(0, 0, 0, 0), false), new CPoint(250, 100), 500, 30);
const nostrils: IShape = new CTriangle(new CFrame(400, 250, 200, 100), new CLineStyle(new CRGBAColor(255, 255, 0, 1), 3), new CFillStyle(new CRGBAColor(255, 255, 0, 0), false), [new CPoint(400, 250), new CPoint(600, 250), new CPoint(500, 350)]);
const mouth: IShape = new CEllipse(new CFrame(200, 450, 300, 50), new CLineStyle(new CRGBAColor(255, 0, 0, 1), 3), new CFillStyle(new CRGBAColor(255, 255, 0, 0), false), new CPoint(500, 500), 300, 50);

// Примеры изменения состояний фигур относительно координатной сетки
mouth.setFrame(new CFrame(200, 450, 100, 100));
// nostrils.setFrame(new CFrame(500, 150, 400, 200));
// eyebrow.setFrame(new CFrame(50, 100, 700, 30));
// eyes.setFrame(new CFrame(0, 0, 860, 30));
// Мариец
eyes.setFrame(new CFrame(70, 70, 860, 5));

slide.addShape(eyes);
slide.addShape(nostrils);
slide.addShape(mouth);

const style = eyes.getLineStyle();
console.log(style.getColor()?.toString());
eyes.insertShape(eyebrow, 3);
console.log(style.getColor()?.toString());
console.log(eyes.getLineStyle().getColor()?.toString());

slide.draw(canvas);

canvas.saveToPng("image.png").then(() => {
    console.log("Successfully executed");
}).catch((e) => {
    console.log(String(e));
});