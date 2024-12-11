from pprint import pp
def main(file_path: str) -> None:
    with open(file_path) as f:
        grid = f.read().splitlines()
    # pp(grid)
    rows, cols = len(grid), len(grid[0])
    
    antenas = {}
    for r in range(rows):
        for c in range(cols):
            char = grid[r][c]
            if char != '.':
                antenas[char] = antenas.get(char, []) + [(r, c)]
    
    def antinode_count(start: int, n: int = 1) -> None:
        antinodes = set()
        for pos in antenas.values():
            for i in range(len(pos)-1):
                for j in range(i+1, len(pos)):
                    ri, ci = pos[i]
                    rj, cj = pos[j]
                    dr, dc = ri - rj, ci - cj
                    for k in range(start, n+1):
                        if 0 <= ri + k*dr < rows and 0 <= ci + k*dc < cols:
                            antinodes.add((ri + k*dr, ci + k*dc))
                        if 0 <= rj - k*dr < rows and 0 <= cj - k*dc < cols:
                            antinodes.add((rj - k*dr, cj - k*dc))
        print(len(antinodes))
    antinode_count(start=1, n=1)
    # starts from 0 because we also count the 2 antenas
    antinode_count(start=0, n=rows)
    
    
if __name__ == '__main__':
    # main('./8/input0.txt')
    main('./8/input.txt')
