// let storeExample = {
//   secretNumber: '123',
//   gameOver: false,
//   resultList: [{
//     id: 21312221,
//     number: '126',
//     strikes: 2,
//     balls: 0
//   }, {
//     id: 43543543,
//     number: '896',
//     strikes: 0,
//     balls: 0
//   }]
// };

export const guessNumber = number => {
  return {
    type: 'GUESS_NUMBER',
    number
  };
}