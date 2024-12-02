const fs = require('fs');

function isSafeB(levels) {
  // Helper function to check if a sequence is valid
  const isValid = (sequence) => {
    for (let i = 0; i < sequence.length - 1; i++) {
      const diff = Math.abs(sequence[i] - sequence[i + 1]);
      if (diff < 1 || diff > 3) {
        return false;
      }
    }

    const isIncreasing = sequence.every((val, i, arr) => i === 0 || arr[i - 1] < val);
    const isDecreasing = sequence.every((val, i, arr) => i === 0 || arr[i - 1] > val);

    return isIncreasing || isDecreasing;
  };

  // Check if the original sequence is valid
  if (isValid(levels)) {
    return true;
  }

  // Check all possible sequences by removing one element
  for (let i = 0; i < levels.length; i++) {
    const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
    if (isValid(modifiedLevels)) {
      return true;
    }
  }

  return false;
}

function isSafeA(nums) {
  const sign = nums[1] - nums[0];

  return nums.slice(1).every((_, i) => {
    const diff = nums[i + 1] - nums[i];
    return 1 <= Math.abs(diff) && Math.abs(diff) <= 3 && diff * sign > 0;
  });
}

function day2b(filePath) {
  let count = 0;

  const lines = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
  for (const line of lines) {
    const report = line.split(' ').map(Number);
    if (isSafeB(report)) {
      count++;
    }
  }

  return count;
}

function day2a(filePath) {
  let count = 0;

  const lines = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
  for (const line of lines) {
    const report = line.split(' ').map(Number);
    if (isSafeA(report)) {
      count++;
    }
  }

  return count;
}

function main(filePath) {
  console.log(day2a(filePath));
  console.log(day2b(filePath));
}

// Example usage
// main('./2/input0.txt');
main('./2/input1.txt');
// main('./2/input0.txt');
// main('./2/input.txt');

/*
Input: input0.txt
Output:
part 1: 2
part 2: 4

Input: input1.txt
Output:
part 1: 0 
part 2: 1

Input: input.txt
Output:
part 1: 306
part 2: 366
*/