const Maus = require("../err/error");

module.exports = function (tokens) {

    var idf = [];
    var i = 0;
    global.idfIdx = 0;
    do {

        if (tokens[i]) idf.push(tokens[i].replace(/'Z$/, ""));

        global.idfIdx++;


    } while (tokens[i] && (tokens[i++].endsWith("'Z") || tokens[i] == "SRS"))
    //console.log("bef "+idf);
    var i = global.idfIdx;
    if (idf[0] == "SRS") idf = module.exports(global.vars.getSlot(idf.slice(1)).toYarn().val.split(/\s+/));
    global.idfidx = i;
    //console.log("aft "+idf)
    if (idf[0] == "I") idf.shift();
    return idf;
}

