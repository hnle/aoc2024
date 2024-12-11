const fs = require('fs');

function main(filePath) {
  const data = fs.readFileSync(filePath, "utf8").split("\n");
  data.forEach(line => {

  });
}

main('./10/input0.txt')
//main('./10/input.txt')
