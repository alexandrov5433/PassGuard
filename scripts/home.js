const credListCnt = document.querySelector('#credentials-container');
const errorMsgEl = document.querySelector('#errorMsg');

loadCredOverview();

async function loadCredOverview() {
    const creds = await preloads.credOverviewReq();
    // [
    //     {
    //         "id": "sdfnskdfölsadflasd",
    //         "title": "www.xyz.com",
    //         "username": "alex",
    //     }
    // ]
    const ul = document.createElement('ul');
    if (creds.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No credentials yet.';
        ul.append(li);
    } else {
        creds.forEach( ob => {
            const li = genLiElement();
            li.querySelector('div[data-credid="addIdHere"]').setAttribute('data-credid', ob.id);
            li.querySelector('input[value="addTitleHere"]').setAttribute('value', ob.title);
            li.querySelector('input[value="addUsernameHere"]').setAttribute('value', ob.username);
            ul.append(li);
        });
    }
    Array.from(ul.querySelectorAll('button.viewPass')).forEach( b => b.addEventListener('click', viewPassToggle));
    Array.from(ul.querySelectorAll('button.copyPass')).forEach( b => b.addEventListener('click', writeToClipboard));
    Array.from(ul.querySelectorAll('button.editCreds')).forEach( b => b.addEventListener('click', editCredentials));
    Array.from(ul.querySelectorAll('button.deleteCreds')).forEach( b => b.addEventListener('click', deleteCredentials));
    credListCnt.append(ul);
}

async function viewPassToggle(e) {
    const button = e.currentTarget;
    const div = button.parentElement.parentElement;
    const credId = div.dataset.credid;
    const inputEl = div.querySelector('div.info input[name="password"]');
    const currentType = inputEl.getAttribute('type');
    if (currentType === 'text') {
        inputEl.setAttribute('type', 'password');
        inputEl.setAttribute('value', '1111111111111111111111111');
        inputEl.value = '1111111111111111111111111';
        button.textContent = 'View Password';
        button.classList.remove('important-btn');
    } else if (currentType === 'password') {
        try {
            const passPlainText = await preloads.fetchPassPlainText(credId);
            inputEl.setAttribute('type', 'text');
            inputEl.setAttribute('value', passPlainText);
            inputEl.value = passPlainText;
            button.textContent = 'Hide Password';
            button.classList.add('important-btn');
        } catch (err) {
            console.error(err);
            displayErrorMsg(err.message);
            setTimeout(() => hideErrorMsg(), 6500);
        }
    }
}

function displayErrorMsg(msg) {
    errorMsgEl.style.display = 'block';
    errorMsgEl.textContent = msg;
}

function hideErrorMsg() {
    errorMsgEl.style.display = 'none';
    errorMsgEl.textContent = '';
}

async function writeToClipboard(e) {
    const div = e.currentTarget.parentElement.parentElement;
    const credId = div.dataset.credid;
    try {
        const passPlainText = await preloads.fetchPassPlainText(credId);
        await navigator.clipboard.writeText(passPlainText);
    } catch (err) {
        console.error(err);
        displayErrorMsg(err.message);
        setTimeout(() => hideErrorMsg(), 6500);
    }
}

async function deleteCredentials(e) {
    const divClassCred = e.currentTarget.parentElement.parentElement;
    const divClassActions = e.currentTarget.parentElement;
    const credId = divClassCred.dataset.credid;
    for (const child of divClassActions.children) {
        if (child.classList.contains('general')) {
            child.style.display = 'none';
        }
    }
    const confirmDeleteBtn = document.createElement('button');
    confirmDeleteBtn.setAttribute('type', 'button');
    confirmDeleteBtn.classList.add('deleting', 'important-btn');
    confirmDeleteBtn.textContent = 'Confirm deletion';
    confirmDeleteBtn.addEventListener('click', (e) => {
        execDeleteCredentials(e, divClassCred, credId);
    });
    const cancelDeleteBtn = document.createElement('button');
    cancelDeleteBtn.setAttribute('type', 'button');
    cancelDeleteBtn.classList.add('deleting');
    cancelDeleteBtn.textContent = 'Cancel';
    cancelDeleteBtn.addEventListener('click', (e) => {
        cancelDeletion(e, divClassActions);
    });
    divClassActions.append(confirmDeleteBtn, cancelDeleteBtn);
}

async function execDeleteCredentials(e, divClassCred, credId) {
    try {
        const res = await preloads.deleteCredsById(credId);
        divClassCred.remove();
        console.log(res);
    } catch (err) {
        console.error(err);
        displayErrorMsg(err.message);
        setTimeout(() => hideErrorMsg(), 6500);
    }
}

function cancelDeletion(e, divClassActions) {
    for (const child of divClassActions.children) {
        if (child.classList.contains('general')) {
            child.style.display = 'block';
        }
        if (child.classList.contains('deleting')) {
            child.remove();
        }
    }
    e.currentTarget.remove();
}

function genLiElement() {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="credential" data-credid="addIdHere">
            <div class="info">
                <label>Title</label>
                <input type="text" name="title" value="addTitleHere" disabled="isDisabled">
                <label>Username</label>
                <input type="text" name="username" value="addUsernameHere" disabled="isDisabled">
                <label>Password</label>
                <input type="password" name="password" value="1111111111111111111111111" disabled="isDisabled">
            </div>
            <div class="actions">
                <button type="button" class="viewPass general">View Password</button>
                <button type="button" class="copyPass general">Copy Password</button>
                <button type="button" class="editCreds general">Edit Credentials</button>
                <button type="button" class="deleteCreds general">Delete Credentials</button>
            </div>
        </div>`;
    return li;
}

async function editCredentials(e) {
    const divClassCred = e.currentTarget.parentElement.parentElement;
    const divClassActions = e.currentTarget.parentElement;
    const credId = divClassCred.dataset.credid;
    for (const child of divClassActions.children) {
        if (child.classList.contains('general')) {
            child.style.display = 'none';
        }
    }
    const saveBtn = document.createElement('button');
    saveBtn.setAttribute('type', 'button');
    saveBtn.classList.add('saveChanges', 'editing');
    saveBtn.textContent = 'Save Changes';
    saveBtn.addEventListener('click', (e) => {
        saveChangesEditing(e, divClassCred, divClassActions, credId);
    });

    const discardBtn = document.createElement('button');
    discardBtn.setAttribute('type', 'button');
    discardBtn.classList.add('discardChanges', 'editing');
    discardBtn.textContent = 'Discard Changes';
    discardBtn.addEventListener('click', (e) => {
        discardChangesEditing(e, divClassCred, divClassActions, credId);
    });
    await showPassword(divClassCred, credId);
    inputFieldsDisableToggle(divClassCred, false);
    divClassActions.append(saveBtn, discardBtn);
    divCredBackgrondColorForEditingToggle(divClassCred, true);
}

async function saveChangesEditing(e, divClassCred, divClassActions, credId) {
    const newData = {};
    divClassCred.querySelectorAll('input').forEach( node => {
        newData[node.getAttribute('name')] = node.value;
    });
    divClassCred.querySelector('input[name="password"]').setAttribute('type', 'password');
    try {
        const res = await preloads.sendCorrectionForCredsById(credId, newData);
        changeValueOnInputs(divClassCred, res.title, res.username, '1111111111111111111111111');
        removeEditingButtons(divClassActions);
        inputFieldsDisableToggle(divClassCred, true);
        divCredBackgrondColorForEditingToggle(divClassCred, false);
    } catch (err) {
        console.error(err);
        displayErrorMsg(err.message);
        setTimeout(() => hideErrorMsg(), 6500);
    }
}

async function discardChangesEditing(e, divClassCred, divClassActions, credId) {
    removeEditingButtons(divClassActions);
    try {
        const oldCreds = await preloads.fetchCredsById(credId);
        changeValueOnInputs(divClassCred, oldCreds.title, oldCreds.username, '1111111111111111111111111');
        divClassCred.querySelector('input[name="password"]').setAttribute('type', 'password');
        inputFieldsDisableToggle(divClassCred, true);
        divCredBackgrondColorForEditingToggle(divClassCred, false);
    } catch (err) {
        console.error(err);
        displayErrorMsg(err.message);
        setTimeout(() => hideErrorMsg(), 6500);
    }
}

function changeValueOnInputs(divClassCred, titleVal, usernameVal, passVal) {
    //HTML value attribute
    divClassCred.querySelector('input[name="title"]').setAttribute('value', titleVal);
    divClassCred.querySelector('input[name="username"]').setAttribute('value', usernameVal);
    divClassCred.querySelector('input[name="password"]').setAttribute('value', passVal);
    //live DOM value property
    divClassCred.querySelector('input[name="title"]').value = titleVal;
    divClassCred.querySelector('input[name="username"]').value = usernameVal;
    divClassCred.querySelector('input[name="password"]').value = passVal;
}

function inputFieldsDisableToggle(divClassCred, mustBeDisabled) {
    // mustBeDisabled = Boolean
    if (mustBeDisabled) {
        divClassCred.querySelector('input[name="title"]').setAttribute('disabled', 'isDisabled');
        divClassCred.querySelector('input[name="username"]').setAttribute('disabled', 'isDisabled');
        divClassCred.querySelector('input[name="password"]').setAttribute('disabled', 'isDisabled');
    } else {
        divClassCred.querySelector('input[name="title"]').removeAttribute('disabled');
        divClassCred.querySelector('input[name="username"]').removeAttribute('disabled');
        divClassCred.querySelector('input[name="password"]').removeAttribute('disabled');
    }
}

function removeEditingButtons(divClassActions) {
    for (const child of Array.from(divClassActions.querySelectorAll('button'))) {
        if (child.classList.contains('editing')) {
            child.remove();
        } else if (child.classList.contains('general')) {
            child.style.display = 'block';
        }
    }
}

async function showPassword(divClassCred, credId) {
    const inputEl = divClassCred.querySelector('input[name="password"]');
    try {
        const passPlainText = await preloads.fetchPassPlainText(credId);
        inputEl.setAttribute('type', 'text');
        inputEl.setAttribute('value', passPlainText);
        inputEl.value = passPlainText;
    } catch (err) {
        console.error(err);
        displayErrorMsg(err.message);
        setTimeout(() => hideErrorMsg(), 6500);
    }
}

function divCredBackgrondColorForEditingToggle(divClassCred, activate) {
    if (activate) {
        divClassCred.setAttribute('style', 'background-color: rgba(255, 99, 71, 0.35);')
    } else {
        divClassCred.removeAttribute('style');
    }
}