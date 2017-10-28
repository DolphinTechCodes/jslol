const prompt = require("prompt-sync")();
const Maus = require("../err/error");
const { Noob, Troof, Numbr, Numbar, Yarn, Bukkit } = require("./variables");
const validate = require("./name-validator");
const identify = require("./identifier");
const types = require("./types");
const cast = require("./explicite-casting");
const unescape = require("./unescaper");
module.exports = { interpret, getTokenIdx, getTokens, evalExpr };

//firstly we have to assign all variables globally
var tokens, t, stack = [], layers, version, fncs = [], returnVal = null;

global.vars = getVarscope();
/*
we will make use of listed context environment interpreters
to interpret different code contexts (e.g:normal code, IF/THEN or LOOPS)
they are stored in the array ctx and the first gets executed every time 
there is a new list of tokens available
*/



function interpret(tokens_) {
    tokens = tokens_;
    t = 0;

    //Interpret normal code
    for (layer of layers) {

        if (!layer.interpret()) break;
    }


    if (t + 1 < tokens.length) {

        throw new Maus("SUPARFLUOS TOKEN", 205);
    }
    // cnsle.log(global.vars)
}

//the context environment interpreter for normal code:
var topLevelCode = {
    interpret: function () {


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

                    var msg = evalExpr();

                    process.stdout.write(msg.toYarn().val);
                    if (t >= (tokens.length - 1)) break;
                    //cnsle.log()

                    //cnsle.log(t,tokens[t])
                }

                if (tokens[t + 1] != '!') process.stdout.write('\n');
                return;
            case "GIMMEH":
                t++;
                var idf = identify(tokens.slice(1));


                vars.setSlot(idf, new Yarn(prompt()))
                t = global.idfIdx;
                return;

            case "HOW IZ":
                t++;
                var func = new FunctionDeclaraition()

                if (tokens[1] == "I") {
                    func.global = true;
                    t++;
                }
                else {
                    func.idf = identify(tokens.slice(1));
                    t = global.idfIdx + 1;
                    
                }
                var name = tokens[t];

                validate(name, true);
                func.name = name;

                t++;

                while (t < tokens.length - 1) {
                    if (func.args.length) expect("AN");
                    expect("YR");
                    var arg = tokens[t];
                    validate(arg);
                    if (func.args.includes(arg)) throw new Maus("GOT ALREADY " + arg, 209);
                    func.args.push(arg);
                    t++;
                }
                layers.unshift(func);

                return false;
            case "FOUND YR":
                if (this.isFunction) {
                    returnVal = evalExpr();
                    return false;
                }
                else throw new Maus("FOUND YR, WTF?", 202);

            case "GTFO":
            if (this.isFunction) {
                returnVal = new Noob();
                return false;
            }
            else throw new Maus("GTFO, WTF?", 202);
            
        }

        var idf = identify(tokens);

        if (global.idfIdx < tokens.length) {
            //t=global.idfIdx;
            switch (tokens[global.idfIdx]) {

                case "HAS A":

                    t = global.idfIdx;
                    var name = identify(tokens.slice(++t));
                    validate(name);


                    if (tokens[t + 1] == "ITZ") {
                        t++;
                        var val = evalExpr();
                    }
                    else if (tokens[t + 1] == "ITZ A") {
                        t += 2;
                        var val = cast(new Noob(), tokens[t]);
                        t++;

                    }
                    else { var val = new Noob(); }


                    idf.push(name);
                    global.vars.setSlot(idf, val, true);
                    return;

                case "R":
                    t = global.idfIdx;
                    //var name = identify(tokens.slice(++t));

                    global.vars.setSlot(idf, evalExpr());
                    return;

                case "IS NOW A":
                    t = global.idfIdx;

                    var to = cast(global.vars.getSlot(idf), tokens[++t]);
                    //var name = identify(tokens.slice(++t));

                    t = 2;
                    global.vars.setSlot(idf, to);
                    return;

            }

        }


        t = -1;
        global.vars.val.IT = evalExpr();


    },
    isFunction:false
}
layers = [topLevelCode];
function evalExpr(explicite = false) {

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

    var tryLit = parseLit();
    if (tryLit) return tryLit;


    var idf = identify(tokens.slice(t));

    t += global.idfIdx - 1;

    if (tokens[t + 1] === "IZ") {

        if (idf.length === 0 && tokens[t] === "I") {
            t++;
            var name = tokens[++t];
            if (name in fncs) {
                var func = fncs[name];

            }
            else throw new Maus("NO IZ " + name, 210);

        }
        else{
            
            console.log(tokens)
            
            t = global.idfIdx + 3;
            
            var name=tokens[t];
           
            var func=vars.getMethod(idf,name);
        }

        var argVals = [];
        t++;
        for (let i = 0; i < func.args.length; i++) {

            if (i) expect("AN");
            expect("YR");
            t--;

            argVals.push(evalExpr());

            t++;
        }
        if (typeof fncs.fnc == "function") {
            return fncs.fnc(...argVals);
        }

        var restore = {
            tokens,
            t,
            vars,
            textline: global.textline,
            positions: global.tokensPos
        };
        vars = getVarscope(func.args, argVals);
        layers.unshift(topLevelCode);
        layers[0].isFunction=true;
        stack.push(name);
        returnVal = null;
        for (let i = 0, len = func.fnc.length; i < len; i++) {
            
            if (global.extErr) {
                global.textline = func.meta[i].line;
                global.tokensPos = func.meta[i].indezies;
            }
            interpret(func.fnc[i]);
            if (returnVal) break;


        }
        
        stack.pop();
        returnVal = returnVal || vars.IT;

        tokens = restore.tokens;
        t = restore.t-1;
        vars = restore.vars;
        global.textline = restore.textline;
        global.tokensPos = restore.positions;

        return returnVal;
    }

    if (idf.length === 1 && idf[0] in global.vars.val) {
        //cnsle.log(vars.val.g)

        return global.vars.val[idf[0]];
    }
    if (idf.length > 1) {

        return global.vars.getSlot(idf);

    }

    throw new Maus(tokens[t] + ", WTF?", 202)

    //return parseLit();
}

function parseLit() {
    if (/^-?(\d+)?$/.test(tokens[t])) return new Numbar(parseInt(tokens[t]));

    if (/^-?[0-9]\d*(\.\d+)?$/.test(tokens[t])) return new Numbar(parseFloat(tokens[t]));
    //cnsle.log(t, tokens[t])
    if (tokens[t] && tokens[t][0] == '"') {
        if (tokens[t].includes(':')) {
            return new Yarn(unescape(tokens[t].slice(1, -1)));
        }
        return new Yarn(tokens[t].slice(1, -1));
    }

    if (tokens[t] == "NOOB") return new Noob();

    if (tokens[t] == "WIN") return new Troof(true);

    if (tokens[t] == "FAIL") return new Troof(false);


}
//global.varscope constructor
function getVarscope(args = [], vals = []) {
    var o = new Bukkit;
    //cnsle.log(this)
    o.val.IT = new Noob();
    for (let i = 0; i < args.length; i++) {
        o.val[args[i]] = vals[i];
    }
    return o;

}

function FunctionDeclaraition() {
    this.fnc = [];
    this.args = [];
    this.name = "";
    this.global = false;
    this.meta = [];

    this.interpret = function () {
        if (tokens[0] !== "IF U SAY SO") {
            this.fnc.push(tokens);
            t = tokens.length;
            if (global.extErr) {
                this.meta.push({ line: global.textline, indezies: global.tokensPos })
            }

        }
        else {
            if (this.global) {
                fncs[this.name] = this;
            }
            else {
                vars.setMethod(this.idf,this.name,this);

            }
            layers.shift();
        }
        return false;
    }
}

function expect(tok) {

    if (tokens[t] !== tok) throw new Maus("EXPECTED " + tok, 207);
    t++;
}


function getTokenIdx() {
    return t;
}

function setTokenIdx(t_) {
    t = t_;
}

function getTokens() {
    return tokens;
}

