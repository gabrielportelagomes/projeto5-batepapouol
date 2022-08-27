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
    promise.then(getMessage);
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

function getMessage() {
    hideEntryScreen();
    setInterval(statusLog, 5000);
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(renderMessage);
    promise.catch(renderError);
}

function renderMessage(answer) {
    console.log(answer);
    message = answer.data;


    let listMessage = document.querySelector(".chat");

    listMessage.innerHTML = ``;

    for (let i = 0; i < message.length; i++) {
        if (message[i].type === "status") {
            listMessage.innerHTML += `
            <li class="log"><p><span>(${message[i].time})</span><b> ${message[i].from}</b> ${message[i].text}<p></li>`;
        } else if (message[i].type === "private_message" && (user === message[i].from || user === message[i].to)) {
            listMessage.innerHTML += `
            <li class="privately"><p><span>(${message[i].time})</span><b> ${message[i].from}</b> para<b> ${message[i].to}</b> ${message[i].text}<p></li>`;
        } else {
            listMessage.innerHTML += `
            <li class="normal"><p><span>(${message[i].time})</span><b> ${message[i].from}</b> para<b> ${message[i].to}</b> ${message[i].text}<p></li>`;
        }
    }

    setInterval(getMessage, 3000);
}

function statusLog() {
    console.log(user);
    userStatus = { name: user };
    console.log(userStatus);

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userStatus);
    promise.then(renderItWorked);
    promise.catch(renderError);
} 
