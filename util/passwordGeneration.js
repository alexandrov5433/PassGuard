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

function passwordGenerator(options) {
    if (!options) {
        options = defaultPassSettings;
    }
    // console.log(options);
    let pass = generatePass(options);
    console.log(`pass: ${pass} length: ${pass.length}`);
    if (options.charsToExclude != '') {
        pass = excludeChars(pass, options);
    }
    return pass;
}

function generatePass(options) {
    return generatePassword(
        options.passLength,
        {
            lowercase: options.lowercase,
            uppercase: options.uppercase,
            digits: options.digits,
            symbols: options.symbols,
            excludeSimilars: options.excludeSimilars
        }
    );
}

function excludeChars(strToProcess, options) {
    let str = strToProcess;
    const newCharSet = [...generatePassword(
        256,
        {
            lowercase: options.lowercase,
            uppercase: options.uppercase,
            digits: options.digits,
            symbols: options.symbols,
            excludeSimilars: options.excludeSimilars
        }
    )];
    console.log('newCharSet: ', newCharSet);
    const charsToExclude = options.charsToExclude.split('') || [];
    charsToExclude.forEach(c => {
        while (str.includes(c)) {
            const randomIndex = Math.floor(Math.random() * newCharSet.length);
            str = str.replace(c, newCharSet[randomIndex]);
        }
    });
    return str;
}

module.exports = passwordGenerator;