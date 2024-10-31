const logoutBtn = document.querySelector('#logoutBtn');

logoutBtn.addEventListener('click', () => {
    console.log('logoutBtn');
    
    preloads.logout();
});