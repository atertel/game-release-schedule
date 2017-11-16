#!/bin/bash

clear

echo "Let's start"

echo "Building PC list..."

./phantomjs-2.1.1-windows/bin/phantomjs.exe pc-list.js > output.txt

echo "Building Xbox list..."

./phantomjs-2.1.1-windows/bin/phantomjs.exe xbox-list.js >> output.txt

echo "Building PS4 list..."

./phantomjs-2.1.1-windows/bin/phantomjs.exe ps-list.js >> output.txt

echo "Building Switch list..."

./phantomjs-2.1.1-windows/bin/phantomjs.exe switch-list.js >> output.txt

read -n 1 -s -r -p "List compiled in output.txt. Press any key to exit"

exit