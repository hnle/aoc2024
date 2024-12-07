def main(file_path: str) -> None:
    def can_obtain(target: int, arr: list[int]) -> bool:
        print(f'{target=}, {arr=}')
        if len(arr) == 1:
            return target == arr[0]
        # target divisible by the last number
        if target % arr[-1] == 0 and can_obtain(target // arr[-1], arr[:-1]):
            return True
        if target > arr[-1] and can_obtain(target - arr[-1], arr[:-1]):
            return True
        # For part 2
        # s_target = str(target)
        # s_last = str(arr[-1])
        # if len(s_target) > len(s_last) and s_target.endswith(s_last) and \
        #     can_obtain(int(s_target[:-len(s_last)]), arr[:-1]):
        #         return True
        return False
    
    total = 0
    with open(file_path) as f:
        for line in f:
            part1, part2 = line.split(': ')
            target = int(part1)
            arr = list(map(int, part2.split()))
            if can_obtain(target, arr):
                total += target
    print(total)
       
if __name__ == "__main__":
    main("./7/input0.txt")
    # main("./7/input.txt")
