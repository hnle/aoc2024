const fs = require('fs');

function antinodeCount(antenas, rows, cols, start, n) {
  antinodes = new Set();
  for (const pos of Object.values(antenas)) {
    for (let i = 0; i < pos.length; i++) {
      for (let j = i + 1; j < pos.length; j++) {
        let [ri, ci] = pos[i];
        let [rj, cj] = pos[j];
        let [dr, dc] = [ri - rj, ci - cj]
        for (let k = start; k <= n; k++) {
          [ari, aci] = [ri + k*dr, ci + k*dc]
          if (0 <= ari && ari < rows && 0 <= aci && aci < cols) antinodes.add(`${ari},${aci}`);
          [arj, acj] = [rj - k*dr, cj - k*dc]
          if (0 <= arj && arj < rows && 0 <= acj && acj < cols) antinodes.add(`${arj},${acj}`);
        }
      }
    }
  }
  console.log(antinodes.size);
}
function main(filePath) {
    const grid = fs.readFileSync(filePath, 'utf-8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');
    // console.log(grid)
    const rows = grid.length;
    const cols = grid[0].length;
    antenas = {};
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        char = grid[r][c];
        if (char === '.') continue;
        if (!antenas[char]) antenas[char] = [];
        antenas[char].push([r, c]);
      }
    }
    console.log(antinodeCount(antenas, rows, cols, 1, 1));
    console.log(antinodeCount(antenas, rows, cols, 0, rows));   
}

// main('./8/input0.txt')
main('./8/input.txt')
