const addCredForm = document.querySelector('#addCredForm');
const addCredBtn = document.querySelector('#addCredBtn');
const errorMsgEl = document.querySelector('#errorMsg');

addCredBtn.addEventListener('click', async () => {
    const creds = Object.fromEntries(new FormData(addCredForm));
    const errors = generalValidation(creds);
    if (errors) {
        inputErrorClassToggle(errors);
        errorMsgEl.style.display = 'block';
        errorMsgEl.textContent = 'Please fill out all fields.';
        return;
    }
    console.log(creds);
    
    // preloads.addCreds(creds); TODO temp comment out for testing
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

console.log('addCred.js initiated');
