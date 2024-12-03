# https://adventofcode.com/2024/day/3
import re
                    
def day3(text: str) -> None:
    def part1() -> None:
        pat1 = r"mul\((\d+),(\d+)\)"
        matches = re.findall(pat1, text)
        print(sum(int(num[0]) * int(num[1]) for num in matches))

    def part2() -> None:    
        pat2 = re.findall(r"(?:mul\((\d+),(\d+)\))|(do\(\)|don't\(\))", text)
        enabled = True
        ans = 0
        for match in pat2:
            if match[2] == "" and enabled:
                ans += int(match[0]) * int(match[1])
            else:
                enabled = match[2] == "do()"
        print(ans)
    
    part1()
    part2()
    
def main(file_path: str):
    with open("./3/input.txt") as fin:
        s = fin.read().strip()
    day3(s)
    
if __name__ == '__main__':
    # main('./3/input0.txt')
    main('./3/input.txt')

"""
Part 1:
input.txt: 178886550

Part 2:
input.txt: 87163705
""" 