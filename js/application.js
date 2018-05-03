import HeaderView from './views/header-view';
import FooterView from './views/footer-view';
import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import StatsView from './views/stats-view';
import GameModel from './data/game-model'
import GameScreen from './game-screen';
import prepareResources from './util/resources';

/** Сцена на которой рендерятся View. */
const stage = document.querySelector(`.central`);
const footer = new FooterView().element;

/**
 * Изменить View.
 *
 * @param {Node} view
 * @param {Node} header
 */
export const changeView = (view, header = null) => {
  stage.innerHTML = ``;
  stage.nextSibling.remove();
  stage.appendChild(view);
  if (header) {
    stage.insertAdjacentElement(`afterBegin`, header);
  }
  stage.insertAdjacentElement(`afterEnd`, footer);
};


export default class Application {
  static showIntro() {
    if (Application.gameModel) {
      Application.gameModel.restart(); // чтобы рестартить игру после возврата на IntroView
    }
    Application.loadData();

    const introView = new IntroView();

    changeView(introView.element);
  }

  static showGreeting() {
    const greetingView = new GreetingView();

    changeView(greetingView.element);
  }

  static showRules() {
    const header = new HeaderView();
    const rules = new RulesView();

    changeView(rules.element, header.element);
  }

  static showGame(playerName) {
    Application.gameModel = new GameModel(playerName, Application.data);
    const gameScreen = new GameScreen(Application.gameModel);

    changeView(gameScreen.element);

    gameScreen.startGame();
  }

  static showResults(total, answers, lives, statsBar, isLoose = false) {
    const statsView = new StatsView(total, answers, lives, statsBar, isLoose);
    const header = new HeaderView();

    changeView(statsView.element, header.element);
  }

  static loadData() {
    if (!Application.data.length) {
      prepareResources((data) => {
        Application.data = data;
      });
    }
  }
}
Application.data = [];