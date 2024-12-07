const fs = require('fs');

function canObtain(target, arr) {

    if (arr.length === 1) {
        return target === arr[0];
    }
    const last = arr[arr.length - 1];
    let subarr = arr.slice(0, -1);
    if (target % last === 0 && canObtain(Math.floor(target / last), subarr)) {
        return true;
    }

    if (target > last && canObtain(target - last, subarr)) {
        return true;
    }

    const sTarget = target.toString();
    const sLast = last.toString();
    if (sTarget.length > sLast.length && sTarget.endsWith(sLast) && canObtain(parseInt(sTarget.slice(0, -sLast.length)), arr.slice(0, -1))) {
        return true;
    }
    return false;
}

function main(filePath) {
    let total = 0;
    const data = fs.readFileSync(filePath, 'utf8').split('\n');
    data.forEach(line => {
        if (line === '') return;
        const [part1, part2] = line.split(': ');
        const target = parseInt(part1);
        const arr = part2.split(' ').map(Number);
        if (canObtain(target, arr)) {
            total += target;
        }
    });

    console.log(total);
}

main("./7/input0.txt");
main("./7/input.txt");
