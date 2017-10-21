const Maus = require("../err/error");

module.exports = function (tokens) {
    //console.log(tokens)
    var idf = [];
    var i = 0;
    global.idfIdx=0;
    do {
        
        idf.push(tokens[i]?tokens[i].replace(/'Z$/,""):"LOOL");
        global.idfIdx++;
               

    } while (tokens[i] && tokens[i++].endsWith("'Z"))

    if(idf[0]=="SRS") idf=module.exports(global.vars[0].getSlot(idf.slice(1)));
    return idf
}

