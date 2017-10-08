const Maus = require("../err/error");


module.exports = function (name) {
    //var vars = r equire("./interpreter").getVars()[0];
    if(!name) throw new Maus("CAN HAS WHAT",204)

    if (!name.toString) throw new Maus("CAN HAS WHAT",401);

    if (/^\d|^_|\W+/.test(name)) throw new Maus("INVALID VAR NAME",402);

    //if (name in vars) throw new MAUS(name + " EXISTS ALREADY",403);

    return true;    
}