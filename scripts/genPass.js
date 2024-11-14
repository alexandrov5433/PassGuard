const passGenForm = document.querySelector('#passGenForm');
const genPassBtn = document.querySelector('#genPassBtn');
const passwordInput = document.querySelector('#password');
// const errorMsgEl = document.querySelector('#errorMsg');
// const defaultPassSettings = {
//     passLength: 20,
//     lowercase: true,
//     uppercase: true,
//     digits: true,
//     symbols: true,
//     excludeSimilars: true,
//     charsToExclude: ''
// };

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
    // console.log('passSettings', passSettings);
    for (let [k, v] of Object.entries(passSettings)) {
        if (k === 'charsToExclude') {
            newSettings[k] = passSettings[k];
        } else if (k === 'passLength') {
            newSettings[k] = Number(passSettings[k]) || 20;
        } else {
            newSettings[k] = Boolean(passSettings[k]);
        }
    }
    //passLength and charsToExclude are always present
    for (let [k, v] of Object.entries(newSettings)) {
        if (v === null) {
            newSettings[k] = false;
        }
    }
    // console.log('newSettings', newSettings);
    const newPass = await preloads.generatePassword(newSettings);
    console.log(newPass);
    passwordInput.value = newPass;
}

passLength
lowercase
uppercase
digits
symbols
excludeSimilars
charsToExclude