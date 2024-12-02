const fs = require('fs');
const readline = require('readline');

async function processFileLineByLine(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Handles both Windows (\r\n) and Unix (\n) line endings
  });

  for await (const line of rl) {
    // Process each line here
    console.log(`Line: ${line}`);
  }
}