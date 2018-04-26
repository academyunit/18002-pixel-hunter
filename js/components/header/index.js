import {Life} from '../../data/game-config';

const drawHeart = (full) => {
  return `<img src='img/heart__${full ? `full` : `empty`}.svg' class='game__heart' alt='Life' width='32' height='32'>`;
};

const renderContentWithData = ({timer, lives}) => {
  return `<h1 class='game__timer'>${timer}</h1>
          <div class='game__lives'>
            ${new Array(Life.count - lives).fill(drawHeart(false)).join(``)}
            ${new Array(lives).fill(drawHeart(true)).join(``)}
          </div>`;
};

export default (game) => {
  return `<header class='header'>
            <div class='header__back'>
              <button class='back'>
                <img src='img/arrow_left.svg' width='45' height='45' alt='Back'>
                <img src='img/logo_small.svg' width='101' height='44'>
              </button>
            </div>
            ${game ? renderContentWithData(game) : ``}
          </header>`;
};
