const passGenForm = document.querySelector('#passGenForm');
const genPassBtn = document.querySelector('#genPassBtn');
// const errorMsgEl = document.querySelector('#errorMsg');

genPassBtn.addEventListener('click', generatePass);

async function generatePass(e) {
    const data = Object.fromEntries(new FormData(passGenForm));
    console.log(data);
    
}