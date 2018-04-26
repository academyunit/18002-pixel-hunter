import {getElementFromTemplate} from '../../util';
import getFooter from '../footer/index';

export default class AbstractView {
  // Игру будем через конструктор передавать во вьюху?)
  constructor(game) {
    this.game = game;
  }

  get template() {
    throw new Error('This method must be overwritten in a child class!');
  }

  /**
   * Или я не так понял задание или это они так странно решили сделать.
   * На мой взгляд, гораздо логичнее дергать render() при отдаче готового контента, чем element.
   *
   * new View().render() вместо new View().element
   *
   * Что думаешь?
   */
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }

    return this._element;
  }

  render() {
    const template = `
    ${this.template}
    ${getFooter()}
    `;
    return getElementFromTemplate(template);
  }

  bind() {
    // event handlers
  }
}