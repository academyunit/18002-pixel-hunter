import {initGame} from './components/game/index';
import {renderScreen} from './components/game/index';

document.addEventListener(`DOMContentLoaded`, () => {
  initGame();

  // Обработчик кнопки "Назад"
  document.addEventListener(`click`, (e) => {
    const goBackButton = e.target.closest(`.back`);

    if (!goBackButton) {
      return;
    }

    renderScreen(`back`);
  });
});
