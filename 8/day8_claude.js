const fs = require('fs');

function main(filePath) {
    // Read the file synchronously 
    const grid = fs.readFileSync(filePath, 'utf8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');
    
    const rows = grid.length;
    const cols = grid[0].length;
    
    const antenas = {};
    
    // Find antena positions
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const char = grid[r][c];
            if (char !== '.') {
                if (!antenas[char]) {
                    antenas[char] = [];
                }
                antenas[char].push([r, c]);
            }
        }
    }
    
    function antinodeCount(start, n = 1) {
        const antinodes = new Set();
        
        // Iterate through antena groups
        for (const positions of Object.values(antenas)) {
            // Compare each pair of antenas in a group
            for (let i = 0; i < positions.length - 1; i++) {
                for (let j = i + 1; j < positions.length; j++) {
                    const [ri, ci] = positions[i];
                    const [rj, cj] = positions[j];
                    const dr = ri - rj;
                    const dc = ci - cj;
                    
                    // Check antinodes in different directions
                    for (let k = start; k <= n; k++) {
                        if (ri + k * dr >= 0 && ri + k * dr < rows && 
                            ci + k * dc >= 0 && ci + k * dc < cols) {
                            antinodes.add(`${ri + k * dr},${ci + k * dc}`);
                        }
                        
                        if (rj - k * dr >= 0 && rj - k * dr < rows && 
                            cj - k * dc >= 0 && cj - k * dc < cols) {
                            antinodes.add(`${rj - k * dr},${cj - k * dc}`);
                        }
                    }
                }
            }
        }
        
        console.log(antinodes.size);
    }
    
    // Call with different start and n values
    antinodeCount(1, 1);
    antinodeCount(0, rows);
}

// Usage
main('./8/input.txt');