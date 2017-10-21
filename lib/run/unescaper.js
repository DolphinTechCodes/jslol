const Maus = require("../err/error");

module.exports = function (raw) {
    //onsole.log("escaping " + raw);
    var str = "";
    for (let i = 0; i < raw.length; i++) {
        if (raw[i] == ':') {
            i++;
            switch (raw[i]) {
                case ')':
                    str += '\n';
                    break;

                case '>':
                    str += '\t';
                    break;

                case 'o':
                    str += '\u0007';
                    break;

                case '"':
                    str += '"';
                    break;

                case ':':
                    str += ':';
                    break;

                case '(':
                    var len = raw.indexOf(')', i);
                    var charcode = parseInt(raw.slice(i + 1, len), 16);
                    if (Number.isNaN(charcode) || len < 0) throw new Maus("INVALID ESCAPE SYNTAX", 206, i + 2);
                    str += String.fromCodePoint(charcode);
                    i = len;
                    break;

                case '{':
                    var len = raw.indexOf('}', i);
                    var name = raw.slice(i + 1, len).trim();
                    console.log(name);
                    if (len < 1) throw new Maus("INVALID ESCAPE SYNTAX", 206, i + 2);
                    if (!(name in global.vars[0].val)) throw new Maus("NO HAS " + name, 404, i + 2);
                    console.log(name, name in global.vars[0].val)
                    str += global.vars[0].val[name].toYarn().val;
                    i = len;
                    break;

                case '[':
                    var len = raw.indexOf(']', i);
                    console.log(i,len)
                    if(len<0) throw new Maus("INVALID ESCAPE SYNTAX", 206, i + 2);
                    i = len;
                    
                    
                    break;

                default:
                    throw new Maus("INVALID ESCAPE SYNTAX", 206, i + 1);
            }
        }
        else str += raw[i];
    }
    return str;
} 