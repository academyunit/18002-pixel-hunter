import {getElementFromTemplate} from '../../util';

export default class AbstractView {

  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Cannot create an instance from an AbstractView class!`);
    }
  }

  get template() {
    throw new Error(`This method must be overwritten in a child class!`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind(this._element);
    }

    return this._element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {
    // event handlers
  }
}
