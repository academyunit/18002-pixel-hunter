const LiveImage = {
  EMPTY: `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`,
  FULL: `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`
};

export default (livesTotal, livesLeft) => `
<div class="game__lives">
  ${new Array(livesTotal - livesLeft)
      .fill(LiveImage.EMPTY)
      .concat(Array(livesLeft).fill(LiveImage.FULL).join(``))}
</div>
`;

