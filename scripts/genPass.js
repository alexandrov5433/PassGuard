const passGenForm = document.querySelector('#passGenForm');
const genPassBtn = document.querySelector('#genPassBtn');
const passwordInput = document.querySelector('#password');
const errorMsgElGenPass = document.querySelector('#errorMsg');

const lowercaseCheckbox = document.querySelector('#lowercase');
const uppercaseCheckbox = document.querySelector('#uppercase');
const digitsCheckbox = document.querySelector('#digits');
const symbolsCheckbox = document.querySelector('#symbols');

const charLib = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    digits: '0123456789',
    symbols: '!@#$%^&*()_-+=[]{}|:;\"<>,.?/~'
};

genPassBtn.addEventListener('click', generatePass);

async function generatePass(e) {
    if (!isOneUseCheckboxChecked()) {
        displayErrorMsg('At least one checkbox for characters to use must be checked.', errorMsgElGenPass);
        return;
    };
    hideErrorMsg(errorMsgElGenPass);
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
    if (newSettings.charsToExclude != '') {
        if (areAllCharsToUseExcluded(newSettings)) {
            displayErrorMsg('Can not exclude all characters to use.', errorMsgElGenPass);
            return;
        }
    }
    const newPass = await preloads.generatePassword(newSettings);
    passwordInput.value = newPass;
    lightUpPasswordInput();
}

function displayErrorMsg(msg, errorMsgEl) {
    errorMsgEl.style.display = 'block';
    errorMsgEl.textContent = msg;
}

function hideErrorMsg(errorMsgEl) {
    errorMsgEl.style.display = 'none';
    errorMsgEl.textContent = '';
}

function isOneUseCheckboxChecked() {
    let isOneChecked = false;
    [
        lowercaseCheckbox,
        uppercaseCheckbox,
        digitsCheckbox,
        symbolsCheckbox
    ].forEach( box => {
        if (box.checked === true) {
            isOneChecked = true;
        }
    });
    return isOneChecked;
}

function lightUpPasswordInput() {
    passwordInput.classList.add('password-incerted');
    setTimeout(() => {
        passwordInput.classList.remove('password-incerted');
    }, 401);
}

function areAllCharsToUseExcluded(newSettings) {
    let charToUse = '';
    [
        'lowercase',
        'uppercase',
        'digits',
        'symbols'
    ].forEach( chars => {
        if (newSettings[chars] === true) {
            charToUse = charToUse + charLib[chars];
        }
    });
    [...(newSettings.charsToExclude || '')].forEach(c => {
        charToUse = charToUse.replaceAll(c, ''); 
    });
    return charToUse.length <= 0 ? true : false;
}