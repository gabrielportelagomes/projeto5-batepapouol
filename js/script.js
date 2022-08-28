let userLog = [];
let userStatus = [];
let user = '';
let message = '';
let postedMessage = [];
let postMessage = [];

function menu() {
    const activateMenu = document.querySelector('aside');
    activateMenu.classList.remove('hide');
}

function hideMenu() {
    const hideMenu = document.querySelector('aside');
    hideMenu.classList.add('hide');
}

function acivateAnimation() {
    const hideLog = document.querySelector('.user');
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

function nameId() {
    acivateAnimation()
    user = document.querySelector('#name').value;

    userLog = { name: user };

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userLog);
    promise.then(getMessage);
    promise.catch(invalidName);
}

function invalidName() {
    alert("Nome de usuário inválido ou já cadastrado!\nDigite outro nome de usuário.");
    hideAnimation();
}

function renderError() {
    console.log("Ocorreu um erro!");
}

function getMessage() {
    hideEntryScreen();
    setInterval(statusLog, 5000);
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(renderMessage);
    promise.catch(console.log("Erro ao renderizar menssagens"));
}

function renderMessage(answer) {
    /* console.log(answer); */
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
    console.log(lastMessage);

    setInterval(getMessage, 3000);
}

function statusLog() {
    /* console.log(user); */
    userStatus = { name: user };
    /* console.log(userStatus); */

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userStatus);
    promise.then(console.log("Log funcionando"));
    promise.catch(console.log("Erro no log"));
} 

function sendMessage() {
    message = document.querySelector('#submit').value;

    postedMessage = { 
                    from: user,
                    to: "Todos",
                    text: message,
                    type: "message"
                    };

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', postedMessage);
    promise.then(console.log("mensagem enviada"));
    promise.catch(console.log(window.location.reload()));
    message = '';
}

document.addEventListener("keypress", function(enter) {

    if(enter.key === "Enter") {
        const sendButton = document.querySelector('#send');
        sendButton.click();
    }
});