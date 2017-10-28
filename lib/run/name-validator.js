const Maus = require("../err/error");


module.exports = function (name, fnc = false) {
    //var vars = r equire("./interpreter").getVars()[0];
    if (!name) throw new Maus(fnc?"I IZ WHAT?":"CAN HAS WHAT?", fnc?208:204)

    if (!name.toString()) throw new Maus(fnc?"I IZ WHAT?":"CAN HAS WHAT", fnc?208:401);

    if (/^\d|^_|\W+/.test(name)) throw new Maus(fnc?"INVALID FUNCTION NAME":"INVALID VAR NAME", fnc?208:402);

    //if (name in vars) throw new MAUS(name + " EXISTS ALREADY",403);

    return true;
}