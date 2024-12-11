const fs = require('fs');

const main = (filePath) => {
    // Read and parse file
    const grid = fs.readFileSync(filePath, 'utf8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');
    
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Group antenas by their character
    const antenas = grid.reduce((acc, row, r) => {
        row.split('').forEach((char, c) => {
            if (char !== '.') {
                acc[char] = [...(acc[char] || []), [r, c]];
            }
        });
        return acc;
    }, {});
    
    const antinodeCount = (start, n = 1) => {
        // Use functional approach to generate antinodes
        const antinodes = Object.values(antenas)
            .flatMap(positions => 
                positions.flatMap((pos1, i) => 
                    positions.slice(i + 1).flatMap(pos2 => {
                        const [ri, ci] = pos1;
                        const [rj, cj] = pos2;
                        const dr = ri - rj;
                        const dc = ci - cj;
                        
                        // Generate potential antinodes
                        return Array.from({length: n - start + 1}, (_, k) => k + start)
                            .flatMap(k => [
                                // Check positions in different directions
                                [ri + k * dr, ci + k * dc],
                                [rj - k * dr, cj - k * dc]
                            ])
                            .filter(([r, c]) => 
                                r >= 0 && r < rows && 
                                c >= 0 && c < cols
                            );
                    })
                )
            );
        
        // Use Set to get unique antinodes
        console.log(new Set(antinodes.map(pos => pos.join(','))).size);
    };
    
    // Call with different start and n values
    antinodeCount(1, 1);
    antinodeCount(0, rows);
};

// Usage
main('./8/input.txt');