import { CPresenter } from "./presenter";
import { IShape } from "./Shape/IShape";
import { ShapeType } from "./shapeType";
import { ICanvas } from "./Canvas/ICanvas";
import { CCanvas } from "./Canvas/CCanvas";
import { CVector } from "./Vector/CVector";
import { CPoint } from "./Point/CPoint";
import { ICanvasElement } from "./CanvasElement/ICanvasElement";
import { IModel } from "./Model/IModel";

export class CView {
  private readonly DEFAULT_CANVAS_WIDTH: number = 640;
  private readonly DEFAULT_CANVAS_HEIGHT: number = 480;

  private m_presenter: CPresenter;
  private m_canvas: ICanvas | undefined;
  private m_html: string;
  private m_canvasWidth: number;
  private m_canvasHeight: number;

  constructor(presenter: CPresenter, width: number | null = null, height: number | null = null) {
    this.m_canvasWidth = width ?? this.DEFAULT_CANVAS_WIDTH;
    this.m_canvasHeight = height ?? this.DEFAULT_CANVAS_HEIGHT;
    this.m_presenter = presenter;
    // TODO: Вынести формирование HTML в отдельную сущность
    this.m_html = `
    <header>
      <nav class="nav">
        <input type="file" id="file-selector" style="display: none;"/>
        <button id="open-file" title="Ctrl+Alt+O">Open file</button>
        <button id="save-file" title="Ctrl+Alt+S">Save file</button>
        <button id="save-file-as" title="Ctrl+Shift+S">Save as file</button>
      </nav>
      <ul class="shapes-list">
        <li class="shapes-list__item" data-action="add-rectangle">Rectangle</li>
        <li class="shapes-list__item" data-action="add-triangle">Triangle</li>
        <li class="shapes-list__item" data-action="add-ellipse">Ellipse</li>
      </ul>
    </header>
    <main class="canvas-container">
      <svg id="canvas" width="${this.m_canvasWidth}" height="${this.m_canvasHeight}">
      </svg>
    </main>
    `;
  }

  public addListeners(): void {
    document.addEventListener('keydown', (event: KeyboardEvent): void => {
      if (event.code === 'Delete') {
        this.m_presenter.deleteCurrentShape();
      }
      if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)) {
        this.m_presenter.undoLastCommand()
      }
      if (event.code === 'KeyY' && (event.ctrlKey || event.metaKey)) {
        this.m_presenter.redoLastCommand();
      }
      if (event.code === 'KeyO' && (event.ctrlKey || event.metaKey) && event.altKey) {
        document.getElementById("file-selector")?.click();
      }
      if (event.code === 'KeyS' && !event.shiftKey && (event.ctrlKey || event.metaKey) && event.altKey) {
        this.m_presenter.saveStateFile();
      }
      if (event.code === 'KeyS' && event.shiftKey && (event.ctrlKey || event.metaKey)) {
        this.m_presenter.saveStateAsFile();
      }
    });
    document.getElementById('file-selector')?.addEventListener('change', (e: Event) => {
      this.m_presenter.processStateFile(e);
    });
    document.getElementById("file-selector")?.addEventListener("click", function () {
      // Delete the same file error(the same file does not invoke change event, so we should reset file property every time user clicks on input)
      (this as any).value = null;
    });
    document.getElementById("open-file")?.addEventListener("click", () => {
      document.getElementById("file-selector")?.click();
    });
    document.getElementById("save-file")?.addEventListener("click", () => {
      this.m_presenter.saveStateFile();
    });
    document.getElementById("save-file-as")?.addEventListener("click", () => {
      this.m_presenter.saveStateAsFile();
    });
    const addButtons: NodeListOf<Element> = document.querySelectorAll(".shapes-list__item");
    addButtons.forEach((addButton: Element) => {
      const typeOfAction: string | null = addButton.getAttribute("data-action");

      addButton.addEventListener('click', (): void => {
        switch (typeOfAction) {
          case "add-rectangle":
            this.m_presenter.addShape(ShapeType.Rectangle);
            break;
          case "add-triangle":
            this.m_presenter.addShape(ShapeType.Triangle);
            break;
          case "add-ellipse":
            this.m_presenter.addShape(ShapeType.Ellipse);
            break;
          default:
            break;
        }
      });
    });

    const canvasElement: HTMLElement | null = document.getElementById("canvas");
    if (canvasElement) {
      canvasElement.addEventListener("click", (e: MouseEvent) => {
        this.m_presenter.setCurrentShape(null);
      });
      this.m_canvas = new CCanvas(canvasElement, this.m_canvasWidth, this.m_canvasHeight);
    }
  }

  public getHtml(): string {
    return this.m_html;
  }

  public updateView(model: IModel): void {
    const canvas = this.m_canvas;
    const beforeUnloadListener = (event: Event): void => {
      event.preventDefault();
      (event as any).returnValue = '';
    };

    if (model.getState().getShapes().length !== 0) {
      window.addEventListener("beforeunload", beforeUnloadListener);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadListener);
    }

    if (canvas) {
      canvas.clear();
      model.getState().getShapes().forEach((shape: IShape) => {
        shape.draw(canvas, shape === this.m_presenter.getCurrentShape());
      });

      model.getState().getShapes().forEach((shape: IShape) => {
        const shapeElement: ICanvasElement | null | undefined = this.m_canvas?.getShape(shape.getId());

        if (shapeElement) {
          const currentShape: ICanvasElement | null | undefined = this.m_canvas?.getCurrentShape();
          const resizer: ICanvasElement | null | undefined = shapeElement.getResizer();
          const frame: ICanvasElement | null | undefined = shapeElement.getFrame();
          // TODO: Почему currentShape и shapeElement отличаются?

          if (shape.getId() === this.m_presenter.getCurrentShape()?.getId() && currentShape && resizer && frame) {
            const startOffset: CPoint = new CPoint(0, 0);
            const lastOffset: CPoint = new CPoint(0, 0);

            const moveListener = (e: MouseEvent): void => {
              this.m_presenter.changeShapeElementPositionAtView(shapeElement, new CVector(e.offsetX - lastOffset.x, e.offsetY - lastOffset.y));
              lastOffset.x = e.offsetX;
              lastOffset.y = e.offsetY;
            };
            const resizeListener = (e: MouseEvent): void => {
              this.m_presenter.resizeShapeElementAtView(shapeElement, new CVector(e.offsetX - lastOffset.x, e.offsetY - lastOffset.y));
              lastOffset.x = e.offsetX;
              lastOffset.y = e.offsetY;
            };
            const resizeMouseUpListener = (e: MouseEvent): void => {
              this.m_presenter.resizeShape(shape, new CVector(frame.getWidth() - startOffset.x, frame.getHeight() - startOffset.y));
              document.removeEventListener("mousemove", resizeListener);
              document.removeEventListener("mouseup", resizeMouseUpListener);
            };
            const moveMouseUpListener = (): void => {
              this.m_presenter.moveShape(shape, new CVector(shapeElement.getX() - startOffset.x, shapeElement.getY() - startOffset.y));
              document.removeEventListener("mousemove", moveListener);
            };

            currentShape.addEventListener("mousedown", (e: MouseEvent) => {
              startOffset.x = shapeElement.getX();
              startOffset.y = shapeElement.getY();
              lastOffset.x = e.offsetX;
              lastOffset.y = e.offsetY;

              document.addEventListener("mousemove", moveListener);
              currentShape.addEventListener("mouseup", moveMouseUpListener);
            });
            resizer.addEventListener("mousedown", (e: MouseEvent) => {
              startOffset.x = frame.getWidth();
              startOffset.y = frame.getHeight();
              lastOffset.x = e.offsetX;
              lastOffset.y = e.offsetY;

              document.addEventListener("mousemove", resizeListener);
              document.addEventListener("mouseup", resizeMouseUpListener);
            });
          } else {
            shapeElement.addEventListener("click", (e: MouseEvent) => {
              e.stopPropagation();
              this.m_presenter.setCurrentShape(shape);
            });
          }
        }
      });
    }
  }
}