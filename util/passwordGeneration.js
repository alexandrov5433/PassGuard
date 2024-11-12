const { generatePassword } = require('safe-pass-gen');

const defaultPassSettings = {
    passLength: 20,
    lowercase: true,
    uppercase: true,
    digits: true,
    symbols: true,
    excludeSimilars: false,
    charsToExclude: ''
};
const charLibrary = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    digits: "0123456789",
    symbols: "!@#$%^&*()_-+=[]{}|:;\"<>,.?/~",
    excludeSimilars: "0O1Il5S"
};

function generatePass(options) {
    if (!options) {
        options = defaultPassSettings;
    }
    console.log(options);
    
    let pass = generatePassword(
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
        pass = excludeChars(pass, options);
    }
    console.log(`pass: ${pass} length: ${pass.length}`);
    return pass;
}

function excludeChars(strToProcess, options) {
    let str = strToProcess;
    let newCharSet = '';
    for (let [k, chars] of Object.entries(charLibrary)) {
        if (k === 'excludeSimilars' && options[k] === true) {
            continue;
        }
        if (options[k] === false) {
            continue;
        }
        const regex = new RegExp(`[${options.charsToExclude}]`, 'g');
        newCharSet =+ chars.replaceAll(regex, '');
    }
    const charsToExclude = options.charsToExclude.split('') || [];
    charsToExclude.forEach(c => {
        const randomIndex = Math.floor(Math.random() * newCharSet.length);
        str = str.replaceAll(c, newCharSet[randomIndex]);
    });
    // console.log(`str: ${str} length: ${str.length}`);
    
    return str;
}

module.exports = generatePass;