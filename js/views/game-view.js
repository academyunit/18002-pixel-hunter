import AbstractView from '../views/abstract-view';

/**
 * @deprecated
 * @todo: удалить
 *
 * Сделал одну parent View для всех Game экранов, чтобы автоматом вызывать конструктор с параметрами,
 * но в JS так оно не работает.
 * Дочерние классы требуют родительский констуктор вызывать в любом случае (а в php можно не вызывать :) )
 */
export default class GameView extends AbstractView {

  constructor(game, statsBar) {
    this.game = game;
    this.statsBar = statsBar;
  }

  onAnswer() {}
}