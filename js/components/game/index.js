import {changeView, updateView, getElementFromTemplate} from '../../util';
import HeaderView from '../header/index';
import FooterView from '../footer/index';
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

const gameContainer = getElementFromTemplate();

const headerContainer = getElementFromTemplate();
const footerContainer = new FooterView().element;
const gameScreenContainer = getElementFromTemplate();

// собираем наш игровой экран
gameContainer.appendChild(headerContainer);
gameContainer.appendChild(gameScreenContainer);
gameContainer.appendChild(footerContainer);

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
  let header = getElementFromTemplate(); // hack
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
      header = new HeaderView(game).element;

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
      header = new HeaderView(game).element;
      gameScreen = renderScoreboard(game);
      break;
  }
  // Обновляем хедер
  updateView(headerContainer, header);
  // Сам игровой экран
  updateView(gameScreenContainer, gameScreen);

  // Рендерим нашу вьюху из собранных частей
  changeView(gameContainer);
};

export const initGame = () => {
  game = new Game();

  window.game = game;

  renderScreen(game);
};
