const fs = require('fs');

function getLists(filePath) {
  const l1 = [];
  const l2 = [];
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');

  for (const line of lines) {
    if (line.trim() === '') continue;
    const [n1, n2] = line.split(/\s+/).map(Number);
    l1.push(n1);
    l2.push(n2);
  }
  return [l1, l2];
}

function day1a(l1, l2) {
  l1.sort((a, b) => a - b);
  l2.sort((a, b) => a - b);
  return l1.reduce((acc, e1, i) => acc + Math.abs(e1 - l2[i]), 0);
}

function day1b(l1, l2) {
  const hist2 = l2.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  return l1.reduce((acc, e) => acc + (hist2[e] || 0) * e, 0);
}

function main(filePath) {
  const [l1, l2] = getLists(filePath);
  console.log(day1a(l1, l2));
  console.log(day1b(l1, l2));
}

// Example usage
// main('./1/input0.txt');
// main('./1/input0.txt');
main('./1/input.txt');

/*
Input: input0.txt
Output: 
part1: 11
part2: 31

Inpput: input.txt
Output: 
part1: 2344935
part2: 27647262
*/