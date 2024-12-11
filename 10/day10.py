# https://adventofcode.com/2024/day/10
from pprint import pp
from collections import deque
def main(file_path: str) -> None:
    
    with open(file_path) as f:
        grid = [[int(c) for c in line.strip()] for line in f]
    # pp(grid)
    rows, cols = len(grid), len(grid[0])
    zeros = [(r, c) for r in range(rows) for c in range(cols) if grid[r][c] == 0]
    
    def part1():
        total = 0
        for r, c in zeros:
            q = deque([(r, c)])
            seen = {(r, c)}
            count = 0
            while q:
                r, c = q.popleft()
                for nr, nc in [(r-1, c), (r, c+1), (r+1, c), (r, c-1)]:
                    if nr < 0 or nr >= rows or nc < 0 or nc >= cols: continue
                    if grid[nr][nc] != grid[r][c] + 1: continue
                    if (nr, nc) in seen: continue
                    seen.add((nr, nc))
                    if grid[nr][nc] == 9:
                        count += 1
                    else:
                        q.append((nr, nc))
            total += count
        print(total)
        
    def part2():
        total = 0
        for r, c in zeros:
            q = deque([(r, c)])
            seen = {(r, c): 1}
            count = 0
            while q:
                r, c = q.popleft()
                if grid[r][c] == 9:
                    count += seen[(r, c)]
                    
                for nr, nc in [(r-1, c), (r, c+1), (r+1, c), (r, c-1)]:
                    if nr < 0 or nr >= rows or nc < 0 or nc >= cols: continue
                    if grid[nr][nc] != grid[r][c] + 1: continue
                    if (nr, nc) in seen:
                        seen[(nr, nc)] += seen[(r, c)]
                        continue
                    seen[(nr, nc)] = seen[(r, c)]
                    q.append((nr, nc))
            total += count
        print(total)                   
    
    # part1()
    part2()
if __name__ == '__main__':
    main('./10/input0.txt')
    main('./10/input.txt')
