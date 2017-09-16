const allowed = [
    "NOOB",
    "TROOF",
    "NUMBR",
    "NUMBAR",
    "YARN",
    "BUKKIT",

]

module.exports = function (type) {
    var p = allowed.indexOf(type.toUpperCase());
    // type=type.toUpperCase()
    if (p >= 0) return allowed[p];
    throw new Maus("WHICH TYPE IS THIS", 203)
}