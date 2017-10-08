const prompt = require("prompt-sync")();
const Maus = require("../err/error");
const { Noob, Troof, Numbr, Numbar, Yarn, Bukkit } = require("./variables");
const validate = require("./name-validator");
const identify=require("./identify");
const types = require("./types");
const cast = require("./explicite-casting");

module.exports = { interpret, getTokenIdx, getTokens, };

//firstly we have to assign all variables globally
var tokens, t, stack, context = [interpretProgram], version;
global.vars = [getVarscope()];
/*
we will make use of listed context environment interpreters
to interpret different code contexts (e.g:normal code, IF/THEN or LOOPS)
they are stored in the array ctx and the first gets executed every time 
there is a new list of tokens available
*/



function interpret(tokens_) {
    //cnsle.log(tokens_)
    //reset all variables necessary
    //cnsle.log(tokens_)
    tokens = tokens_;
    t = 0;
    context[0]();

    if (t + 1 < tokens.length) {
        console.log(t + 1, tokens)
        throw new Maus("SUPARFLUOS TOKEN", 205);
    }
    // cnsle.log(global.vars)
}

//the context environment interpreter for normal code:
function interpretProgram() {
    /*switch (tokens[1]) {
        //evaluate eventual assignment operators

        case "HAS A":
            // cnsle.log(tokens)
            t = 2;
            validate(tokens[2]);
            var name = tokens[2];
           
            
            
            if (tokens[3] == "ITZ") {
                t = 3;
                var val = evalExpr();
            }
            else if (tokens[3] == "ITZ A") {
                t = 4;
                var val = cast(new Noob(), tokens[4]);

            }
            else { var val = new Noob(); }
           
            t=0;
            var idf = tokens[0] == "I" ? [] : tokens[0].split("'Z ");
            idf.push(name);
            //cnsle.log(idf)
           
            vars[0].setSlot(idf, val, true, 0);
            t=5;

            return




        case "R":


            t = 1;
            var expr = evalExpr();
            t = 0;
            var idf = tokens[0].split("'Z ");
           // cnsle.log(idf)

            //if (!idf[0] in vars[0]) throw new Maus("NO HAS " + idf[0], 404);
            vars[0].setSlot(idf,expr,false,0);

            /*if (idf.length > 1) {
                cnsle.log(vars[0])//[idf[0]])
                vars[0][idf[0]].setSlot(idf, expr, false, 1);
            }
            else {
                vars[0][idf[0]] = expr;
            }*/

    // obj.val=evalExpr();

    // setProp(vars[0], tokens[0].split("'Z "), expr);
    /*/ if (tokens[0].includes("'Z")) {
         cnsle.log("Bukkits are currently not implemented");
     }
     else {
         if (!tokens[0] in vars[0]) throw new Maus("NO HAS " + tokens[0] + "!", 404);
         t = 1;
         vars[0][tokens[0]] = evalExpr();
     }
     



}*/

    switch (tokens[0]) {
        case "HAI":
            version = tokens[++t];
            console.log("Program started! version: " + version + '\n');
            return;

        case "KTHXBYE":
            process.exit();

        case "VISIBLE":
            while (tokens[t + 1] != '!') {
                //if(t <= (tokens.length )) break;
                var msg = evalExpr()
                // cnsle.log(msg.toYarn())
                process.stdout.write(msg.toYarn().val)
                if (t >= (tokens.length - 1)) break;
                //cnsle.log()

                //cnsle.log(t,tokens[t])
            }

            if (tokens[t + 1] != '!') process.stdout.write('\n');
            return;



    }

    vars[0].val.IT = evalExpr(true);

}


function evalExpr(standalone = false) {

    //eval expressions from the t pointer
    //cnsle.log(tokens.length,t)
    if (t + 1 >= tokens.length) throw new Maus("WHER IS MY EXPRESSION", 204);

    function numberType(value) {
        return value % 1 === 0 && !explicite ? new Numbr(value) : new Numbar(value);
    }

    function anCheck() {
        if (tokens[++t] != "AN") throw new Maus("WHER IZ MY AN?", 201);
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

                out += evalExpr().toYarn().val;

                if (t + 1 >= tokens.length) break;
                if (tokens[t + 1] == "MKAY") {
                    t++;
                    break
                }
                anCheck()
            }
            return new Yarn(out);

        case "MAEK":
            var from = evalExpr();
            if (tokens[++t] != "A") throw new Maus('MISSIN "A"', 204);
            return cast(from, tokens[++t]);

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
    // Variable assignment, definition and evaluation
    //cnsle.log(tokens[t])
    var idf = identify(tokens[t]);

    

    if (idf.length === 1 && idf[0] in global.vars[0].val) {
        //cnsle.log(vars[0].val.g)
        return global.vars[0].val[idf[0]];
    }
    if (idf.length > 1) {
        return global.vars[0].getSlot(idf);
    }



    return parseLit(); //if everything else fails, try to parse a literal
}

function parseLit() {
    if (/^-?(\d+)?$/.test(tokens[t])) return new Numbar(parseInt(tokens[t]));

    if (/^-?[0-9]\d*(\.\d+)?$/.test(tokens[t])) return new Numbar(parseFloat(tokens[t]));
    //cnsle.log(t, tokens[t])
    if (tokens[t] && tokens[t][0] == '"') {
        if (tokens[t].includes(':')) {
            return tokens[t].slice(1, -1);
        }
        return new Yarn(tokens[t].slice(1, -1));
    }

    if (tokens[t] == "NOOB") return new Noob();

    if (tokens[t] == "WIN") return new Troof(true);

    if (tokens[t] == "FAIL") return new Troof(false);

    throw new Maus(tokens[t] + ", WTF?", 202);
}
//global.varscope constructor
function getVarscope() {
    var o = new Bukkit;
    //cnsle.log(this)
    o.val.IT = new Noob();
    return o;

}
//Varscope.prototype.constructor=Bukkit;



//functions to export variables from this module:

function getTokenIdx() {
    return t;
}

function getTokens() {
    return tokens;
}

