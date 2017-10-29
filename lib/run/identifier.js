const Maus = require("../err/error");

module.exports = function (tokens,called=false) {

    var idf = [];
    var i = 0;
    if(!called) global.idfIdx = 0;
    do {
        
        if (tokens[i]) idf.push(tokens[i].replace(/'Z$/, ""));

        if(!called) global.idfIdx++;

      
    } while (tokens[i] && (tokens[i++].endsWith("'Z") || tokens[i-1] === "SRS"))
  
    
    if (idf[0] === "SRS") idf = module.exports(global.vars.getSlot(idf.slice(1)).toYarn().val.split(/\s+/),true);
   
    
    if (idf[0] === "I") idf.shift();
    return idf;
}

