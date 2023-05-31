import { CPresenter } from "./presenter";

const presenter: CPresenter = new CPresenter();
document.body.innerHTML += presenter.getView().getHtml();
presenter.init();