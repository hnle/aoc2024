# https://adventofcode.com/2024/day/4


def part1(grid: list[list[str]]) -> None:
    count = 0
    num_rows, num_cols = len(grid), len(grid[0])
    for r in range(num_rows):
        for c in range(num_cols):
            if grid[r][c] != "X":
                continue
            for dr in [-1, 0, 1]:
                for dc in [-1, 0, 1]:
                    if dr == dc == 0:
                        continue
                    if not (0 <= r + 3 * dr < num_rows and 0 <= c + 3 * dc < num_cols):
                        continue
                    if (
                        grid[r + dr][c + dc] == "M"
                        and grid[r + 2 * dr][c + 2 * dc] == "A"
                        and grid[r + 3 * dr][c + 3 * dc] == "S"
                    ):
                        count += 1

    print(count)


def part2(grid: list[list[str]]) -> None:
    count = 0
    num_rows, num_cols = len(grid), len(grid[0])
    for r in range(1, num_rows-1):
        for c in range(1, num_cols-1):
            if grid[r][c] != "A":
                continue
            corners = [grid[r-1][c-1], grid[r-1][c+1], grid[r+1][c+1], grid[r+1][c-1]]
            if ''.join(corners) in ['MMSS', 'MSSM', 'SSMM', 'SMMS']:
                count += 1
    print(count)

def main(file_path: str) -> None:
    with open(file_path) as f:
        grid = f.read().splitlines()
    part1(grid)
    part2(grid)


if __name__ == "__main__":
    main("./4/input0.txt")
    main("./4/input.txt")
