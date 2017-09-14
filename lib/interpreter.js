const prompt = require("prompt-sync")();
const Maus = require("./error");
const { Noob, Troof, Numbr, Numbar, Yarn } = require("./variables");
const validate = require("./name-validator");



module.exports = { interpret, getTokenIdx, getTokens,  };

//firstly we have to assign all variables globally
var tokens, t, stack, context = [interpretProgram], version;
global.vars = [new Varscope()];
/*
we will make use of listed context environment interpreters
to interpret different code contexts (e.g:normal code, IF/THEN or LOOPS)
they are stored in the array ctx and the first gets executed every time 
there is a new list of tokens available
*/

function interpret(tokens_) {
    // console.log(tokens_)
    //reset all variables necessary
    //console.log(tokens_)
    tokens = tokens_;
    t = 0;
    context[0]();
}

//the context environment interpreter for normal code:
function interpretProgram() {
    switch (tokens[0]) {
        case "HAI":
            version = tokens[++t];
            console.log("Program started! version: " + version + '\n');
            return

        case "KTHXBYE":
            process.exit();

        case "VISIBLE":
            while (tokens[t + 1] != '!') {
                //if(t <= (tokens.length )) break;
                var msg = evalExpr()
                // console.log(msg.toYarn())
                process.stdout.write(msg.toYarn().val)
                if (t >= (tokens.length - 1)) break;
                //console.log()

                //console.log(t,tokens[t])
            }

            if (tokens[t + 1] != '!') process.stdout.write('\n');
            return;

        case "I HAS A":
            var name = tokens[++t];

            validate(name);
            if (tokens[++t] == "ITZ") {
                global.vars[0][name] = tokens[++t];
            }
            else {
                global.vars[0][name] = new Noob();
            }
            console.log(global.vars);
    }

}


function evalExpr(explicite = false) {
    
    //eval expressions from the t pointer
    //console.log("eva")

    function numberType(value) {
        return value % 1 === 0 && !explicite ? new Numbr(value) : new Numbar(value);
    }

    function anCheck() {
        if (tokens[++t] != "AN") throw new Maus("WHER IZ MY AN?",205);
    }
    switch (tokens[++t]) {

        case "SUM OF":
            var v1 = evalExpr().toNumbar().val;
            anCheck();
            var v2 = evalExpr().toNumbar().val;
            return numberType(v1 + v2, explicite);

        case "DIFF OF":
            var v1 = evalExpr().toNumbar().val;
            anCheck();
            var v2 = evalExpr().toNumbar().val;
            return numberType(v1 - v2, explicite);

        case "PRODUKT OF":
            var v1 = evalExpr().toNumbar().val;
            anCheck();
            var v2 = evalExpr().toNumbar().val;
            return numberType(v1 * v2, explicite);

        case "QUOSHUNT OF":
            var v1 = evalExpr().toNumbar().val;
            anCheck();
            var v2 = evalExpr().toNumbar().val;
            return numberType(v1 / v2, explicite);

        case "MOD OF":
            var v1 = evalExpr().toNumbar().val;
            anCheck();
            var v2 = evalExpr().toNumbar().val;
            return numberType(v1 % v2, explicite);

        case "BIGGR OF":
            var v1 = evalExpr().toNumbar().val;
            anCheck();
            var v2 = evalExpr().toNumbar().val;
            return numberType(Math.max(v1, v2));

        case "SMALLR OF":
            var v1 = evalExpr().toNumbar().val;
            anCheck();
            var v2 = evalExpr().toNumbar().val;
            return numberType(Math.min(v1, v2));

        case "BOTH OF":
            var v1 = evalExpr().toTroof().val;
            anCheck();
            var v2 = evalExpr().toTroof().val;
            return new Troof(v1 && v2);

        case "EITHER OF":
            var v1 = evalExpr().toTroof().val;
            anCheck();
            var v2 = evalExpr().toTroof().val;
            return new Troof(v1 && v2);

        case "WON OF":
            var v1 = evalExpr().toTroof().val;
            anCheck();
            var v2 = evalExpr().toTroof().val;
            return new Troof(v1 && v2);

        case "NOT":

            return new Troof(!(evalExpr().toTroof().val));

        case "ANY OF":
            var out = false;
            while (tokens[t] != "MKAY") {

                if (evalExpr().toTroof().val) out = true;

                if (t + 1 >= tokens.length) break;
                if (tokens[t + 1] == "MKAY") {
                    t++;
                    break
                }
                anCheck()
            }
            return new Troof(out);

        case "ALL OF":
            var out = true;
            while (tokens[t] != "MKAY") {

                if (!evalExpr().toTroof().val) out = false;

                if (t + 1 >= tokens.length) break;
                if (tokens[t + 1] == "MKAY") {
                    t++;
                    break
                }
                anCheck()
            }
            return new Troof(out);

        case "SMOOSH":
            var out = "";
            while (tokens[t] != "MKAY") {

                out+=evalExpr().toYarn().val;

                if (t + 1 >= tokens.length) break;
                if (tokens[t + 1] == "MKAY") {
                    t++;
                    break
                }
                anCheck()
            }
            return new Yarn(out);

        case "BOTH SAEM":
            var v1 = evalExpr().val;
            anCheck();
            var v2 = evalExpr().val;
            return new Troof(v1 === v2);

        case "DIFFRINT":
            var v1 = evalExpr().val;
            anCheck();
            var v2 = evalExpr().val;
            return new Troof(v1 !== v2);
    }

    return parseLit(); //if everything else fails, try to parse a literal
}

function parseLit() {
    if (/^-?(\d+)?$/.test(tokens[t])) return new Numbar(parseInt(tokens[t]));

    if (/^-?[0-9]\d*(\.\d+)?$/.test(tokens[t])) return new Numbar(parseFloat(tokens[t]));
    //console.log(t, tokens[t])
    if (tokens[t] && tokens[t][0] == '"') {
        if (tokens[t].includes(':')) {
            return tokens[t].slice(1, -1);
        }
        return new Yarn(tokens[t].slice(1, -1));
    }

    if (tokens[t] == "NOOB") return new Noob();

    if (tokens[t] == "WIN") return new Troof(true);

    if (tokens[t] == "FAIL") return new Troof(false);

    throw new Maus(tokens[t] + ", WTF?",204);
}
//global.varscope constructor
function Varscope() {
    this.IT = new Noob();
}

//functions to export variables from this module:

function getTokenIdx() {
    return t;
}

function getTokens() {
    return tokens;
}

