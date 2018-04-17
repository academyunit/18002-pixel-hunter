const MAX_LIVES = 3; // временно тут, потом надо перенести к остальным константам

const getTimer = (time) => {
  return `<h1 class="game__timer">${time}</h1>`;
};

const getLives = (lives) => {
  const LiveImage = {
    EMPTY: `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`,
    FULL: `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`
  };

  return `
<div class="game__lives">
  ${new Array(MAX_LIVES - lives)
      .fill(LiveImage.EMPTY)
      .concat(Array(lives).fill(LiveImage.FULL).join(``))}
</div>
`;
};

export default ({time = ``, lives}) => {
  const timerBlock = time ? getTimer(time) : ``;
  const livesBlcok = lives ? getLives(lives) : ``;

  return `
<div class="header__back">
  <button class="back">
    <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
    <img src="img/logo_small.svg" width="101" height="44">
  </button>
</div>
${timerBlock}
${livesBlcok}
`;
};

