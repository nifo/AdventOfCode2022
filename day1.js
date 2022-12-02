const fs = require('fs');

const puzzleInput = fs.readFileSync('./day1.txt').toString();

const elfes = puzzleInput
  .split('\n\n')
  .map(e => e.split('\n').map(Number));

const sum = (array) => {
  return array.reduce((acc, curr) => acc + curr, 0);
}

const max = (array) => {
  return Math.max(...array);
}

const fmap = (array, f) => {
  return array.map(f)
}

const elfsCarrying = fmap(elfes, elf => sum(elf));
console.log(max(elfsCarrying));

elfsCarrying.sort((a, b) => b - a);
console.log(sum(elfsCarrying.slice(0, 3)));

