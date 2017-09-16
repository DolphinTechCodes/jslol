# jslol
### LOLCODE interpreter written in JavaScript for Node.js

## Version
The current version is BETA 0.0.2

## Installation
#### Step 1
Download and install [Node.js](https://nodejs.org)
#### Step 2
Run `npm install jslol -g` from your command line

## Usage
**jslol is a command-line tool** and it is immediately available after the installation. jslol supports various sub-commands and option flags.
### Interpret files

To interpret a file, type
`jslol run <file> [options]` or `jslol r <file> [options]`.

Available option flags are `-e` or `--extended-errors` to show extended error information and `-t` or `--timer` to output the time needed for execution.

Since this function is the main purpose of jslol, there is also a short version available: `jslol <file>` 

Note that option flags cannot be used with the shortended command.

### Interpret test files

jslol comes with several test files, which can be used with the following command:

`jslol test [test] [options]` or `jslol test [test] [options]`.

Available option flags are `-e` or `--extended-errors` to show extended error information, `-t` or `--timer` to output the time needed for execution and `-ls` to list all available tests.

### Get the version number
The current version number can be displayed with `jslol -v`.
### Display help
Type `jslol -h` to get general help or `jslol <command> -h` to get thelp about the specified sub-command.
