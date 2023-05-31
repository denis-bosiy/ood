import { CAddShapeCommand } from "./Command/CAddShapeCommand";
import { CDeleteShapeCommand } from "./Command/CDeleteShapeCommand";
import { CRedoCommand } from "./Command/CRedoCommand";
import { CUndoCommand } from "./Command/CUndoCommand";
import { CMoveShapeCommand } from "./Command/CMoveShapeCommand";
import { CResizeShapeCommand } from "./Command/CResizeShapeCommand";
import { ICommand } from "./Command/ICommand";
import { IHistory } from "./History/IHistory";
import { IObserver } from "./Observer/IObserver";
import { IShape } from "./Shape/IShape";
import { IState } from "./State/IState";
import { CView } from "./view";
import { ShapeType } from "./shapeType";
import { CFrame } from "./Frame/CFrame";
import { defaultEllipseOptions, defaultRectangleOptions, defaultTriangleOptions } from "./Shape/DefaultShapeOptions";
import { CEllipse } from "./Shape/CEllipse";
import { CPoint } from "./Point/CPoint";
import { CRectangle } from "./Shape/CRectangle";
import { CTriangle } from "./Shape/CTriangle";
import { CVector } from "./Vector/CVector";
import { ShapeUtil } from "./utils/ShapeUtil";
import { ICanvasElement } from "./CanvasElement/ICanvasElement";
import { CExportShape } from "./Shape/CExportShape";
import { CState } from "./State/CState";
import { IModel } from "./Model/IModel";
import { CModel } from "./Model/CModel";

export class CPresenter implements IObserver {
  private m_model: IModel;
  private m_view: CView;

  constructor(model?: IModel) {
    this.m_model = model ?? new CModel();
    this.m_model.registerObserver(this);
    this.m_view = new CView(this);
  }

  public init(): void {
    this.m_view.addListeners();
  }

  public getView(): CView {
    return this.m_view;
  }

  public getHistory(): IHistory {
    return this.m_model.getHistory();
  }

  public getState(): IState {
    return this.m_model.getState();
  }

  public getCurrentShape(): IShape | null {
    return this.m_model.getCurrentShape();
  }

  public setCurrentShape(shape: IShape | null): void {
    this.m_model.setCurrentShape(shape);
  }

  public undoLastCommand(): void {
    try {
      const undoCommand: ICommand = new CUndoCommand(this.m_model);
      undoCommand.execute();
    } catch (e) {
      alert(e);
    }
  }

  public redoLastCommand(): void {
    try {
      const redoCommand: ICommand = new CRedoCommand(this.m_model);
      redoCommand.execute();
    } catch (e) {
      alert(e);
    }
  }

  public update(): void {
    this.m_view.updateView(this.m_model);
  }

  public addShape(shapeType: ShapeType): void {
    let shape: IShape | undefined;

    switch (shapeType) {
      case ShapeType.Ellipse:
        const ellipseFrame: CFrame = new CFrame(defaultEllipseOptions.frameOptions.x, defaultEllipseOptions.frameOptions.y,
          defaultEllipseOptions.frameOptions.width, defaultEllipseOptions.frameOptions.height);
        shape = new CEllipse(ellipseFrame, new CPoint(defaultEllipseOptions.centerPoint.x, defaultEllipseOptions.centerPoint.y), defaultEllipseOptions.radiusX, defaultEllipseOptions.radiusY);
        break;
      case ShapeType.Rectangle:
        const rectangleFrame: CFrame = new CFrame(defaultRectangleOptions.frameOptions.x, defaultRectangleOptions.frameOptions.y,
          defaultRectangleOptions.frameOptions.width, defaultRectangleOptions.frameOptions.height);
        shape = new CRectangle(rectangleFrame, new CPoint(defaultRectangleOptions.leftTopPoint.x, defaultRectangleOptions.leftTopPoint.y), defaultRectangleOptions.width, defaultRectangleOptions.height);
        break;
      case ShapeType.Triangle:
        const triangleFrame: CFrame = new CFrame(defaultTriangleOptions.frameOptions.x, defaultTriangleOptions.frameOptions.y,
          defaultTriangleOptions.frameOptions.width, defaultTriangleOptions.frameOptions.height);
        const trianglePoints: CPoint[] = defaultTriangleOptions.points.map((point: CPoint) => new CPoint(point.x, point.y));
        shape = new CTriangle(triangleFrame, trianglePoints);
        break;
      default:
        break;
    }


    // TODO: Вынести создание команд на уровень модели
    if (shape) {
      const addCommand: ICommand = new CAddShapeCommand(shape, this.m_model);
      this.getHistory().addAndExecuteCommand(addCommand);
    }
  }

  public deleteShape(shape: IShape): void {
    const deleteCommand: ICommand = new CDeleteShapeCommand(shape, this.m_model);
    this.getHistory().addAndExecuteCommand(deleteCommand);
  }

  public deleteCurrentShape(): void {
    const currentShape: IShape | null = this.getCurrentShape();

    if (currentShape) {
      this.deleteShape(currentShape);
      this.setCurrentShape(null);
    }
  }

  public moveShape(shape: IShape, delta: CVector): void {
    const moveShapeCommand: ICommand = new CMoveShapeCommand(this.m_model, shape, delta);
    this.getHistory().addAndExecuteCommand(moveShapeCommand);
  }

  public resizeShape(shape: IShape, delta: CVector): void {
    const resizeShapeCommand: ICommand = new CResizeShapeCommand(this.m_model, shape, delta);
    this.getHistory().addAndExecuteCommand(resizeShapeCommand);
  }

  public changeShapeElementPositionAtView(shapeElement: ICanvasElement, delta: CVector): void {
    const oldPoint: CPoint = new CPoint(shapeElement.getX(), shapeElement.getY());

    if (oldPoint.x !== -1 && oldPoint.y !== -1) {
      const newPoint: CPoint = new CPoint(oldPoint.x + delta.x, oldPoint.y + delta.y);

      shapeElement.setX(newPoint.x);
      shapeElement.setY(newPoint.y);
    }
  }

  public resizeShapeElementAtView(shapeElement: ICanvasElement, delta: CVector): void {
    const oldSize: CVector = new CVector(shapeElement.getWidth(), shapeElement.getHeight());

    if (oldSize.x !== -1 && oldSize.y !== -1) {
      const newSize: CVector = new CPoint(Math.max(ShapeUtil.MIN_FRAME_SIZE, oldSize.x + delta.x), Math.max(ShapeUtil.MIN_FRAME_SIZE, oldSize.y + delta.y));

      shapeElement.setWidth(newSize.x);
      shapeElement.setHeight(newSize.y);
    }
  }

  public processStateFile(e: Event): void {
    if (e) {
      const htmlInputElement: HTMLInputElement = e.target as HTMLInputElement;
      if (htmlInputElement.files) {
        const file: File = htmlInputElement.files[0];
        if (!file) {
          return;
        }
        const reader: FileReader = new FileReader();
        const onLoadListener: () => void = (): void => {
          const contents: string | ArrayBuffer | null = reader.result;
          if (contents) {
            const dtoState = JSON.parse(contents.toString());
            if (dtoState.shapes) {
              const shapes: IShape[] = [];
              dtoState.shapes.forEach((shape: CExportShape) => {
                const frame: CFrame = new CFrame(shape.frame.x, shape.frame.y, shape.frame.width, shape.frame.height);
                switch(shape.shapeType) {
                  case ShapeType.Rectangle:
                    const leftTopPoint: CPoint = new CPoint(shape.additionAttributes.leftTopPoint.x, shape.additionAttributes.leftTopPoint.y);
                    shapes.push(new CRectangle(frame, leftTopPoint, shape.additionAttributes.width, shape.additionAttributes.height));
                    break;
                  case ShapeType.Ellipse:
                    const centerPoint: CPoint = new CPoint(shape.additionAttributes.centerPoint.x, shape.additionAttributes.centerPoint.y);
                    shapes.push(new CEllipse(frame, centerPoint, shape.additionAttributes.radiusX, shape.additionAttributes.radiusY));
                    break;
                  case ShapeType.Triangle:
                    const points: CPoint[] = shape.additionAttributes.points.map((point: any) => new CPoint(point.x, point.y));
                    shapes.push(new CTriangle(frame, points));
                    break;
                  default:
                    break;
                }
              });
              const newState: IState = new CState();
              newState.setShapes(shapes);
              this.m_model.setState(newState);
              this.m_model.clearHistory();
              this.m_model.setCurrentShape(null);
            }
          }
        };
        reader.onload = onLoadListener;
        reader.readAsText(file);
      }
    }
  }

  public saveStateFile(): void {
    const state: IState = this.m_model.getState();
    const dtoShapes: CExportShape[] = state.getShapes().map((shape: IShape) => shape.export());
    const dtoState: object = {shapes: dtoShapes};
    const file: Blob = new Blob([JSON.stringify(dtoState)], {type: "text"});

    const anchor = document.createElement("a");
    anchor.style.display = "none";
    anchor.href = URL.createObjectURL(file);
    anchor.download = "state.json";
    anchor.click();
  }

  public saveStateAsFile(): void {
    const pickerOptions = {
      suggestedName: `state.json`,
      types: [
        {
          description: 'Editor file',
          accept: {
            'text/plain': ['.json'],
          },
        },
      ],
    };
    const state: IState = this.m_model.getState();
    const dtoShapes: CExportShape[] = state.getShapes().map((shape: IShape) => shape.export());
    const dtoState: object = {shapes: dtoShapes};
    const file: Blob = new Blob([JSON.stringify(dtoState)], {type: "text"});

    const fileHandle: Promise<any> = (window as any).showSaveFilePicker(pickerOptions);
    fileHandle.then((res: any) => {
      const writableFileStream: Promise<any> = res.createWritable();
      writableFileStream.then((res: any) => {
        const endPromise: Promise<any> = res.write(file);

        endPromise.then(() => {
          res.close();
        })
      });
    })
  }
}