# https://adventofcode.com/2024/day/5
# Note: By inspection we know we have order for each pair of numbers
from pprint import pp

def in_order(arr: list[int], order: dict[tuple, bool]) -> bool:
    return all(order[(arr[i], arr[i+1])] for i in range(len(arr)-1))

def buble_sort(arr: list[int], order: dict[tuple, bool]) -> None:
    # print(f'1: OUT_ORDER: {arr=}')
    for i in range(len(arr)-1):
        for j in range(i+1, len(arr)):
            # print('\t', order[j], order[i])
            if order[(arr[j], arr[i])]:
                # swap arr[i] and arr[j]
                arr[i], arr[j] = arr[j], arr[i]
    assert (in_order(arr, order))
    # print(f'2: SORTED   : {arr=}')
    
def main(file_path: str) -> None:
    def middle_of_reordered_page(arr: list[str]) -> int:
        # Reorder the pages according to the page_order
        # using Bubble sort method
        buble_sort(arr, page_order)
        return arr[len(arr) // 2]
    
    
    def middle(arr: list[str]) -> tuple[int, int]:
        """Checks if the array is in order
        If not, sort it.
        Returns the middle element.
        """
        if in_order(arr, page_order):
            return [int(arr[len(arr) // 2]), 0]
            
        return [0, middle_of_reordered_page(arr)]
                       
    # mapping between a page and the following ones
    page_order = {}
    part1, part2 = 0, 0
    with open(file_path) as f:
        # Read in the first part regarding page order
        for line in f:
            if line == '\n':
                break
            
            a, b = map(int, line.split('|'))
            page_order[(a, b)] = True
            page_order[(b, a)] = False

        for line in f:
            arr = list(map(int, line.strip().split(',')))
            p1, p2 = middle(arr)
            part1 += p1
            part2 += p2
    print(part1, part2)


if __name__ == "__main__":
    main("./5/input0.txt")
    main("./5/input.txt")
