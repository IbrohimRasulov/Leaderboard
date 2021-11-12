import myGame from './Game.js';

const scoreList = document.querySelector('.score-list');
const inputName = document.querySelector('.input-name');
const inputScore = document.querySelector('.input-score');

const compareScores = (a, b) => {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
};

const padScore = (score) => {
  let scoreNum = parseInt(score, 10);
  if (scoreNum && scoreNum > 0) {
    scoreNum = scoreNum.toString().substring(0, 6);
  } else {
    scoreNum = 0;
  }
  return scoreNum.toString().padStart(6, 0);
};

const trimUsername = (user) => {
  let userStr = user;
  if (userStr.length > 12) {
    userStr = userStr.substring(0, 12);
  }
  return userStr;
};

const renderList = () => {
  scoreList.innerHTML = '';
  myGame.getScores()
    .then((scores) => {
      const scoresArr = scores.result;
      scoresArr.sort(compareScores);
      scoresArr.forEach((score, index) => {
        scoreList.innerHTML += `
          <li class="score-item${index % 2 === 0 ? ' item-shade' : ''}">
            <span class="item-user">${trimUsername(score.user)}</span>
            <span class="item-score">${padScore(score.score)}</span>
          </li>
        `;
      });
    });
};

const postHandler = () => {
  if (inputName.value === '' || inputScore.value === '') {
    return;
  }

  myGame.postScore(inputName.value, inputScore.value)
    .then(() => {
      myGame.getScores()
        .then((scores) => {
          renderList(scores.result);
        });
    });
  inputName.value = '';
  inputScore.value = '';
};

export { renderList, postHandler };