const regForm = document.querySelector('#registrationForm');
const createAccBtn = document.querySelector('#createAccBtn');
const errorMsgEl = document.querySelector('#errorMsg');
const loader = document.querySelector('div.loader-container');
const randPassBtn = document.querySelector('#randomPass');
const passwordInput = document.querySelector('#passwordInput');
const repeatPasswordInput = document.querySelector('#repeatPasswordInput');


createAccBtn.addEventListener('click', async () => {
    toggleLoaderAndBtns();
    const formData = Object.fromEntries(new FormData(regForm));
    console.log(formData);
    const errors = generalValidation(formData);
    inputErrorClassToggle(errors);
    if (Object.keys(errors).length) {
        toggleLoaderAndBtns();
        errorMsgEl.textContent = genErrMsg(errors);
        return;
    } 
    // const res = await preloads.register(formData);
    console.log('register.js ', res);
    
    //error acc exists;
    if (res instanceof Error) {
        errorMsgEl.textContent = res.message;
    }
    toggleLoaderAndBtns(); 
});

randPassBtn.addEventListener('click', async () => {
    const generatedPass = await preloads.generatePassword();
    passwordInput.value = generatedPass;
    repeatPasswordInput.value = generatedPass;
    lightUpPasswordInput();
});

function generalValidation(formData) {
    const errors = {};
    if (!formData.username) {
        errors.username = 'missing';
    }
    if (!formData.password) {
        errors.password = 'missing';
    }
    if (!formData.repeatPassword) {
        errors.repeatPassword = 'missing';
    } else if (formData.password && (formData.repeatPassword !== formData.password)) {
        errors.repeatPassword = 'mismatch';
    }
    if (Object.values(errors).length) {
        return errors;
    }
    return false;
}

function genErrMsg(errors) {
    let msg = '';
    if (errors.username || errors.password || errors.repeatPassword === 'missing') {
        msg += 'Opss... some fields are missing!\n'
    }
    if (errors.repeatPassword === 'mismatch') {
        msg += 'Passwords don\`t match.';
    }
    return msg;
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

function toggleLoaderAndBtns() {
    loader.classList.toggle('hide');
    createAccBtn.classList.toggle('hide');
    randPassBtn.classList.toggle('hide');
}

function lightUpPasswordInput() {
    passwordInput.classList.add('password-incerted');
    repeatPasswordInput.classList.add('password-incerted');
    setTimeout(() => {
        passwordInput.classList.remove('password-incerted');
        repeatPasswordInput.classList.remove('password-incerted');
    }, 401);
}