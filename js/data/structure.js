// Типы игр
export const TaskType = {
  GAME_ONE: `game-1`,
  GAME_TWO: `game-2`,
  GAME_THREE: `game-3`
};

// Маппер тип игры => заголовок
const TaskTypeToGameTitle = {
  [TaskType.GAME_ONE]: `Угадайте для каждого изображения фото или рисунок?`,
  [TaskType.GAME_TWO]: `Угадай, фото или рисунок?`,
  [TaskType.GAME_THREE]: `Найдите рисунок среди изображений`
};

// Список вопросов к играм
export const QUESTIONS = [
  {
    type: TaskType.GAME_TWO,
    title: TaskTypeToGameTitle[TaskType.GAME_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  },
  {
    type: TaskType.GAME_ONE,
    title: TaskTypeToGameTitle[TaskType.GAME_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      },
      {
        type: `paint`,
        img: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    type: TaskType.GAME_THREE,
    title: TaskTypeToGameTitle[TaskType.GAME_THREE],
    questions: [
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/DKR1HtB.jpg`,
      },
      {
        type: `paint`,
        isSelected: true,
        img: `https://i.pinimg.com/originals/8b/d6/ee/8bd6ee60bc31fa336bf22c0fb25dbc6c.png`
      },
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  },
  {
    type: TaskType.GAME_TWO,
    title: TaskTypeToGameTitle[TaskType.GAME_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  },
  {
    type: TaskType.GAME_ONE,
    title: TaskTypeToGameTitle[TaskType.GAME_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      },
      {
        type: `paint`,
        img: `https://i2-prod.mirror.co.uk/incoming/article5091932.ece/ALTERNATES/s615b/Tjalf-Sparnaay3.jpg`
      }
    ]
  },
  {
    type: TaskType.GAME_THREE,
    title: TaskTypeToGameTitle[TaskType.GAME_THREE],
    questions: [
      {
        type: `photo`,
        isSelected: false,
        img: `http://web.uvic.ca/~torir/artforbeginners/media/victorrodriguez.jpg`,
      },
      {
        type: `paint`,
        isSelected: true,
        img: `https://i.pinimg.com/originals/6f/d9/75/6fd97555bbaf2ba3001a38f95d6595f2.jpg`
      },
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  },
  {
    type: TaskType.GAME_TWO,
    title: TaskTypeToGameTitle[TaskType.GAME_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://vistanews.ru/uploads/posts/2017-01/1484213166_video-hitman-igry-2187627.jpeg`,
      }
    ]
  },
  {
    type: TaskType.GAME_TWO,
    title: TaskTypeToGameTitle[TaskType.GAME_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  },
  {
    type: TaskType.GAME_ONE,
    title: TaskTypeToGameTitle[TaskType.GAME_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      },
      {
        type: `paint`,
        img: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    type: TaskType.GAME_THREE,
    title: TaskTypeToGameTitle[TaskType.GAME_THREE],
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
