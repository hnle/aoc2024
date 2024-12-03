const fs = require('fs');

function getData(filePath) {
    let text = '';
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      text = data.trim();
    } catch (err) {
      console.error("Error reading file:", err);
    }
    return text;
}

function part1(filePath) {
    const pattern = /mul\((\d+),(\d+)\)/g;
    const matches = getData(filePath).matchAll(pattern);
    /*
    This block of codes can be rewritten using functional programming style below
    
    let sum = 0;

    for (const match of matches) {
        sum += parseInt(match[1], 10) * parseInt(match[2], 10);
    }
    */
    const sum = [...matches]
        .map(match => parseInt(match[1], 10) * parseInt(match[2], 10))
        .reduce((acc, val) => acc + val, 0);

    console.log(sum);
}

function part2(filePath) {
    const text = getData(filePath);
    const pattern = /(?:mul\((\d+),(\d+)\))|(do\(\)|don't\(\))/g;
    const matches = [...text.matchAll(pattern)]; // Use matchAll for iterable matches
    /*
    This block of codes can be rewrittend using the FP style below:
    let enabled = true;
    let ans = 0;

    for (const match of matches) {
        if (match[3] === undefined && enabled) {
            // Process "mul" matches
            ans += parseInt(match[1], 10) * parseInt(match[2], 10);
        } else {
            // Process "do()" or "don't()" matches
            enabled = match[3] === "do()";
        }
    }
    console.log(ans);
    */
    const result = matches.reduce((acc, match) => {
        if (match[3] === undefined && acc.enabled) {
          // Process "mul" matches
          return {
            enabled: true,
            sum: acc.sum + parseInt(match[1], 10) * parseInt(match[2], 10)
          };
        } else {
          // Process "do()" or "don't()" matches
          return {
            enabled: match[3] === "do()",
            sum: acc.sum
          };
        }
      }, { enabled: true, sum: 0 });
    
      console.log(result.sum);
}

part1('./3/input.txt')
part2('./3/input.txt')