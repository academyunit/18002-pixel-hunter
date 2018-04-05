/**
 * @todo: переделать, чтобы принимало еще 2 параметра и починить все.
 */
export const checkScore = (answers) => {
  if (answers.length < 10) {
    return -1;
  }

  const ANSWER_FAST = 10;
  const ASNWER_SLOW = 20;

  let totalAnswers = 0;
  let totalScore = 0;
  answers.forEach((answer) => {
    let score = 0;
    if (answer.isAnswered) {
      totalAnswers++;

      score += 100;
      if (answer.responseTime <= ANSWER_FAST) {
        score += 50;
      }
      if (answer.responseTime >= ASNWER_SLOW) {
        score -= 50;
      }
    }
  });

  if (totalAnswers === 10) {
    return 1150;
  }

  return 100;
};