const prompt = require("prompt-sync")();
const Maus = require("../err/error");
const { Noob, Troof, Numbr, Numbar, Yarn, Bukkit } = require("./variables");
const validate = require("./name-validator");
const identify = require("./identifier");
//const types = require("./types");
const cast = require("./explicite-casting");
const unescape = require("./unescaper");
module.exports = { interpret, getTokenIdx, getTokens, evalExpr };

//firstly we have to assign all variables globally
var tokens, t, stack = [], layers, version, fncs = [], returnVal = null, OICdepth = 0; idCtr = 0, loopBreak = false;

global.vars = getVarscope();
global.defContext = [];
global.context = [];
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
    if (tokens[0] === "WTF?" || tokens[0] === "O RLY?") OICdepth++;

    for (layer of layers) {

        if (!layer.interpret()) break;
    }
    if (tokens[0] === "OIC") OICdepth--;

    if (t + 1 < tokens.length) {

        throw new Maus("SUPARFLUOS TOKEN", 205);
    }
    // cnsle.log(global.vars)
}

//the context environment interpreter for normal code:

function topLevelCode() {

    return {
        interpret: function () {
            switch (tokens[0]) {
                case "HAI":
                    version = tokens[++t];
                    console.log("Program started! version: " + version + '\n');
                    return false;

                case "KTHXBYE":
                    process.exit();
                    break;

                case "VISIBLE":

                    while (tokens[t + 1] != '!') {
                        //if(t <= (tokens.length )) break;

                        var msg = evalExpr();

                        process.stdout.write(msg.toYarn().val);
                        if (t >= (tokens.length - 1)) break;

                    }

                    if (tokens[t + 1] != '!') process.stdout.write('\n');
                    t++;
                    return false;
                case "GIMMEH":
                    t++;
                    var idf = identify(tokens.slice(1));


                    vars.setSlot(idf, new Yarn(prompt()))
                    t = global.idfIdx;
                    return false;

                case "HOW IZ":
                    t++;
                    var func = new FunctionDeclaraition()

                    if (tokens[1] == "I" && !defContext.length) {
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
                    func.length=func.args.length;
                    layers.unshift(func);

                    return false;
                case "FOUND YR":
                    if (stack.length) {
                        returnVal = evalExpr();
                        return false;
                    }
                    throw new Maus("FOUND YR, WTF?", 202);

                case "GTFO":
                    if (this.isLoop) {
                        loopBreak = true;
                        return false;
                    }

                    if (stack.length) {
                        returnVal = new Noob();
                        return false;
                    }
                    throw new Maus("GTFO, WTF?", 202);

                case "O RLY?":

                    layers.unshift(new IfLayer(vars.val.IT.toTroof().val));
                    return false;

                case "WTF?":
                    layers.unshift(new SwitchLayer(vars.val.IT));
                    return false;

                case "IM IN YR":
                    var label = tokens[1];
                    if (!label) throw new Maus("IM IN YR WHAT", 213);
                    t = 1;
                    layers.unshift(new LoopLayer(label));

                    if (tokens.length < 3) return false;

                    t = 3;
                    layers[0].count = true;
                    if (tokens[2] === "UPPIN") layers[0].by = 1;
                    else if (tokens[2] === "NERFIN") layers[0].b = -1;
                    else throw new Maus("SHALL I UPPIN OR NERFIN?", 214);
                    expect("YR");
                    t = 4;
                    var counter = tokens[4];
                    validate(counter);
                    layers[0].counter = counter;

                    if (tokens.length < 6) return false;

                    t = 5
                    layers[0].conditional = true;
                    if (tokens[5] === "TIL") layers[0].condition = true;
                    else if (tokens[5] === "WILE") layers[0].condition = false;
                    else throw new Maus("TIL OR WILE?", 215);
                    layers[0].expression = tokens.slice(6);
                    t = tokens.length;

                    if (global.extErr) {
                        layers[0].metahead.textline = global.textline;
                        layers[0].metahead.tokensPos = global.tokensPos.slice(6);
                    }
                    return false;

                case "O HAI IM":

                    t = 1;
                    var name = tokens[1];
                    validate(name);
                    global.defContext.unshift(name)
                    vars.val[name] = new Bukkit();
                    layers.unshift(new BukkitLayer());
                    return false;



            }

            var idf = identify(tokens);

            if (global.idfIdx < tokens.length) {
                //t=global.idfIdx;
                switch (tokens[global.idfIdx]) {

                    case "HAS A":

                        t = global.idfIdx;
                        var name = identify(tokens.slice(++t))[0];

                        t = global.idfIdx + 1;
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
                        else if(tokens[t + 1] == "ITZ LIEK A") {
                            t++;
                            var v=evalExpr();
                            if(!(v instanceof Bukkit)) throw new Maus("IZ LIEK BUKKIT",216)
                            var val=v;
                        }
                        else { var val = new Noob(); }


                        idf.push(name);
                        global.vars.setSlot(idf, val, true);
                        return false;

                    case "R":
                        t = global.idfIdx;
                        //var name = identify(tokens.slice(++t));

                        global.vars.setSlot(idf, evalExpr());
                        return false;

                    case "IS NOW A":
                        t = global.idfIdx;

                        var to = cast(global.vars.getSlot(idf), tokens[++t]);
                        //var name = identify(tokens.slice(++t));

                        t = 2;
                        global.vars.setSlot(idf, to);
                        return false;
                    
                }

            }


            t = -1;
            global.vars.val.IT = evalExpr();


        },
        isFunction: false
    }
}
layers = [topLevelCode()];
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
            return new Troof(v1 || v2);

        case "WON OF":
            var v1 = evalExpr().toTroof().val;
            anCheck();
            var v2 = evalExpr().toTroof().val;
            return new Troof(v1 !== v2);

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
        
      
        var isGlobal = true;

        if (idf.length === 0 && tokens[t] === "I") {
            t++;
            var name = tokens[++t];
            if (name in fncs) {
                var func = fncs[name];

            }
            else throw new Maus("NO IZ " + name, 210);

        }
        else {
            isGlobal = false;
            t += global.idfIdx + 3;
            
            var name = tokens[t - 2];
            global.context = global.context.concat(idf);

            var func = vars.getMethod(idf, name);
        }

        var argVals = [];
       if(isGlobal) t++;
       else t--;
       
        for (let i = 0; i < func.length; i++) {
            if (i) expect("AN");
           
            expect("YR");
            t--;

            argVals.push(evalExpr());

            t++;
        }
        if (typeof func == "function") {
            return func(...argVals);
        }
        var me = vars.getSlot(idf);


        var restore = {
            tokens,
            t,
            vars,
            textline: global.textline,
            positions: global.tokensPos
        };
        vars = getVarscope(func.args, argVals);
        if (!isGlobal) vars.val.ME = me;
        layers.unshift(topLevelCode());
        


        layers[0].isFunction = true;

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

        var ret = returnVal || vars.IT;
        returnVal = null;

        tokens = restore.tokens;
        t = restore.t - 1;
        me = vars.val.ME
        vars = restore.vars;
        global.textline = restore.textline;
        global.tokensPos = restore.positions;
        if (!isGlobal) vars.setSlot(idf, me);
        return ret;
    }
    
    if (idf.length === 1 && idf[0] in global.vars.val) {
        //cnsle.log(vars.val.g)

        return global.vars.val[idf[0]];
    }
    if (idf.length > 1) {

        return global.vars.getSlot(idf);

    }
    
    throw new Maus(tokens[t] + ", WTF?", 202)

  
}

function parseLit() {
    if (/^-?(\d+)?$/.test(tokens[t])) return new Numbar(parseInt(tokens[t]));

    if (/^-?[0-9]\d*(\.\d+)?$/.test(tokens[t])) return new Numbar(parseFloat(tokens[t]));

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
    this.length=0;
    this.name = "";
    this.global = false;
    this.meta = [];
    this.id = ++idCtr;

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
                vars.setMethod(this.idf, this.name, this);

            }
            removeLayer(this.id);
        }
        return false;
    }
}

function IfLayer(cond) {
    this.condition = cond;
    this.fulfilled = false;
    this.pass = false;
    this.depth = OICdepth;
    this.id = ++idCtr;

    this.interpret = function () {

        if (this.depth === OICdepth) {
            switch (tokens[0]) {
                case "YA RLY":
                    if (this.condition) {
                        this.pass = true;
                        this.fulfilled = true;
                    }

                    t = 1;
                    return false;

                case "NO WAI":
                    this.pass = false;
                    if (!this.fulfilled) this.pass = true;
                    this.fulfilled = true;
                    t = 1;
                    return false;

                case "MEBBE":
                    this.pass = false;
                    var expr = evalExpr().toTroof().val;
                    if (!this.fulfilled && expr) {
                        this.pass = true;
                        this.fulfilled = true;
                    }
                    return false;

                case "OIC":

                    removeLayer(this.id);
                    t = 1;

                    return false;
            }
        }
        if (!this.pass) t = tokens.length;
        return this.pass;



    }
}

function SwitchLayer(val) {
    this.teminated = false;
    this.value = val;
    this.fulfilled = false;
    this.depth = OICdepth;
    this.id = ++idCtr;

    this.interpret = function () {


        if (this.depth === OICdepth) {

            switch (tokens[0]) {
                case "OMG":

                    t = 1;

                    var val = parseLit();
                    if (!val) throw new Maus("MISSING VALUE", 211);

                    t = 2;
                    if (val.val === this.value.val) this.fulfilled = true;


                    return false;

                case "OMGWTF":
                    t = 1
                    this.fulfilled = true;
                    return false;

                case "GTFO":

                    if (this.fulfilled) this.terminated = true;
                    t = 1;
                    return false;

                case "OIC":

                    removeLayer(this.id);

                    t = 1;
                    return false;

            }

        }
        if (this.terminated || !this.fulfilled) t = tokens.length;
        return !this.terminated && this.fulfilled;
    }
}

function LoopLayer(lab) {
    this.label = lab;
    this.id = ++idCtr;
    this.lines = [];
    this.meta = [];
    this.metahead = {};

    this.interpret = function () {
        if (tokens[0] === "IM OUTTA YR" && tokens[1] === this.label) {
            t = 2;



            layers.unshift(topLevelCode());


            layers[0].isLoop = true;

            

            if (this.count) vars.val[this.counter] = new Numbr(0);

            while (keepRunning(this)) {

                for (let i = 0, len = this.lines.length; i < len; i++) {
                    if (global.extErr) {
                        global.textline = this.meta[i].textline;
                        global.tokensPos = this.meta[i].tokensPos;
                    }
                    t = 0;
                    interpret(this.lines[i]);
                    if (returnVal || loopBreak) break;
                }
                if (returnVal || loopBreak) break;

                if (this.count) vars.val[this.counter].val += this.by;
            }
            loopBreak = false;
            if (this.count) delete vars.val[this.counter];

            removeLayer(this.id);

        }
        this.lines.push(tokens);
        if (global.extErr) this.meta.push({ textline: global.textline, tokensPos: global.tokensPos })
        t = tokens.length;
        return false;

        function keepRunning(self) {
            
                            if (self.conditional) {
            
                                if (global.extErr) {
                                    global.textline = self.metahead.textline;
                                    global.tokensPos = self.metahead.tokensPos;
                                }
                                tokens = self.expression;
                                t = -1;
            
            
                                return evalExpr().toTroof().val != self.condition;
                            }
                            return true;
                        }
    }
}

function BukkitLayer() {
    this.id = ++idCtr;
    this.interpret = function () {
        if (tokens[0] !== "KTHX") return true;
        t = 1;
        removeLayer(this.id);
        defContext.shift();
        return false;
    }
}

function removeLayer(id) {


    //if (layers[0].id !== id) throw new Maus("UNTERMINATED STATEMENT", 212);

    while (layers[0].id !== id) layers.shift();
    layers.shift();
}

function expect(tok) {

    if (tokens[t] !== tok) throw new Maus("EXPECTED " + tok, 207);
    t++;
}


function getTokenIdx() {
    return t;
}


function getTokens() {
    return tokens;
}

