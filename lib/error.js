
//global.extErr="fffff"
//console.log(global.extErr);
//const interpreter=re

class Maus {
    constructor(msg, code, offset=0, totalOffset = false) {

        this.msg = msg;
        this.code = code;
        this.offset = offset;
        this.totalOffset = totalOffset;
    }

    toString() {

        var out = `\n\n    YR CODE MAKED A MAUS\n
                      _..----.._
                    ./   .--.   "-.(0)_
        -..__..'''=[|   ´ _)_ \\__  . c\\'-..
                     \\,,------,---,,---'-"

        
    `+ this.msg + '\n';


        if (global.extErr) {
            

            const interpreter = require("./interpreter");
            out += ("\n    " + global.textline + "\n    ");
            var charIdx = this.totalOffset ? this.offset : (global.tokensPos[interpreter.getTokenIdx()] + this.offset);
            //console.log("XXX", charIdx,global.tokensPos);
            out += (' '.repeat(charIdx) + '^');
        }
        return out;
        //return " LAIN "+this.line+":"+this.col+"\n"+this.msg;
    }

}
module.exports = Maus;