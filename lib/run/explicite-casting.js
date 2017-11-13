const Maus = require("../err/error");
const { Troof, Numbr, Numbar, Yarn, Bukkit } = require("./variables");

module.exports = function (from, to = "NOOB") {

    to = to.toLowerCase();
    if (!["noob", "troof", "numbr", "numbar", "yarn", "bukkit"].includes(to)) throw new Maus("WHICH TYPE IS THIS", 203);

    to = to[0].toUpperCase() + to.slice(1);

    if (funcs[from.constructor.name + '2' + to]) {
        return funcs[from.constructor.name + '2' + to](from);
    }
    return from["to" + to]();

}

const funcs = {




    Noob2Numbr: function () {
        return new Numbr(0);
    },

    Noob2Numbar: function () {
        return new Numbar(0);
    },

    Noob2Yarn: function () {
        return new Yarn("");
    },

    Noob2Bukkit: function () {
        return new Bukkit();
    },




    Troof2Bukkit: function () {
        return new Bukkit();
    },




    Numbr2Bukkit: function () {
        return new Bukkit();
    },




    Numbar2Yarn: function (v) {
        return new Yarn(v.val.toString());
    },

    Numbar2Bukkit: function () {
        return new Bukkit();
    },

    Yarn2Noob: function () {
        return new Noob();
    },





    Yarn2Numbr: function (v) {
        var num = parseInt(v.val);
        if (Number.isNaN(num)) return new Numbr(0);
        return new Numbr(num);
    },

    Yarn2Numbar: function (v) {
        var num = parseFloat(v.val);
        if (Number.isNaN(num)) return new Numbar(0);
        return new Numbar(num);
    },

    Yarn2Bukkit: function () {
        return new Bukkit();
    },



    Bukkit2Noob: function () {

        return new Noob();
    },

    Bukkit2Troof: function () {
        return new Troof(true);
    },

    Bukkit2Numbr: function () {
        return new Numbr(0);
    },

    Bukkit2Numbar: function () {
        return new Numbar(0);
    },

    Bukkit2Yarn: function () {
        return new Yarn("");
    },

    Bukkit2Bukkit: function (v) {
        return v;
    }



}