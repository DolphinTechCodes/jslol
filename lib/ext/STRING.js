const { Noob, Troof, Numbr, Numbar, Yarn, Bukkit } = require("../run/variables");

module.exports = {
    val: {},

    fncs: {

        CHARCODEATIN: function (str, n) {
            return new Numbr(str.toYarn().val.charCodeAt(n.toNumbr().val));
        },

        CHARATIN: function (str, n) {
            return new Yarn(str.toYarn().val.charAt(n.toNumbr().val));
        },

        FROMCHARCODEIN: function (n) {
            return new Yarn(String.fromCharCode(n.toNumbr().val));
        },

        FROMCODEPOINTIN: function (n) {
            return new Yarn(String.fromCodePoint(n.toNumbr().val));
        },

        CODEPOINTATIN: function (str, n) {
            return new Numbr(str.toYarn().val.codePointAt(n.toNumbr().val));
        },

        //left out String.concat

        INCLUDESIN: function (str, s2) {
            return new Troof(str.toYarn().val.includes(s2.toYarn().val));
        },

        ENDSWITHIN: function (str, s2) {
            return new Troof(str.toYarn().val.endsWith(s2.toYarn().val));
        },

        INDEXOFIN: function (str, s2) {
            return new Numbr(str.toYarn().val.indexOf(s2.toYarn().val));
        },

        LASTINDEXOFIN: function (str, s2) {
            return new Numbr(str.toYarn().val.lastIndexOf(s2.toYarn().val));
        },

        //left out String.localeCompare

        //left out String.match

        NORMALIZEIN: function (str, form) {
            return new Yarn(str.toYarn().val.normalize(form.toYarn().val));
        },

        //left out String.padEnd

        //left out String.padStart

        REPEATIN: function (str, n) {
            return new Yarn(str.toYarn().val.repeat(n.toNumbr().val));
        },

        REPLACEIN: function (str, s) {
            return new Yarn(str.toYarn().val.replace(s.toYarn().val));
        },

        SEARCHIN: function (str, s) {
            return new Yarn(str.toYarn().val.search(s.toYarn().val));
        },

        SLICEIN: function (str, p1, p2) {
            return new Yarn(str.toYarn().val.slice(p1.toNumbr().val, p2.toNumbr().val));
        },

        //left out String.split

        STARTSWITHIN: function (str, s2) {
            return new Troof(str.toYarn().val.startsWith(s2.toYarn().val));
        },

        SUBSTRINGIN: function (str, p1, p2) {
            return new Yarn(str.toYarn().val.substring(p1.toNumbr().val, p2.toNumbr().val));
        },

        //left out String.toLocaleUpperCase

        //left out String.toLocaleLowerCase

        TOLOWERCASEIN: function (str) {
            return new Yarn(str.toYarn().val.toLowerCase());
        },

        //left out String.toSource

        //left out String.toString

        TOUPPERCASEIN: function (str) {
            return new Yarn(str.toYarn().val.toUpperCase());
        },

        TRIMIN: function (str) {
            return new Yarn(str.toYarn().val.trim());
        },

        //left out String.trimLeft

        //left out String.trimRight

        //left out String.valueOf
    }
}