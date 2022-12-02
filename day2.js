const fs = require('fs');

const puzzleInput = fs.readFileSync('./day2.txt').toString().split('\n');

const letters = puzzleInput.map(line => line.split(' '));

const strategyOneStar = (LetterYou, LetterOpponent) => {
  const mapping = {
    A: 'Rock', B: 'Paper', C: 'Scissor',
    X: 'Rock', Y: 'Paper', Z: 'Scissor',
  }
  const you = mapping[LetterYou]
  const opponent = mapping[LetterOpponent]
  return [you, opponent]
}

const strategyTwoStar = (LetterOpponent, LetterYou) => {
  const [opponent, ] = strategyOneStar(LetterOpponent)
  const wins = { 'Rock': 'Paper', 'Paper': 'Scissor', 'Scissor': 'Rock' };
  const loses = { 'Rock': 'Scissor', 'Paper': 'Rock', 'Scissor': 'Paper' };

  let you;
  if (LetterYou === 'X') { you = loses[opponent]; }
  if (LetterYou === 'Y') { you = opponent; }
  if (LetterYou === 'Z') { you = wins[opponent]; }
  return [opponent, you]
}

const shapeScore = (you) => {
  return [, 'Rock', 'Paper', 'Scissor'].indexOf(you);
}

const outcomeScore = (opponent, you) => {
  if (you === 'Rock') {
    if (opponent === 'Scissor') return 6
    if (opponent === 'Rock') return 3
    if (opponent === 'Paper') return 0
  }
  if (you === 'Paper') {
    if (opponent === 'Rock') return 6
    if (opponent === 'Paper') return 3
    if (opponent === 'Scissor') return 0
  }
  if (you === 'Scissor') {
    if (opponent === 'Paper') return 6
    if (opponent === 'Scissor') return 3
    if (opponent === 'Rock') return 0
  }
}

const score = (opponent, you) => {
  return outcomeScore(opponent, you) + shapeScore(you)
}

const play = (strategy) => {
  return (letters) => {
    const [opponent, you] = strategy(...letters);
    return score(opponent, you);
  }
}

const sum = (array) => {
  return array.reduce((acc, curr) => acc + curr, 0);
}

const fmap = (array, f) => {
  return array.map(f)
}

const totalScores = sum(fmap(letters, play(strategyOneStar)))
const totalScores2 = sum(fmap(letters, play(strategyTwoStar)))

console.log(totalScores);
console.log(totalScores2);
