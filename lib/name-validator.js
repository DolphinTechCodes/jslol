const Maus = require("./error");


module.exports = function (name) {
    var vars = require("./interpreter").getVars()[0];

    if (!name.toString) throw new Maus("CAN HAS WHAT");

    if (/^\d|^_|\W+/.test(name)) throw new Maus("INVALID VAR NAME");

    if (name in vars) throw new MAUS(name + " EXISTS ALREADY");

    return true;    
}