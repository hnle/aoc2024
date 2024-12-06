const fs = require('fs');

function inOrder(arr, order) {
    return arr.slice(0, arr.length - 1).every((_, i) => order[`${arr[i]},${arr[i + 1]}`]);
}

function bubbleSort(arr, order) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (order[`${arr[j]},${arr[i]}`]) {
                // Swap arr[i] and arr[j]
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    if (!inOrder(arr, order)) {
        throw new Error("Array is not in order after sorting");
    }
}

function middleOfReorderedPage(arr, pageOrder) {
    bubbleSort(arr, pageOrder);
    return arr[Math.floor(arr.length / 2)];
}

function middle(arr, pageOrder) {
    if (inOrder(arr, pageOrder)) {
        return [parseInt(arr[Math.floor(arr.length / 2)], 10), 0];
    }
    return [0, middleOfReorderedPage(arr, pageOrder)];
}

function main(filePath) {
    const pageOrder = {};
    let part1 = 0;
    let part2 = 0;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    
    let i = 0;
    // Read in the first part regarding page order
    for (; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') break;

        const [a, b] = line.split('|').map(Number);
        pageOrder[`${a},${b}`] = true;
        pageOrder[`${b},${a}`] = false;
    }

    // Process the second part of the file
    for (i++; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') continue;

        const arr = line.split(',').map(Number);
        const [p1, p2] = middle(arr, pageOrder);
        part1 += p1;
        part2 += p2;
    }

    console.log(part1, part2);
}

// Run with example files
main('./5/input0.txt');
main('./5/input.txt');
