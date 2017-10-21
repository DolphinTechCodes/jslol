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
                    var len = raw.indexOf(')',i);
                    //if(len<0) break;
                    console.log(len, raw.slice(i+1, len));
                    var charcode=parseInt(raw.slice(i+1, len),16);
                    if(charcode<0) throw new Maus("INVALID ESCAPE SYNTAX", 206);
                    str+=String.fromCharCode(charcode);
                    console.log(charcode,String.fromCharCode(charcode))
                    i=len;
                    break;
                case '{':

                case '[':

                default:
                    throw new Maus("INVALID ESCAPE SYNTAX", 206);
            }
        }
        else str += raw[i];
    }
    return str;
} 