const addCredForm = document.querySelector('#addCredForm');
const addCredBtn = document.querySelector('#addCredBtn');
const errorMsgElAddCreds = document.querySelector('#errorMsg');

addCredBtn.addEventListener('click', async () => {
    const creds = Object.fromEntries(new FormData(addCredForm));
    const errors = generalValidation(creds);
    if (errors) {
        inputErrorClassToggle(errors);
        displayErrorMsg('Please fill out all fields.', errorMsgElAddCreds);
        return;
    }
    hideErrorMsg(errorMsgElAddCreds);
    inputErrorClassToggle(null);
    preloads.addCreds(creds);
});


function generalValidation(creds) {
    const errors = {};
    if (!creds.title) {
        errors.title = 'missing';
    }
    if (!creds.username) {
        errors.username = 'missing';
    }
    if (!creds.password) {
        errors.password = 'missing';
    }
    if (Object.values(errors).length) {
        return errors;
    }
    return false;
}

function inputErrorClassToggle(errors) {
    if (!errors) {
        errors = {};
    }
    Array.from(document.querySelectorAll('input[name]')).forEach( f => {
        const name = f.getAttribute('name');
        if (Object.hasOwn(errors, name)) {
            f.classList.add('error');
        } else {
            f.classList.remove('error');
        }
    });   
}

function displayErrorMsg(msg, errorMsgEl) {
    errorMsgEl.style.display = 'block';
    errorMsgEl.textContent = msg;
}

function hideErrorMsg(errorMsgEl) {
    errorMsgEl.style.display = 'none';
    errorMsgEl.textContent = '';
}