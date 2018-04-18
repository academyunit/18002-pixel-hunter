// Типы игр
export const TaskType = {
  GUESS_ONE: `game-1`,
  GUESS_TWO: `game-2`,
  FIND: `game-3`
};

// Маппер тип игры => заголовок
const TaskTypeToGameTitle = {
  [TaskType.GUESS_ONE]: `Угадайте для каждого изображения фото или рисунок?`,
  [TaskType.GUESS_TWO]: `Угадай, фото или рисунок?`,
  [TaskType.FIND]: `Найдите рисунок среди изображений`
};

// Список вопросов к играм
export const QUESTIONS = [
  {
    type: TaskType.GUESS_TWO,
    title: TaskTypeToGameTitle[TaskType.GUESS_TWO],
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
    type: TaskType.GUESS_ONE,
    title: TaskTypeToGameTitle[TaskType.GUESS_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      }
    ]
  },
  {
    type: TaskType.FIND,
    title: TaskTypeToGameTitle[TaskType.FIND],
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
    type: TaskType.GUESS_TWO,
    title: TaskTypeToGameTitle[TaskType.GUESS_TWO],
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
    type: TaskType.GUESS_ONE,
    title: TaskTypeToGameTitle[TaskType.GUESS_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      }
    ]
  },
  {
    type: TaskType.FIND,
    title: TaskTypeToGameTitle[TaskType.FIND],
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
    type: TaskType.GUESS_TWO,
    title: TaskTypeToGameTitle[TaskType.GUESS_TWO],
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
    type: TaskType.GUESS_TWO,
    title: TaskTypeToGameTitle[TaskType.GUESS_TWO],
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
    type: TaskType.GUESS_ONE,
    title: TaskTypeToGameTitle[TaskType.GUESS_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      }
    ]
  },
  {
    type: TaskType.FIND,
    title: TaskTypeToGameTitle[TaskType.FIND],
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
