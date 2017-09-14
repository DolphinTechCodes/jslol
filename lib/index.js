
var program = require("commander");
const path = require("path");
const fs = require("fs");
const parse = require("./lexer");
const interpreter = require("./interpreter");




var tests = ["test.lol", "bigtest.lol"];
function printTests() {
    console.log('\n  Availavle tests:');
    console.log();

    for (let i = 0; i < tests.length; i++) {
        console.log("    " + tests[i] + (i ? "" : "  (default)"));
    }
    console.log();
}

//console.log(resolvePath("test.lol"))

program
    .version('0.0.1')


    .option('-v, --version', 'output the version number')


program
    .command('run <file>')
    .alias('r')
    .description('interpret the specified file')
    .option("-t, --timer", "output the time needed")
    .option("-e, --extended-errors", "Show the extended error info (This will be a bit slower)")

    .action(function (file, options) {
        if (options.extendedErrors) global.extErr = true;
        // var timer = options.timer || "normal";
        //console.log(program.timer)
        //console.log(resolvePath(file))
        var p = path.resolve(process.cwd(), file);
        // console.log(fs.accessSync(p))
        if (fs.existsSync(p)) {
            run(p, options.timer);
        }
        else {

            console.error("Could not open file " + p)

        }
        // console.log('setup for %s env(s) with %s mode', file, program.timer);
    });


program
    .command('test [test-file]')
    .alias('t')
    .description('interpret the specified test file')
    .option("-t, --timer", "output the time needed")
    .option("-l, --list", "Lists all available tests")
    .option("-e, --extended-errors", "Show the extended error info (This will be a bit slower)")
    .action(function (file, options) {
        //console.log(options)
        if (options.extendedErrors) global.extErr = true;
        if (options.list) printTests();
        file = file || "test.lol";
        if (!file.endsWith(".lol")) { file += ".lol"; }

        if (tests.includes(file)) {
            run(path.normalize(__dirname + "/../tests/" + file), options.timer)
        }
        else {
            console.error("\nTest " + file + " not available!\nPlease type 'jslol test -l' to get a list of available tests");
        }

    }).on('--help', function () {
        printTests();
    });

program
    .command('<file>')
    .action(function (file) {
        console.log('deploying "%s"', file);
    });

/*console.log("argv0: ",process.argv0);
console.log("cwd: ",process.cwd());
for (t of process.argv) {console.log(t)}*/
//program.options[0].short="-v";
//console.log(program);
program.parse(process.argv);

if (program.vers) console.log(program._version);


//var file=process.argv.find(e => e.endsWith(".lol")); //get the file to read
//if(!file) file="./test.lol"
//console.log(file);



function run(file, timer) {

    //console.log(sourcecode);
    if (timer) {

        process.on("exit", () => console.timeEnd("\ntime needed"))
    }
    try {
        //console.log(program.timer)
        if (timer) console.time("\ntime needed");
        var sourcecode = fs.readFileSync(file, "utf-8"); //read the file
        parse(sourcecode);

    }

    catch (error) {
        if (error.constructor.name == "Maus") {
            console.error(error.toString());
            //console.log(error.msg);
        }
        else {
            console.error(error);
        }

    }
}