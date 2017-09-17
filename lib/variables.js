const Maus = require = ("./error");



class Variable {
    constructor() {}

    toNoob() { return new Noob(); }

    toTroof() { throw new Maus("COULD NOT MAEK " + this.constructor.name + " : " + this.val + " IMPLICIT A TROOF",301); }

    toNumbr() { throw new Maus("COULD NOT MAEK " + this.constructor.name + " : " + this.val + " IMPLICIT A NUMBR",302); }

    toNumbar() { throw new Maus("COULD NOT MAEK " + this.constructor.name + " : " + this.val + " IMPLICIT A NUMBAR",303); }

    toYarn() { throw new Maus("COULD NOT MAEK " + this.constructor.name + " : " + this.val + " IMPLICIT A YARN",304); }

    toBukkit() { throw new Maus("COULD NOT MAEK " + this.constructor.name + " : " + this.val + " IMPLICIT A BUKKIT",305); }

}

class Noob extends Variable {
    constructor() {
        super();
        this.val = "NOOB";

    }
    toTroof() {
        return new Troof(false);
    }

}


class Troof extends Variable {
    constructor(bool = false) {
        super();
        this.val = bool ? true : false;

    }

    toTroof() {
        return this;
    }

    toNumbr() {
        return new Numbr(this.val ? 1 : 0);
    }

    toNumbar() {
        return new Numbar(this.val ? 1 : 0);
    }

    toYarn() {
        return new Yarn(this.val ? "WIN" : "FAIL");
    }
}


class Numbr extends Variable {
    constructor(val = 0) {
        super();
        this.val = val;
    }

    toTroof() {
        return new Troof(this.val);
    }

    toNumbr() {
        return this;
    }

    toNumbar() {
        return new Numbar(this.val);
    }

    toYarn() {
        return new Yarn(this.val)
    }
}



class Numbar extends Variable {
    constructor(val = 0) {
        super();
        this.val = val;
    }

    toTroof() {
        return new Troof(this.val);
    }

    toNumbr() {
        return new Numbr(Math.floor(this.val));
    }

    toNumbar() {
        return this;
    }

    toYarn() {
        return new Yarn((Math.floor(this.val*100))/100)
        //return new Yarn(this.val.toString());
    }
}



class Yarn extends Variable {

    constructor(str = "") {
        super();
        this.val = str.toString();
    }

    toTroof() {
        return new Troof(this.val);
    }

    toNumbr() {
        var v = parseInt(this.val);
        if (Number.isNaN(v)) throw new Maus("COULD NOT MAEK " + this.val + " IMPLICIT A NUMBR",306);
        return new Troof(this.val);
    }

    toNumbar() {
        var v = parseFloat(this.val);
        if (Number.isNaN(v)) throw new Maus("COULD NOT MAEK " + this.val + " IMPLICIT A NNUMBAR",307);
        return new Troof(this.val);
    }

    toYarn() {
        return this;
    }
}

class Bukkit extends Variable {
    constructor(val = {}) {
        super();
        this.val = {};
        
    }

    toTroof() {
        for (p in this.val) {
            return new Troof(true);
        }
        return new Troof(false);
    }

    /*
    toNumbr() {
        return new Numbr(Math.floor(this.val));
    }

    toNumbar() {
        return this;
    }
*/
    toYarn() {
        return new Yarn(this.val.toString());
    }

    getProp(p=[]) {
        if(this.val[p[0]]) {
            if(this.val[p[0]] instanceof Bukkit) {
                return this.val[p[0]].getProp(p.slice(1));
            }
            else {
                return this.val[p[0]];
            }
        }
        else{
            throw new Maus("SLOT "+p[0] +" NOT EXISTS",205);
        }
    }
}
//console.log(new Yarn("hello"))
module.exports = { Noob, Troof, Numbr, Numbar, Yarn, Bukkit };
