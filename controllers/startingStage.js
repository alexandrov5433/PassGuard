const { BrowserWindow } = require('electron');

const { accountExists } = require('../data/dataService.js');
const { pathPreloads, pathViews } = require('../util/path.js');
const ipcGeneral = require('../ipc/general.js');
const ipcUserAccount = require('../ipc/userAccount.js');

async function initViews(app) {
    let win;
    if (await accountExists()) {
        win = createWindow(pathViews.login);
    } else {
        win = createWindow(pathViews.register);
    }
    ipcUserAccount.loginHandler(win, pathViews);
    ipcUserAccount.registrationHandler(win, pathViews);
    ipcGeneral.navigationHandler(win, pathViews);
    ipcGeneral.devToolsToggle(win); //TODO remove
    // app.on('activate', () => {
    //     if (BrowserWindow.getAllWindows().length === 0) {
    //         createWindow()
    //     }
    // });
    return win;
}


function createWindow(viewPath) {
    const newWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: pathPreloads.preloadService
        }
    });
    newWindow.loadFile(viewPath);
    return newWindow;
}

module.exports = {
    initViews
};