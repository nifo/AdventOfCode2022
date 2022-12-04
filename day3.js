const fs = require('fs');

const puzzleInput = fs.readFileSync('./day3.txt').toString().split('\n');


const splitInHalf = (array) => {
  const midpoint = array.length / 2
  return [array.slice(0, midpoint), array.slice(midpoint, array.length)]
}

const findCommonElement = (array1, array2) => {
  for (const element of array1) {
    if (array2.includes(element)) return element
  }
}

const ruckSacks = (compartment) => {
  // Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments.
  return findCommonElement(...splitInHalf(compartment)) 
}

const priority = (item) => {
  // Lowercase item types a through z have priorities 1 through 26.
  // Uppercase item types A through Z have priorities 27 through 52.
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'.indexOf(item);
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(item);
  if (lowercase >= 0) return lowercase + 1;
  if (uppercase >= 0) return uppercase + 27;
}
const priorites = puzzleInput.map(ruckSacks).map(priority);

const sum = (acc, curr) => acc + curr;
console.log(priorites.reduce(sum, 0));



const groupOf = (size, array) => {
  if (array.length === 0) return [];
  return [array.splice(0, size)].concat(groupOf(size, array));
}

const common = (array1, array2, array3) => {
  for (const e1 of array1) {
    for (const e2 of array2) {
      for (const e3 of array3) {
        if (e1 === e2 && e2 === e3 && e1 === e3) {
          return e1
        }
      }
    }
  }
}

const prioritesOfGroup3 = groupOf(3, puzzleInput)
  .map(group3 => common(...group3))
  .map(priority)
  .reduce(sum)

console.log(prioritesOfGroup3);

