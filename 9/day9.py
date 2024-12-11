# https://adventofcode.com/2024/day/9
DIGITS = set(list(range(0, 10)))
def main(file_path: str) -> None:
    with open(file_path) as f:
        disk_map = f.readline().strip()
        
    def part1():
        file_lens,  free_lens = [], []
        # disk_map = '12345'
        for i, c in enumerate(disk_map):
            if i % 2 == 1:
                free_lens.append(int(c))
            else:
                file_lens.append(int(c))
        # print(file_lens, free_lens)
        original = []
        i, j = 0, 0
        while i < len(file_lens) and j < len(free_lens):
            original.extend([i] * file_lens[i] + ['.']  * free_lens[j])
            i += 1
            j += 1
        
        if i < len(file_lens):
            original.extend([i] * file_lens[i])
        elif j < len(free_lens):
            original.extend(['.'] * free_lens[j])
        # print(original)
        
        dots = [i for i, c in enumerate(original) if c == '.']
        # Simulating moving digits from the right to positions of the dot from the left
        for i in dots:
            while original[-1] == '.': 
                original.pop()
            if len(original) <= i: 
                break
            original[i] = original.pop()
        print(sum(i * x for i, x in enumerate(original)))
    
    def part2():
        # print(disk_map)
        fid = 0
        pos = 0
        files = {}
        blanks = []
        for i, ch in enumerate(disk_map):
            x = int(ch)
            if i % 2 == 0:
                if x == 0:
                    raise ValueError("unexpected x=0 for file")
                files[fid] = (pos, x)
                fid += 1
            else:
                if x != 0:
                    blanks.append((pos, x))
            pos += x
        
        while fid > 0:
            fid -= 1
            pos, size = files[fid]
            for i, (start, length) in enumerate(blanks):
                if start >= pos:
                    blanks = blanks[:i]
                    break
                if size <= length:
                    files[fid] = (start, size)
                    if size == length:
                        blanks.pop(i)
                    else:
                        blanks[i] = (start + size, length - size)
                    break
        total = 0
        for fid, (pos, size) in files.items():
            for x in range(pos, pos + size):
                total += fid * x
        print(total)    
    # part1()
    part2()
if __name__ == '__main__':
    main('./9/input0.txt')
    main('./9/input.txt')
