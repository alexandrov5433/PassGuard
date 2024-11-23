const loginForm = document.querySelector('#loginForm');
const loginBtn = document.querySelector('#loginBtn');
const errorMsgEl = document.querySelector('#errorMsg');
const loader = document.querySelector('div.loader-container');

loginBtn.addEventListener('click', async () => {
    toggleLoaderAndLoginBtn();
    const formData = Object.fromEntries(new FormData(loginForm));
    console.log(formData);
    const errors = generalValidation(formData);
    inputErrorClassToggle(errors);
    if (Object.keys(errors).length) {
        toggleLoaderAndLoginBtn();
        errorMsgEl.textContent = genErrMsg(errors);
        return;
    } 
    const res = await preloads.login(formData);
    if (res.success === false) {
        errorMsgEl.textContent = res.msg;
        inputErrorClassToggle({username: false, password: false});
    } else if (res instanceof Error) {
        errorMsgEl.textContent = res.message;
    }
    toggleLoaderAndLoginBtn();
    console.log(res);
});

function generalValidation(formData) {
    const errors = {};
    if (!formData.username) {
        errors.username = 'missing';
    }
    if (!formData.password) {
        errors.password = 'missing';
    }
    return errors;
}

function genErrMsg(errors) {
    let msg = '';
    if (errors.username || errors.password) {
        msg += 'Opss... some fields are missing!\n'
    }
    return msg;
}

function inputErrorClassToggle(errors) {  
    Array.from(document.querySelectorAll('input[name]')).forEach( f => {
        const name = f.getAttribute('name');
        if (Object.hasOwn(errors, name)) {
            f.classList.add('error');
        } else {
            f.classList.remove('error');
        }
    });   
}

function toggleLoaderAndLoginBtn() {
    loader.classList.toggle('hide');
    loginBtn.classList.toggle('hide');
}