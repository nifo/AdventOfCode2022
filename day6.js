const fs = require('fs');

const puzzleInput = fs.readFileSync('./day6.txt').toString();


const allDifferent = (...values) => {
  const set = new Set(values)
  return set.size === values.length;
}

const detectStartOfPacket = (stream) => {
  let i = 3
  while (true) {
    if (allDifferent(stream[i], stream[i - 1], stream[i - 2], stream[i - 3])) return i + 1
    i++;
  }
};

const detectStartOfPacket2 = (stream) => {
  let i = 0
  while (true) {
    if (allDifferent(...stream.substring(i, i + 14))) return i + 14
    i++;
  }
};

console.log(detectStartOfPacket('bvwbjplbgvbhsrlpgdmjqwftvncz')); // 5
console.log(detectStartOfPacket('nppdvjthqldpwncqszvftbrmjlhg')); // 6
console.log(detectStartOfPacket('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')); // 10
console.log(detectStartOfPacket('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')); // 11
console.log(detectStartOfPacket(puzzleInput));

console.log(detectStartOfPacket2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')); // 19
console.log(detectStartOfPacket2('bvwbjplbgvbhsrlpgdmjqwftvncz')); // 23
console.log(detectStartOfPacket2('nppdvjthqldpwncqszvftbrmjlhg')); // 23
console.log(detectStartOfPacket2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')); // 29
console.log(detectStartOfPacket2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')); // 26
console.log(detectStartOfPacket2(puzzleInput));