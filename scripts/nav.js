const navToHome = document.querySelector('#navToHome');
const navToSettings = document.querySelector('#navToSettings');
const navToAddCred = document.querySelector('#navToAddCred');

navToHome.addEventListener('click', () => {
    preloads.navTo('home');
});

navToAddCred.addEventListener('click', () => {
    preloads.navTo('addCred');
});

// navToSettings.addEventListener('click', () => {
//     preloads.navTo('settings');
// });