/**
 * Генерация DOM-элементов на основе переданной строки.
 *
 * @param {String} template
 * @param {String} tagName
 * @return {Node}
 */
export const getElementFromTemplate = (template = ``, tagName = `div`) => {
  const container = document.createElement(tagName);
  container.innerHTML = template.trim();

  return container;
};

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
