const fs = require('fs');

const puzzleInput = fs.readFileSync('./day4.txt').toString().split('\n');

const elfesPair = puzzleInput.map(line => {
  const decimalOrDash =  /,|-/;
  return line.split(decimalOrDash).map(Number)
});

const numberInRange = (a, b) => {
  const set = new Set();
  let n = a;
  while (n <= b) {
    set.add(n);
    n++; 
  }
  return set;
}

const union = (a, b) => new Set([...a, ...b]);

const superSet = (A, B) => {
  const largestSet = Math.max(...[A.size, B.size]);
  return union(A, B).size === largestSet
}

const completelyCovers = (elfsPair) => {
  const [a, b, c, d] = elfsPair;
  return superSet(numberInRange(a, b), numberInRange(c, d))
}

console.log(elfesPair.filter(completelyCovers).length)


const intersection = (A, B) => new Set(
  Array.from(A).filter(x => B.has(x))
);

const overlapAtAll = (elfsPair) => {
  const [a, b, c, d] = elfsPair;
  return intersection(numberInRange(a, b), numberInRange(c, d)).size >= 1
}

console.log(elfesPair.filter(overlapAtAll).length);
