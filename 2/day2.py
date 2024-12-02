def day2b(file_path: str) -> int:
    """Gets number of safe reports.
    Safe is defined as:
    1. The levels are either all increasing or all decreasing.
    2. Any two adjacent levels differ by at least one and at most three.
    """
    def is_safe(levels):
        def is_valid(sequence):
            # Check if the sequence is valid (all increasing or decreasing and differences between 1 and 3)
            for i in range(len(sequence) - 1):
                diff = abs(sequence[i] - sequence[i + 1])
                if diff < 1 or diff > 3:
                    return False
            is_increasing = all(sequence[i] < sequence[i + 1] for i in range(len(sequence) - 1))
            is_decreasing = all(sequence[i] > sequence[i + 1] for i in range(len(sequence) - 1))
            return is_increasing or is_decreasing

        # Check if the original sequence is valid
        if is_valid(levels):
            return True

        # Check all possible sequences by removing one element
        for i in range(len(levels)):
            modified_levels = levels[:i] + levels[i + 1:]
            if is_valid(modified_levels):
                return True

        return False

    count = 0
    with open(file_path) as f:
        for line in f:
            report = list(map(int, line.split()))
            count += is_safe(report)
    return count

def day2a(file_path: str) -> int:
    """Gets number of safe reports.
    Safe is defined as:
    1. The levels are either all increasing or all decreasing.
    2. Any two adjacent levels differ by at least one and at most three.
    3. Can tolerate one bad level
    """
    def is_safe(nums: list[int]) -> bool:
        sign = nums[1] - nums[0]
        return all(1 <= abs(nums[i] - nums[i-1]) <= 3 and (nums[i] - nums[i-1]) * sign > 0 
                   for i in range(1, len(nums)))

    count = 0
    with open(file_path) as f:
        for line in f:
            report = list(map(int, line.split()))
            count += is_safe(report)
    return count

def main(file_path: str) -> None:
    print(day2a(file_path))
    print(day2b(file_path))
    
if __name__ == '__main__':
    # main('./2/input0.txt') 
    # main('./2/input1.txt') 
    main('./2/input.txt') 