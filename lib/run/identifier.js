module.exports = function (tokens, called = false) {

    var idf = [];
    var i = 0;
    if (!called) global.idfIdx = 0;
    do {
      
       
        if (tokens[i] === "SRS") {
            
            var idx=global.idfIdx;
            var tmp= module.exports(global.vars.getSlot(module.exports(tokens.slice(i + 1), false)).toYarn().val.split(/\s+/), true);
          
            global.idfIdx+=idx+1;
            idf=idf.concat(tmp);
            break;
        }
        if (tokens[i]) idf.push(tokens[i].replace(/'Z$/, ""));

        if (!called) global.idfIdx++;
        
       

    } while (tokens[i] && (tokens[i++].endsWith("'Z") || tokens[i - 1] === "SRS"))





    if (idf[0] === "I") {
        idf.shift();
        idf = global.defContext.concat(idf)
    }
   
    return idf;
}

