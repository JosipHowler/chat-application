
const socket = io("http://localhost:3000")

const chatContainer = document.querySelector(".messages")
const inputText = document.getElementById("message-input")
const submitButton = document.getElementById("button-submit")

const name = prompt("What is your name?")
appendJoinLeaveMessage("You connected")

socket.emit("new-user", name)

socket.on("user-connected", name => {
    appendJoinLeaveMessage(`${name} connected`)
})

socket.on("user-disconnected", name => {
    appendJoinLeaveMessage(`${name} disconnected`)
})

socket.on("chat-message", data => {
    appendMessage(`${data.name}: ${data.message}`)
})

function appendJoinLeaveMessage(message){
    const chatMessage = document.createElement("div")
    chatMessage.classList.add("join-message-box")
    chatMessage.textContent = message
    chatContainer.appendChild(chatMessage)
}

function appendMessage(message){
    const chatMessage = document.createElement("div")
    chatMessage.classList.add("message-box")
    chatMessage.textContent = message
    chatContainer.appendChild(chatMessage)
}

function appendYourMessage(message){
    const chatMessage = document.createElement("div")
    chatMessage.classList.add("main-message-box")
    chatMessage.textContent = message
    chatContainer.appendChild(chatMessage)
}

submitButton.addEventListener("click", () => {
    if(inputText === "") return
    const message = inputText.value
    socket.emit("send-message", message)
    appendYourMessage(`You: ${message}`)
    inputText.value = ""
})  