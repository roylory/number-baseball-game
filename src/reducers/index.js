import { combineReducers } from 'redux'

const generateRandomNumber = () => {
  const DIGIT_CNT = 3;
  let randomNumArray = new Array(DIGIT_CNT);

  randomNumArray[0] = Math.floor(Math.random() * 9 + 1);
  for (let i = 1; i < DIGIT_CNT; i++) {
    randomNumArray[i] = Math.floor(Math.random() * 9 + 1);
    for (let j = 0; j < i; j++) { // check dupes
      if (randomNumArray[i] === randomNumArray[j]) {
        i--;
        break;
      }
    }
  }

  return randomNumArray.join('');
}

const calcBallCount = (secretNumber, numStr) => {
  // count strikes
  let strikes = 0;
  for (let i = 0; i < 3; i++) {
    if (secretNumber[i] === numStr[i])
      strikes++;
  }

  // count balls
  let balls = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i !== j && secretNumber[i] === numStr[j])
        balls++;
    }
  }

  return { strikes, balls };
}

const initialState = {
  secretNumber: generateRandomNumber(),
  gameOver: false,
  resultList: []
}

const AppReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GUESS_NUMBER':
      let ballCount = calcBallCount(state.secretNumber, action.number);
      return Object.assign({}, state, {
        gameOver: ballCount.strikes === 3,
        resultList: [
          ...state.resultList,
          {
            id: Date.now(), // is this okay to use in reducer?
            number: action.number,
            strikes: ballCount.strikes,
            balls: ballCount.balls
          }
        ]
      })
    default:
      return state;
  }
};

export default AppReducer;