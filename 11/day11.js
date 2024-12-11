const fs = require('fs');

function main(filePath) {
  const data = fs.readFileSync(filePath, "utf8").split("\n");
  const counter = {};
  for (v of data[0].split(' ')) { // the last line is an empty line 
    counter[v] = (counter[v] || 0) + 1;
  }

  function countStones(counter, blinks) {
    const clone = {...counter};
    for (let _ = 0; _ < blinks; _++) {
      for (const [key, v] of Object.entries(clone)) {
        const k = Number(key);  // since key is of type string, convert to number
        if (k === 0) {
          clone[1] = (clone[1] || 0) + v;
        } else {
          if (key.length % 2 === 0) {
            const mid = Math.floor(key.length / 2);
            const h1 = Number(key.substring(0, mid));
            const h2 = Number(key.substring(mid, key.length));
            clone[h1] = (clone[h1] || 0) + v;
            clone[h2] = (clone[h2] || 0) + v;
          } else {
            clone[k * 2024] = (clone[k * 2024] || 0) + v;
          }
        }
        clone[key] -= v;
      }
    }
    const ans = Object.values(clone).reduce((acc, v) => acc + v, 0);
    console.log(ans);
  }

  countStones(counter, 25);
  countStones(counter, 75);
}

// main('./11/input0.txt')
main('./11/input.txt')
