const passGenForm = document.querySelector('#passGenForm');
const genPassBtn = document.querySelector('#genPassBtn');
// const errorMsgEl = document.querySelector('#errorMsg');
const defaultPassSettings = {
    passLength: 20,
    lowercase: true,
    uppercase: true,
    digits: true,
    symbols: true,
    excludeSimilars: false,
    charsToExclude: ''
};

genPassBtn.addEventListener('click', generatePass);

async function generatePass(e) {
    const passSettings = Object.fromEntries(new FormData(passGenForm));
    const newSettings = {
        passLength: null,
        lowercase: null,
        uppercase: null,
        digits: null,
        symbols: null,
        excludeSimilars: null,
        charsToExclude: null
    };
    console.log('passSettings', passSettings);
    for (let [k, v] of Object.entries(passSettings)) {
        if (k === 'charsToExclude') {
            newSettings[k] = passSettings[k];
        } else if (k === 'passLength') {
            newSettings[k] = Number(passSettings[k]) || 20;
        } else {
            newSettings[k] = Boolean(passSettings[k]);
        }
    }
    for (let [k, v] of Object.entries(defaultPassSettings)) {
        if (!Object.hasOwn(newSettings, k)) {
            newSettings[k] = v;
        }
    }
    // console.log('defaultPassSettings', defaultPassSettings);
    // const newSettings = Object.assign(defaultPassSettings, passSettings);
    console.log('newSettings', newSettings);
}

passLength
lowercase
uppercase
digits
symbols
excludeSimilars
charsToExclude