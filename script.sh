#!/bin/sh
# Check if at least one argument is provided
if [ $# -lt 1 ]; then
    echo "Usage: $0 <day>"
    exit 1
fi
COOKIE=
DAY=$1
INPUT="./$DAY/input.txt"
PY="./$DAY/day$DAY.py"
JS="./$DAY/day$DAY.js"
# echo "Getting input file for day $DAY into $INPUT..."
curl -b session=$COOKIE "https://adventofcode.com/2024/day/$DAY/input" -o ./$DAY/input.txt
echo "---------------------------------"
echo "Generate skeleton for day$DAY.py"
echo "def main(file_path: str) -> None:" > $PY
echo "    with open(file_path) as f:"    >> $PY
echo "        for line in f:"            >> $PY
echo "            pass"                  >> $PY
echo ""                                  >> $PY
echo "if __name__ == '__main__':"        >> $PY
echo "    main('./$DAY/input0.txt')"     >> $PY
echo "    #main('./$DAY/input.txt')"     >> $PY
echo "---------------------------------"
echo "Generate skeletion for day$DAY.js"
echo "const fs = require('fs');"         > $JS
echo ""                                  >> $JS
echo "function main(filePath) {"         >> $JS
echo '  const data = fs.readFileSync(filePath, "utf8").split("\\n");' >> $JS
echo "  data.forEach(line => {"          >> $JS
echo ""                                  >> $JS
echo "  });"                             >> $JS
echo "}"                                 >> $JS
echo ""                                  >> $JS
echo "main('./$DAY/input0.txt')"         >> $JS
echo "//main('./$DAY/input.txt')"        >> $JS
