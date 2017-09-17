const Maus = require("./error");
const { Noob, Troof, Numbr, Numbar, Yarn, Bukkit } = require("./variables");

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




    Noob2Numbr: function (v) {
        return new Numbr(0);
    },

    Noob2Numbar: function (v) {
        return new Numbar(0);
    },

    Noob2Yarn: function (v) {
        return new Yarn("");
    },

    Noob2Bukkit: function (v) {
        return new Bukkit();
    },




    Troof2Bukkit: function (v) {
        return new Bukkit();
    },




    Numbr2Bukkit: function (v) {
        return new Bukkit();
    },




    Numbar2Yarn: function (v) {
        return new Yarn(v.val.toString());
    },

    Numbar2Bukkit: function (v) {
        return new Bukkit();
    },

    Yarn2Noob: function (v) {
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

    Yarn2Bukkit: function (v) {
        return new Bukkit();
    },



    Bukkit2Noob: function (v) {

        return new Noob();
    },

    Bukkit2Troof: function (v) {

    },

    Bukkit2Numbr: function (v) {

    },

    Bukkit2Numbar: function (v) {

    },

    Bukkit2Yarn: function (v) {

    },

    Bukkit2Bukkit: function (v) {
        return v;
    }



}