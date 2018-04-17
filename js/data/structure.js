// Типы игр
export const GameType = {
  GUESS_ONE: `game-1`,
  GUESS_TWO: `game-2`,
  RIGHT_ONE: `game-3`
};

// Маппер тип игры => заголовок
const gameTypeToGameTitle = {
  [GameType.GUESS_ONE]: `Угадайте для каждого изображения фото или рисунок?`,
  [GameType.GUESS_TWO]: `Угадай, фото или рисунок?`,
  [GameType.RIGHT_ONE]: `Найдите рисунок среди изображений`
};

// Список вопросов к играм
export const QUESTIONS = [
  {
    type: GameType.GUESS_TWO,
    title: gameTypeToGameTitle[GameType.GUESS_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        type: `paint`,
        img: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    type: GameType.GUESS_ONE,
    title: gameTypeToGameTitle[GameType.GUESS_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      }
    ]
  },
  {
    type: GameType.RIGHT_ONE,
    title: gameTypeToGameTitle[GameType.RIGHT_ONE],
    questions: [
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/DKR1HtB.jpg`,
      },
      {
        type: `paint`,
        isSelected: true,
        img: `https://k32.kn3.net/5C7060EC5.jpg`
      },
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  },
  {
    type: GameType.GUESS_TWO,
    title: gameTypeToGameTitle[GameType.GUESS_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        type: `paint`,
        img: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    type: GameType.GUESS_ONE,
    title: gameTypeToGameTitle[GameType.GUESS_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      }
    ]
  },
  {
    type: GameType.RIGHT_ONE,
    title: gameTypeToGameTitle[GameType.RIGHT_ONE],
    questions: [
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/DKR1HtB.jpg`,
      },
      {
        type: `paint`,
        isSelected: true,
        img: `https://k32.kn3.net/5C7060EC5.jpg`
      },
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  },
  {
    type: GameType.GUESS_TWO,
    title: gameTypeToGameTitle[GameType.GUESS_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        type: `paint`,
        img: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    type: GameType.GUESS_TWO,
    title: gameTypeToGameTitle[GameType.GUESS_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        type: `paint`,
        img: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    type: GameType.GUESS_ONE,
    title: gameTypeToGameTitle[GameType.GUESS_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      }
    ]
  },
  {
    type: GameType.RIGHT_ONE,
    title: gameTypeToGameTitle[GameType.RIGHT_ONE],
    questions: [
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/DKR1HtB.jpg`,
      },
      {
        type: `paint`,
        isSelected: true,
        img: `https://k32.kn3.net/5C7060EC5.jpg`
      },
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  }
];
