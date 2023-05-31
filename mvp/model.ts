import { CFrame } from './Frame/CFrame';
import { CHistory } from './History/CHistory';
import { IHistory } from './History/IHistory';
import { IObservable } from './Observable/IObservable';
import { IObserver } from './Observer/IObserver';
import { IShape } from './Shape/IShape';
import { CState } from './State/CState';
import { IState } from './State/IState';
import { ShapeUtil } from './utils/ShapeUtil';

export class CModel implements IObservable{
    private m_currentShape: IShape | null;
    private m_state: IState; // TODO: Убрать m_state -> m_shapes
    private m_history: IHistory;
    private m_observers: IObserver[];

    constructor() {
        this.m_history = new CHistory();
        this.m_state = new CState();
        this.m_currentShape = null;
        this.m_observers = [];
    }

    public addShape(shape: IShape): void {
        this.m_state.getShapes().push(shape);

        this.notifyObservers();
    }

    public clearHistory(): void {
        this.m_history = new CHistory();
    }

    public deleteShape(shape: IShape): void {
        const shapes: IShape[] = this.m_state.getShapes();

        const index = shapes.indexOf(shape);
        if (index > -1) {
            shapes.splice(index, 1);
        }

        this.notifyObservers();
    }

    public changeShapeFrame(shape: IShape, frame: CFrame): void {
        frame.width = Math.max(frame.width, ShapeUtil.MIN_FRAME_SIZE);
        frame.height = Math.max(frame.height, ShapeUtil.MIN_FRAME_SIZE);

        shape.setFrame(frame);

        this.notifyObservers();
    }

    public canUndo(): boolean {
        return this.getHistory().canUndo();
    }

    public canRedo(): boolean {
        return this.getHistory().canRedo();
    }

    public undo(): void {
        this.getHistory().undo();
    }

    public redo(): void {
        this.getHistory().redo();
    }

    public setCurrentShape(shape: IShape | null): void {
        this.m_currentShape = shape;

        this.notifyObservers();
    }

    public getCurrentShape(): IShape | null {
        return this.m_currentShape;
    }

    public getState(): IState {
        return this.m_state;
    }

    public setState(state: IState): void {
        this.m_state = state;

        this.notifyObservers();
    }

    public getHistory(): IHistory {
        return this.m_history;
    }

    public setHistory(history: IHistory): void {
        this.m_history = history;

        this.notifyObservers();
    }

    public registerObserver(o: IObserver): void {
        this.m_observers.push(o);
    }

    public removeObserver(o: IObserver): void {
        const indexOfRemovedObserver = this.m_observers.indexOf(o);

        if (indexOfRemovedObserver !== -1) {
            this.m_observers.splice(indexOfRemovedObserver, 1);
        }
    }

    public notifyObservers(): void {
        this.m_observers.forEach((o: IObserver) => {
            o.update();
        });
    }
}