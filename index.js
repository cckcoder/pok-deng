const inquirer = require("inquirer");

let questions_1 = [
  {
    type: "input",
    name: "bet",
    message: "Please put your bet\n",
  },
];

let questions_2 = [
  {
    type: "input",
    name: "play",
    message: "Wanna play more (Yes/No)",
  },
];

let deck = [
  // Hearts
  { "Hearts-Ace": 1 },
  { "Hearts-2": 2 },
  { "Hearts-3": 3 },
  { "Hearts-4": 4 },
  { "Hearts-5": 5 },
  { "Hearts-6": 6 },
  { "Hearts-7": 7 },
  { "Hearts-8": 8 },
  { "Hearts-9": 9 },
  { "Hearts-10": 0 },
  { "Hearts-King": 0 },
  { "Hearts-Queen": 0 },
  { "Hearts-Jack": 0 },
  // Spades
  { "Spades-Ace": 1 },
  { "Spades-2": 2 },
  { "Spades-3": 3 },
  { "Spades-4": 4 },
  { "Spades-5": 5 },
  { "Spades-6": 6 },
  { "Spades-7": 7 },
  { "Spades-8": 8 },
  { "Spades-9": 9 },
  { "Spades-10": 0 },
  { "Spades-King": 0 },
  { "Spades-Queen": 0 },
  { "Spades-Jack": 0 },
  // Clubs
  { "Clubs-Ace": 1 },
  { "Clubs-2": 2 },
  { "Clubs-3": 3 },
  { "Clubs-4": 4 },
  { "Clubs-5": 5 },
  { "Clubs-6": 6 },
  { "Clubs-7": 7 },
  { "Clubs-8": 8 },
  { "Clubs-9": 9 },
  { "Clubs-10": 0 },
  { "Clubs-King": 0 },
  { "Clubs-Queen": 0 },
  { "Club-Jack": 0 },
  // Clubs
  // Diamonds
  { "Diamonds-Ace": 1 },
  { "Diamonds-2": 2 },
  { "Diamonds-3": 3 },
  { "Diamonds-4": 4 },
  { "Diamonds-5": 5 },
  { "Diamonds-6": 6 },
  { "Diamonds-7": 7 },
  { "Diamonds-8": 8 },
  { "Diamonds-9": 9 },
  { "Diamonds-10": 0 },
  { "Diamond-King": 0 },
  { "Diamond-Queen": 0 },
  { "Diamond-Jack": 0 },
];

function shuffleDeck(deck) {
  const values = Object.values(deck);
  const prop = values[Math.floor(Math.random() * values.length)];
  return prop;
}

const getCardName = (cardObj) => Object.keys(cardObj)[0];
const getCardScore = (cardObj) => Object.values(cardObj)[0];
const getFinalScore = (score) => (score >= 10 ? score - 10 : score);

let bet = "";
let chips = 0;
let msg = "";
let continuePlay = true


inquirer.prompt(questions_1).then((answers) => {
  while (continuePlay) {
    continuePlay = false
    bet += parseInt(answers["bet"]);
    playCard1 = shuffleDeck(deck);
    playCard2 = shuffleDeck(deck);
    playerScore = getCardScore(playCard1) + getCardScore(playCard2);
    playerScore = getFinalScore(playerScore);
    console.log(`You got ${getCardName(playCard1)}, ${getCardName(playCard2)}`);

    dealerCard1 = shuffleDeck(deck);
    dealerCard2 = shuffleDeck(deck);
    dealerScore = getCardScore(dealerCard1) + getCardScore(dealerCard2);
    dealerScore = getFinalScore(dealerScore);
    console.log(
      `The dealer ${getCardName(dealerCard1)}, ${getCardName(dealerCard2)}`
    );

    if (playerScore == dealerScore) {
      msg = "The Play tie with the dealer, you get nothing";
    } else if (playerScore < dealerScore) {
      msg = "You lose the bet";
    } else {
      chips += parseInt(bet);
      msg = `You won!!!, receive ${chips} chips`;
    }
    console.log(msg);

    inquirer.prompt([
      {
        type: "input",
        name: "continue",
        message: "Wanna play more (Yes/No)\n",
      }
    ]).then((answers) => {
      let ans = answers['continue'].toLowerCase()
      if (ans == 'no') {
        msg = `You got total ${chips} chips`
        console.log(msg)
      } else {
        continuePlay = true
      }

    })

  }
});
