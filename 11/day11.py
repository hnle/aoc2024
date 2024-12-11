# https://adventofcode.com/2024/day/11
from collections import Counter

def main(file_path: str) -> None:
    counter = Counter()
    with open(file_path) as f:
        for line in f:
            for num in [int(x) for x in line.split()]:
                counter[num] += 1
                
    def count_stones(num_blinks: int) -> None:
        curr_counter = counter.copy()
        for blink in range(num_blinks):
            new_counter = Counter()
            for k, v in curr_counter.items():
                if k == 0:
                    new_counter[1] += v
                else:
                    s = str(k)
                    if len(s) % 2 == 0:
                        k1 = int(s[:len(s)//2])
                        k2 = int(s[len(s)//2:])
                        new_counter[k1] += v
                        new_counter[k2] += v
                    else:
                        new_counter[k*2024] += v
                    
                # the old stone has been replaced
                curr_counter[k] -= v
            curr_counter.update(new_counter)
            # print_blink(blink, dict(counter))
        print(sum(curr_counter.values()))
    
    count_stones(25)
    count_stones(75)
    
def print_blink(b, d):
    print(f'{b+1}: ', end=' ')
    for k, v in d.items():
        if v > 0:
            print(f'{k}: {v}', end=',')
    print()
if __name__ == '__main__':
    # main('./11/input0.txt')
    main('./11/input.txt')
