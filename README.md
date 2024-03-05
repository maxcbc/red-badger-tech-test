# Martian Robots

## Description
Attempted typescript solution to the Red Badger martian robots tech test.

## Caveat
The third robot in the provided Sample Input starts off the grid. 
The code in this repo does not produce the expected output for this scenario. 
The enclosed `input.txt` instead places the robot 1 square to the south in order that it starts on the grid.

## Getting started

This project has been written using Node 20.x, it may not work with other versions.

### Install Dependencies
Dependencies are managed via `npm` and can be installed via:
```shell
npm install
```

### Unit tests
Unit tests are written in `jest` and can be run via npm:
```shell
npm test
```

### Building the project
The project can be built via `tsc` using:
```shell
npm run build
```

### Running the project
The project can be run, from the root directory with:
```shell
node ./dist/index.js
```
This uses the `input.txt` enclosed and produces an `output.txt`.