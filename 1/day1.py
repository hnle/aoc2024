from collections import Counter
def get_lists(file_path: str) -> tuple[list[int], list[int]]:
    l1, l2 = [], []
    with open(file_path) as f:
        for line in f:
            n1, n2 = list(map(int, line.split()))
            l1.append(n1)
            l2.append(n2)
    return l1, l2
    
def day1a(l1: list[int], l2: list[int]) -> int:
    l1.sort()
    l2.sort()
    return sum(abs(e1 - e2) for e1, e2 in zip(l1, l2))

def day1b(l1: list[int], l2: list[int]) -> int:
    """Gets similarity score between 2 lists."""
    hist2 = Counter(l2)
    return sum(e * hist2[e] for e in l1)

def main(file_path):
    l1, l2 = get_lists(file_path)
    # print(day1a(l1, l2))
    print(day1b(l1, l2))
    
if __name__ == '__main__':
    # main('./1/input0.txt')
    main('./1/input.txt')