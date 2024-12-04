const fs = require('fs');

function part1(grid) {
    let count = 0;
    const numRows = grid.length;
    const numCols = grid[0].length;

    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            if (grid[r][c] !== "X") continue;

            for (let dr of [-1, 0, 1]) {
                for (let dc of [-1, 0, 1]) {
                    if (dr === 0 && dc === 0) continue;

                    if (
                        r + 3 * dr >= 0 &&
                        r + 3 * dr < numRows &&
                        c + 3 * dc >= 0 &&
                        c + 3 * dc < numCols &&
                        grid[r + dr][c + dc] === "M" &&
                        grid[r + 2 * dr][c + 2 * dc] === "A" &&
                        grid[r + 3 * dr][c + 3 * dc] === "S"
                    ) {
                        count++;
                    }
                }
            }
        }
    }

    console.log(count);
}

function part2(grid) {
    let count = 0;
    const numRows = grid.length;
    const numCols = grid[0].length;

    for (let r = 1; r < numRows - 1; r++) {
        for (let c = 1; c < numCols - 1; c++) {
            if (grid[r][c] !== "A") continue;

            const corners = [
                grid[r - 1][c - 1],
                grid[r - 1][c + 1],
                grid[r + 1][c + 1],
                grid[r + 1][c - 1],
            ].join("");

            if (["MMSS", "MSSM", "SSMM", "SMMS"].includes(corners)) {
                count++;
            }
        }
    }

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
