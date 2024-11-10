import { generatePassword as genPass} from "safe-pass-gen";


export default function generatePass(options = {
    passLength: 20,
    lowercase: true,
    uppercase: true,
    digits: true,
    symbols: true,
    excludeSimilars: false,
    charsToExclude: ''
}) {
    let pass = genPass(
        options.passLength,
        {
            lowercase: options.lowercase,
            uppercase: options.uppercase,
            digits: options.digits,
            symbols: options.symbols,
            excludeSimilars: options.excludeSimilars
        }
    );
    if (options.charsToExclude != '') {
        pass = excludeChars(pass, options.charsToExclude);
    }
    return pass;
}

// {
//     "passLength": "23",
//     "lowercase": "on",
//     "uppercase": "on",
//     "digits": "on",
//     "symbols": "on",
//     "excludeSimilars": "on",
//     "charsToExclude": "v['io"
// }

function excludeChars(strToProcess, strOfCharsToExclude) {
    let str = strToProcess;
    const charsToExclude = strOfCharsToExclude.split('') || [];
    charsToExclude.forEach(c => {
        str = str.replaceAll(c, '');
    });
    return str;
}