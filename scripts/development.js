// const pingBtn = document.querySelector('#pingBtn');
const devToolsBtn = document.querySelector('.openDevTools');

// pingBtn.addEventListener('click', async () => {
//     const response = await preloads.ping()
//     console.log(response) // prints out 'pong'
// });

devToolsBtn.addEventListener('click', async () => {
    const res = await preloads.devTools();
    console.log(res);

});

console.log('development.js initiated');

