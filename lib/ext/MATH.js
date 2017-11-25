const { Noob, Troof, Numbr, Numbar, Yarn, Bukkit } = require("../run/variables");

module.exports={
    val:{ 
        E:new Numbar(Math.E),
        LN2:new Numbar(Math.LN2),
        LN10:new Numbar(Math.LN10),
        LOG2E:new Numbar(Math.LOG2E),
        LOG10E:new Numbar(Math.LOG10E),
        PI:new Numbar(Math.PI),
        SQRT1_2:new Numbar(Math.SQRT1_2),
        SQRT2:new Numbar(Math.SQRT2),

        get RANDOM() {
            return new Numbar(Math.random());
        }

    },
    fncs:{

        ABSIN:function(x) {
            return new Numbar(Math.abs(x.toNumbar().val));
        },
              
        ACOSIN:function(x) {
            return new Numbar(Math.acos(x.toNumbar().val));
        },
              
        ACOSHIN:function(x) {
            return new Numbar(Math.acosh(x.toNumbar().val));
        },
              
        ASININ:function(x) {
            return new Numbar(Math.asin(x.toNumbar().val));
        },
              
        ASINHIN:function(x) {
            return new Numbar(Math.asinh(x.toNumbar().val));
        },
              
        ATANIN:function(x) {
            return new Numbar(Math.atan(x.toNumbar().val));
        },
              
        ATANHIN:function(x) {
            return new Numbar(Math.antanh(x.toNumbar().val));
        },
              
        ATAN2IN:function(x,y) {
            return new Numbar(Math.atan2(x.toNumbar().val),Math.atan2(y.toNumbar().val));
        },
              
        CBRTIN:function(x) {
            return new Numbar(Math.cbrt(x.toNumbar().val));
        },
              
        CEILING:function(x) {
            return new Numbr(Math.ceil(x.toNumbar().val));
        },
              
        CLZ32:function(x) {
            return new Numbar(Math.clz32(x.toNumbar().val));
        },
              
        COSIN:function(x) {
            return new Numbar(Math.cos(x.toNumbar().val));
        },
              
        COSHIN:function(x) {
            return new Numbar(Math.cosh(x.toNumbar().val));
        },

        EXPIN:function(x) {
            return new Numbar(Math.exp(x.toNumbar().val));
        },
              
        EXPM1IN:function(x) {
            return new Numbar(Math.expm1(x.toNumbar().val));
        },
              
        FLOORIN:function(x) {
            return new Numbr(Math.floor(x.toNumbar().val));
        },
              
        FROUNDIN:function(x) {
            return new Numbar(Math.fround(x.toNumbar().val));
        },
              
        IMULIN:function(x) {
            return new Numbar(Math.imul(x.toNumbar().val));
        },
              
        LOGIN:function(x) {
            return new Numbar(Math.log(x.toNumbar().val));
        },
              
        LOG1PIN:function(x) {
            return new Numbar(Math.log1p(x.toNumbar().val));
        },
              
        LOG10IN:function(x) {
            return new Numbar(Math.log10(x.toNumbar().val));
        },
              
        LOG2IN:function(x) {
            return new Numbar(Math.log2(x.toNumbar().val));
        },
              
        POWIN:function(x) {
            return new Numbar(Math.pow(x.toNumbar().val));
        },

        RANDOMIN:function() {
            return new Numbar(Math.random());
        },

        ROUNDIN:function(x) {
            return new Numbr(Math.round(x.toNumbar().val));
        },

        SIGNIN:function(x) {
            return new Numbar(Math.sign(x.toNumbar().val));
        },

        SININ:function(x) {
            return new Numbar(Math.sin(x.toNumbar().val));
        },

        SINHIN:function(x) {
            return new Numbar(Math.sinh(x.toNumbar().val));
        },

        SQRTIN:function(x) {
            return new Numbar(Math.sqrt(x.toNumbar().val));
        },

        TANIN:function(x) {
            return new Numbar(Math.tan(x.toNumbar().val));
        },

        TANHIN:function(x) {
            return new Numbar(Math.tanh(x.toNumbar().val));
        },

        TOSOURCIN:function() {
            return new Yarn("Did you really just call this method to see if it's there?");
        },

        TRUNCIN:function(x) {
            return new Numbr(Math.trunc(x.toNumbar().val));
        }       
    }
}