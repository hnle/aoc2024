const fs = require('fs');

// Helper to generate range
const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);

function part1(grid) {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const count = grid.flatMap((row, r) =>
        row.split('').flatMap((cell, c) =>
            cell === "X"
                ? [-1, 0, 1]
                      .flatMap(dr =>
                          [-1, 0, 1]
                              .filter(dc => !(dr === 0 && dc === 0))
                              .filter(dc =>
                                  r + 3 * dr >= 0 &&
                                  r + 3 * dr < numRows &&
                                  c + 3 * dc >= 0 &&
                                  c + 3 * dc < numCols &&
                                  grid[r + dr][c + dc] === "M" &&
                                  grid[r + 2 * dr][c + 2 * dc] === "A" &&
                                  grid[r + 3 * dr][c + 3 * dc] === "S"
                              )
                      )
                      .length
                : 0
        )
    ).reduce((acc, curr) => acc + curr, 0);

    console.log(count);
}

function part2(grid) {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const count = range(1, numRows - 1)
        .flatMap(r =>
            range(1, numCols - 1).filter(c =>
                grid[r][c] === "A" &&
                ["MMSS", "MSSM", "SSMM", "SMMS"].includes(
                    [grid[r - 1][c - 1], grid[r - 1][c + 1], grid[r + 1][c + 1], grid[r + 1][c - 1]].join("")
                )
            ).length
        )
        .reduce((acc, curr) => acc + curr, 0);

    console.log(count);
}

function main(filePath) {
    const grid = fs.readFileSync(filePath, 'utf-8').split('\n').map(line => line.trim());
    part1(grid);
    part2(grid);
}

// Execute with given file paths
main("./4/input0.txt");
main("./4/input.txt");
