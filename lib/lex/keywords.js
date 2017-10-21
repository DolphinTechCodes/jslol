module.exports = { possible, check };

const keywords = [
    //"HAI",
    //"KTHXBYE",
    "HAS A",
    "ITZ A",
    "ITZ LIEK",
    //"ITZ",
    //"R",
    //"AN",
    "SUM OF",
    "DIFF OF",
    "PRODUKT OF",
    "QUOSHUNT OF",
    "MOD OF",
    "BIGGR OF",
    "SMALLR OF",
    "BOTH OF",
    "EITHER OF",
    "WON OF",
    //"NOT",
    "ALL OF",
    //"ANY OF",
    //"MKAY",
    //"WIN",
    //"FAIL",
    //"NOOB",
    "BOTH SAEM",
    //"DIFFRINT",
    //"SMOOSH",
    //"MAEK",
    //"A",
    "IS NOW A",
    //"VISIBLE",
    //"GIMMEH",
    "O RLY?",
    "YA RLY",
    "NO WAI",
    //"OIC",
    //"MEBBE",
    //"WTF?",
    //"OMG",
    //"OMGWTF",
    //"GTFO",
    "IM IN YR",
    "IM OUTTA YR",
    //"YR",
    //"TIL",
    //"WILE",
    //"UPPIN",
    //"NERFIN",
    "HOW IS I",
    "IF U SAY SO",
    "FOUND YR",
    "I IZ",
];

function possible(token) {
    token = token.trim();
    for (elem of keywords) {
        if (elem == token) return false;
        if (elem.startsWith(token)) return true;

    }
    //if() return true;
    //console.log(token.endsWith("'Z"))
    return false;

}

function check(token) {
    return keywords.includes(token);
}
