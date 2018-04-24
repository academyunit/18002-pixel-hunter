import {changeView} from '../../util';
import {QUESTIONS} from '../../data/structure';
import renderIntro from '../intro/index';
import renderGreeting from '../greeting/index';
import renderRules from '../rules/index';
import renderGameOne from '../gameOne/index';
import renderGameTwo from '../gameTwo/index';
import renderGameThree from '../gameThree/index';
import renderScoreboard from '../scoreBoard/index';

// тут оставить эту переменную? где бы она лучше всего смотрелась?)
let game;

class Game {
  constructor() {
    this._setDefaultState();
  }

  _setDefaultState() {
    this.task = null;
    this.tasks = [...QUESTIONS];
    this.type = `intro`;
    this.gameNumber = null;
    this.answers = [];
    this.lives = 3;
    this.timer = 30;
    this.playerName = ``;
  }

  isOver() {
    return this.getLives() < 1 || !this.tasks.length;
  }

  getLevel() {
    return {
      type: this.type,
      gameNumber: this.gameNumber,
      task: this.task
    };
  }

  setLevel({type, task, gameNumber = 0}) {
    if (type) {
      this.type = type;
    }
    if (task) {
      this.task = task;
    }
    if (gameNumber) {
      this.gameNumber = gameNumber;
    }
  }

  addAnswer(isCorrect) {
    this.answers.push({
      isCorrect,
      time: this.timer
    });

    if (!isCorrect) {
      this.lives--;
    }
  }

  addPlayerName(name) {
    this.playerName = name;
  }

  changeLevel() {
    if (this.isOver()) {
      this.setLevel({
        type: `scoreboard`
      });

      return this.getLevel();
    }

    const newScreenType = this.getNextScreenType();
    let newTask;
    let newGameNumber = 0;

    if (newScreenType === `game`) {
      newTask = this.tasks.pop();
      newGameNumber = newTask.type;
    }

    this.setLevel({
      type: newScreenType,
      task: newTask,
      gameNumber: newGameNumber
    });

    return this.getLevel();
  }

  getNextScreenType() {
    switch (this.type) {
      case `intro`:
        return `greeting`;
      case `greeting`:
        return `rules`;
      case `rules`:
        return `game`;
      case `game`:
        return `game`;
    }

    return ``;
  }

  getLives() {
    return this.lives;
  }

  resetTimer() {
    this.timer = 0;
  }

  reset() {
    this._setDefaultState();
  }
}

// это ок что эта функция тут лежит?
export const renderScreen = (handler) => {
  if (handler === `back`) {
    game.reset();
    changeView(renderIntro(game));
    return;
  }

  let gameScreen;
  const {type, gameNumber} = game.getLevel();

  switch (type) {
    case `intro`:
      gameScreen = renderIntro(game);
      break;
    case `greeting`:
      gameScreen = renderGreeting(game);
      break;
    case `rules`:
      gameScreen = renderRules(game);
      break;
    case `game`:
      if (gameNumber === `game-1`) {
        gameScreen = renderGameOne(game);
      }
      if (gameNumber === `game-2`) {
        gameScreen = renderGameTwo(game);
      }
      if (gameNumber === `game-3`) {
        gameScreen = renderGameThree(game);
      }
      break;
    case `scoreboard`:
      gameScreen = renderScoreboard(game);
      break;
  }

  changeView(gameScreen);
};

/**
 * и нуждаемся ли мы в этой функции ? может просто вызывать создавать игру и потом рендерить экран?
 * или с ней красивее выглядит? )
 *
 * @return {Object}
 */
export const initGame = () => {
  game = new Game();

  renderScreen(game);

  return game;
};
