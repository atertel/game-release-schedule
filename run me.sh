#!/bin/bash

clear

echo "Let's start"

echo "Building PC list..."

phantomjs pc-list.js > output.txt

echo "Building Xbox list..."

phantomjs xbox-list.js >> output.txt

echo "Building PS4 list..."

phantomjs ps-list.js >> output.txt

echo "Building Switch list..."

phantomjs switch-list.js >> output.txt

read -n 1 -s -r -p "List compiled in output.txt. Press any key to exit"

exit