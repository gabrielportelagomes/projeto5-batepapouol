let userLog = [];
let userStatus = [];
let user = '';
let message = [];

function menu() {
    const activateMenu = document.querySelector('aside');
    activateMenu.classList.remove('hide');
}

function hideMenu() {
    const hideMenu = document.querySelector('aside');
    hideMenu.classList.add('hide');
}

function hideEntryScreen() {
    const hideMenu = document.querySelector('.entry-screen');
    hideMenu.classList.add('hide');
}

function nameId() {
    user = document.querySelector('#name').value;

    userLog = { name: user };

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userLog);
    promise.then(renderItWorked);
    promise.catch(invalidName);
}

function invalidName() {
    alert("Nome de usuário inválido ou já cadastrado!\nDigite outro nome de usuário.");
}

function renderError() {
    console.log("Ocorreu um erro!");
}

function renderItWorked() {
    console.log("Tudo certo!");
}