import {levels} from './structure';
import {Timer} from '../util/timer';
import {calculateTotalGameScore} from '../util/calc';
import {statsTemplate} from '../util/stats';

const INITIAL_STATE = Object.freeze({
  gameType: 'one',
  level: 0,
  lives: 3,
  time: 30,
  playerName: '',
  answers: []
});

export default class GameModel {
  constructor(playerName) {
    this.restart();
    this._state.playerName = playerName;
  }

  restart() {
    this._state = Object.assign({}, INITIAL_STATE);
  }

  getCurrentLevel() {
    return levels[this._state.level];
  }

  getCurrentGameType() {
    return levels[this._state.level].type;
  }

  updateLevel(level) {
    this._state.level = level;
  }

  nextLevel() {
    this.updateLevel(this._state.level + 1);
  }

  startTimer() {
    this.timer = new Timer(30);

    return this.timer;
  }

  tick() {
    this._state.time = this.timer.tick();
  }

  getLives() {
    return this._state.lives;
  }

  getTotal() {
    if (!this._state.total) {
      this._state.total = calculateTotalGameScore(this._state.answers, this._state.lives);
    }

    return this._state.total;
  }

  isOver() {
    return this._state.lives <= 0;
  }

  isFinished() {
    return this._state.level === levels.length - 1;
  }

  reduceLives() {
    this._state.lives--;
  }

  saveAnswer(answer) {
    if (!answer) {
      this.reduceLives();
    }

    this._state.answers.push({
      answer,
      time: this._state.time
    });
  }

  getAnswers() {
    return this._state.answers;
  }

  getStatsBar() {
    return statsTemplate(this.getAnswers());
  }
}
