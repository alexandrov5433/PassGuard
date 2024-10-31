const loginForm = document.querySelector('#loginForm');
const loginBtn = document.querySelector('#loginBtn');
const errorMsgEl = document.querySelector('#errorMsg');

loginBtn.addEventListener('click', async () => {
    const formData = Object.fromEntries(new FormData(loginForm));
    console.log(formData);
    const errors = generalValidation(formData);
    inputErrorClassToggle(errors);
    if (Object.keys(errors).length) {
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