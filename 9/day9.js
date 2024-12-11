const fs = require('fs');

function main(filePath) {
  const data = fs.readFileSync(filePath, "utf8").split("\n");
  data.forEach(line => {

  });
}

main('./9/input0.txt')
//main('./9/input.txt')
