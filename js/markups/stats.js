export default (stats = []) => {
  return `
  <div class="stats">
    <ul class="stats">${stats.map((stat) => `<li class="stats__result stats__result--${stat}"></li>`)}</ul>
  </div>
`;
};

