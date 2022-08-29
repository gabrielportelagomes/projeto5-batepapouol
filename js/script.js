let userLog = [];
let userStatus = [];
let user = '';
let addressee = '';
let message = '';
let visibility = '';
let postedMessage = [];
let postMessage = [];
let onlineUser = [];

function menu() {
    const activateMenu = document.querySelector('aside');
    activateMenu.classList.remove('hide');
}

function hideMenu() {
    const hideMenu = document.querySelector('aside');
    hideMenu.classList.add('hide');
}

function acivateAnimation() {
    const hideLog = document.querySelector('.nick-user');
    hideLog.classList.add('hide');

    const activateLoading = document.querySelector('.loading');
    activateLoading.classList.remove('hide');
}

function hideAnimation() {
    const hideLog = document.querySelector('.user');
    hideLog.classList.remove('hide');

    const activateLoading = document.querySelector('.loading');
    activateLoading.classList.add('hide');
}

function hideEntryScreen() {
    const hideMenu = document.querySelector('.entry-screen');
    hideMenu.classList.add('hide');
}

function startChat() {
    hideEntryScreen();
    getMessage();
    setInterval(getMessage, 3000);
    statusLog();
}

function nameId() {
    acivateAnimation()
    getUsers();
    user = document.querySelector('#name').value;

    userLog = { name: user };

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userLog);
    promise.then(startChat);
    promise.catch(invalidName);
}

function invalidName() {
    alert("Nome de usuário inválido ou já cadastrado!\nDigite outro nome de usuário.");
    hideAnimation();
}

function errorGetMessage() {
    console.log("Ocorreu um erro ao buscar mensagens!");
}

function errorGetOnlineUsers() {
    console.log("Ocorreu um erro ao buscar usuários ativos!");
}

function errorSendMessage() {
    alert("Mensagem não enviada!\nEntre na sala novamente.");
    window.location.reload();
}

function errorConection() {
    alert("Conexão perdida!\nEntre na sala novamente.");
    window.location.reload();
}

function getMessage() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(renderMessage);
    promise.catch(errorGetMessage);
}

function renderMessage(answer) {
    postedMessage = answer.data;


    let listMessage = document.querySelector(".chat");

    listMessage.innerHTML = ``;

    for (let i = 0; i < postedMessage.length; i++) {
        if (postedMessage[i].type === "status") {
            listMessage.innerHTML += `
            <li class="log" id="message"><p><span>(${postedMessage[i].time})</span><b> ${postedMessage[i].from}</b> ${postedMessage[i].text}<p></li>`;
        } else if (postedMessage[i].type === "private_message" && (user === postedMessage[i].from || user === postedMessage[i].to)) {
            listMessage.innerHTML += `
            <li class="privately id="message"><p><span>(${postedMessage[i].time})</span><b> ${postedMessage[i].from}</b> para<b> ${postedMessage[i].to}</b> ${postedMessage[i].text}<p></li>`;
        } else {
            listMessage.innerHTML += `
            <li class="normal" id="message"><p><span>(${postedMessage[i].time})</span><b> ${postedMessage[i].from}</b> para<b> ${postedMessage[i].to}</b> ${postedMessage[i].text}<p></li>`;
        }
    }

    const messages = document.querySelector('.chat');
    const lastMessage = messages.lastElementChild;
    lastMessage.scrollIntoView();
}

function statusLog() {
    userStatus = { name: user };

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userStatus);
    promise.then(connection);
    promise.catch(errorConection);
}

function connection() {
    setInterval(statusLog, 5000);
}

function sendMessage() {
    message = document.querySelector('#submit').value;
    document.getElementById('submit').value = '';
    postedMessage = {
        from: user,
        to: "Todos",
        text: message,
        type: "message"
    };

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', postedMessage);
    promise.then(getMessage);
    promise.catch(errorSendMessage);
    message = '';
}

    document.addEventListener("keypress", function (enter) {

    if (user !== '' && enter.key === "Enter") {
        const sendMessage = document.querySelector('#send-message');
        sendMessage.click();
    }
});

function getUsers() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promise.then(renderUsers);
    promise.catch(errorGetOnlineUsers);
}

function renderUsers(participant) {
    onlineUser = participant.data;


    let listUser = document.querySelector(".contacts");

    listUser.innerHTML = `
    <li>
        <ion-icon name="people"></ion-icon>
        <div class="remove" id="online-user">
            <div data-identifier="participant">Todos</div>
            <ion-icon name="checkmark-outline"></ion-icon>
        </div>
    </li>`;

    for (let i = 0; i < onlineUser.length; i++) {
        if (onlineUser[i].name !== user) {
            listUser.innerHTML += `
            <li>
                <ion-icon name="people"></ion-icon>
                <div class="remove" id="online-user">
                    <div class="nick"data-identifier="participant"><p>${onlineUser[i].name}</></div>
                    <ion-icon name="checkmark-outline"></ion-icon>
                </div>
            </li>`
        }
    }

    setInterval(getUsers, 10000);
}


