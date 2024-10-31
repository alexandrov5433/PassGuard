const { app } = require('electron');

const { initViews } = require('./controllers/startingStage.js');
const { manageMainFuncs } = require('./controllers/mainStage.js');

app.whenReady().then(async () => {
    const win = await initViews(app);
    await manageMainFuncs(app, win);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});