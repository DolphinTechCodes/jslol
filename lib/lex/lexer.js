

const keywords = require("./keywords");
const Maus = require("../err/error");
const interpret = require("../run/interpreter").interpret;



module.exports = parse;
var i, tokens = [], inMLcomment = false;

global.tokensPos = [];


function parse(sourcecode) {

    function softbreak() {

        tokens.push(token.slice(0, -1));
        token = ""
        if (!tokens[tokens.length - 1].length) tokens.pop();

        if (!inMLcomment) interpret(tokens);
        tokens = [];
        global.tokensPos = [];

    }


    var textlines = sourcecode.replace("\r\n", "\n").replace("\r", "\n").split("\n"); // Split the lines of the sourcecode by line breaks
    for (i = 0; i < textlines.length; i++) {
        if (textlines[i].match(/^[\s]*HAI($|\s)/)) break;
    }

    if ((i + 1) >= textlines.length) throw new Maus("WHER IS MY PROGAM?", 101)


    for (i; i < textlines.length; i++) {

        textline = textlines[i];
        global.textline = textline;

        var token = "";

        var c = 0;


        var inWord = false;

        while (c < textline.length) {

            if (/\s/.test(textline[c])) {

                c++;
                continue;
            }
            else if (textline[c] == '"') {

                var nextQuotes = textline.indexOf('"', c + 1);
                var escapeChar = textline.indexOf(':', c);
                //gonna fix this later
                if (nextQuotes != -1 && (escapeChar == -1 || nextQuotes < escapeChar)) {


                }
                else {


                    nextQuotes = c + 1;
                    do {

                        if (textline[nextQuotes] == ':') nextQuotes++;
                        nextQuotes++;
                        if (!textline[nextQuotes]) throw new Maus("WHER R MY QUOTS?", 102, c, true)

                    } while (textline[nextQuotes] && textline[nextQuotes] != '"')

                }
                if (!inMLcomment) {
                    global.tokensPos.push(c);

                    tokens.push(textline.slice(c, nextQuotes + 1));
                }
                c = nextQuotes + 1;
            }
            else if (/\w|!|,|-/.test(textline[c])) {
                inWord = true;
                var inWord_ = true;
                while (c < textline.length && ((inWord && inWord_) || (keywords.possible(token)))) {

                    //console.log(c, token, keywords.possible(token), (inWord && inWord_))
                    inWord_ = inWord;
                    if (textline[c] && !/\s/.test(textline[c])) {
                        inWord = true;
                        token += textline[c];

                        if (textline[c] == ',') {

                            softbreak();

                        }

                    }

                    else {
                        if (inWord) token += ' '
                        inWord = false;
                        //console.log(inWord)
                    }

                    c++;
                    //console.log("l",token, keywords.possible(token),inWord , inWord_)
                }
                //console.log(token, c, inWord, inWord_)
                //console.log("with:"+token+"without:"+token.slice(0, -1),inWord,inWord_)
                if (!inWord_ && !keywords.check(token)) { token = token.slice(0, -1); c--; }
                var trimmed = token.trim()
                if (trimmed == "BTW") break;
                if (trimmed == "OBTW") inMLcomment = true;
                if (trimmed == "TLDR") { inMLcomment = false; break; }
                if (!inMLcomment && keywords.check(trimmed) && trimmed.length) {
                    tokens.push(trimmed);


                }
                else if (trimmed.length && !inMLcomment) {

                    tokens.push(...trimmed.split(' '));


                }

                if (tokens.length) global.tokensPos.push(c - (tokens[tokens.length - 1].length) - 1);
                token = "";

            }
            else if (textline[c] == ',') {

                lines.push(tokens);
                tokens = [];

            }

            else {

                if (textline[c++] != '.') throw new Maus("WTF DAT SYMBOL!", 103, c - 1, true);
            }


        }

        if (!(global.textline.match(/\.\.\.\s*$|\u2026\s*$/))) {


            if (tokens.length) {

                interpret(tokens);
            }

            tokens = [];
            global.tokensPos = [];
        }
        else if (tokens.length) {

            tokens[tokens.length - 1] = tokens[tokens.length - 1].replace(/\.\.\.$|\u2026$/, "");
        }

    }



}

