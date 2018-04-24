/**
 * Как все должно работать?
 *
 * 1) main.js - входная точка
 * 2) запуск into экрана, прокликивание greeting, rules
 * 3) rules запускает компонент game
 * 4) game делает следующее:
 *  - динамически отрисовывает экраны под 3 вида игры (1 фото, 2 фото или выбрать из 3 фото)
 *  - контроллирует текущий state игры
 *  - отрисовывает компонент scoreBoard (в случае победы / выйгрыша)
 */

import {changeView} from './util';
import {initGame} from './components/game/index';
import screenIntro from './components/intro/index';
import {renderScreen} from './components/game/index';

document.addEventListener(`DOMContentLoaded`, () => {
  initGame();

  // Обработчик кнопки "Назад"
  document.addEventListener(`click`, (e) => {
    const goBackButton = e.target.closest(`.back`);

    if (!goBackButton) {
      return;
    }

    renderScreen('back');
  });
});
