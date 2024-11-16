const path = require('node:path');

const pathData = {
    'sensitive': getPathTo('/data/sensitive.json'),
    'session': getPathTo('/data/session.json'),
    // 'settings': getPathTo('/data/settings.json'),
};

const pathViews = {
    'login': getPathTo('/views/login.html'),
    'home': getPathTo('/views/home.html'),
    'addCred': getPathTo('/views/addCred.html'),
    // 'settings': getPathTo('/views/settings.html'),
    'register': getPathTo('/views/register.html')
};

const pathPreloads = {
    'preloadService': getPathTo('/preloads/preloadService.js')
};

function getPathTo(dest) {
    return path.normalize(
        path.join(process.cwd(), dest)
    );
}

module.exports = {
    pathData,
    pathViews,
    pathPreloads
};