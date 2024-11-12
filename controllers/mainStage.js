const ipcCredentials = require('../ipc/credentials.js');
const ipcUserAccount = require('../ipc/userAccount.js');
const { pathViews } = require('../util/path.js');

async function manageMainFuncs(app, win) {
    ipcUserAccount.logoutHandler(win, pathViews);
    ipcCredentials.credOverviewReqHandler();
    ipcCredentials.addCredentialsHandler(win, pathViews);
    ipcCredentials.fetchPassPlainTextHandler();
    ipcCredentials.deleteCredsByIdHandler();
    ipcCredentials.fetchCredsByIdHandler();
    ipcCredentials.sendCorrectionForCredsByIdHandler();
    ipcCredentials.generatePasswordHandler();
}

module.exports = {
    manageMainFuncs
};