const fs = require('fs');

const [dataStacks, dataInstructions] = fs.readFileSync('./day5.txt').toString().split('\n\n');

const instructions = dataInstructions
  .split('\n')
  .map(instructions => {
    const [amout, fromStack, toStack] = instructions.match(/\d+/g).map(Number);
    return [amout, fromStack, toStack];
  });

const groupString = (string, n) => {
  const [group, rest] = [string.substring(0, n), string.substring(n)];
  if (!group) return [];
  return [group].concat(groupString(rest, n));
}

const extractValue = (column) => column.match(/[A-Z]/g)?.[0]

const transpose = (prev, next) => next.map((_item, i) => (prev[i] || []).concat(next[i]));

const stacks = dataStacks
  .split('\n')
  .map(line => {
    const columns = groupString(line, 4);
    return columns.map(extractValue);
  })
  .reduce(transpose, [])
  .map(column => {
    column.reverse();
    return column.filter(Boolean);
  })

const execute = (amount, fromStack, toStack) => {
  if (amount === 0) return
  stacks[toStack - 1].push(stacks[fromStack - 1].pop());
  execute(amount - 1, fromStack, toStack);
}

const execute_crate_mover_9001 = (amount, fromStack, toStack) => {
  const crates = stacks[fromStack - 1].splice(stacks[fromStack - 1].length - amount, amount)
  stacks[toStack - 1].push(...crates);
}

// instructions.forEach((instruction) => execute(...instruction));
instructions.forEach((instruction) => execute_crate_mover_9001(...instruction));

const topStacks = stacks
  .map(stack => stack[stack.length - 1])
  .reduce((acc, curr) => acc + curr, '');
console.log(topStacks);
