module.exports=function(idf){

    if(idf.startsWith("SRC ")) idf=global.vars[0].getSlot(module.exports(idf.slice(3)));

    idf=idf.split("'Z ")
    return idf;
}