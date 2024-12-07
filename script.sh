#!/bin/sh
# Check if at least one argument is provided
if [ $# -lt 1 ]; then
    echo "Usage: $0 <day>"
    exit 1
fi
DAY=$1
COOKIE=53616c7465645f5f24816c25af32156af459144ca54d83e231c455e7a73bf121023426ee1c597c7e76bb3c8decd670805bc35630ca390e82aa4a218731476134
curl -b session=$COOKIE "https://adventofcode.com/2024/day/$DAY/input" -o ./$DAY/input.txt