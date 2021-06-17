const socket = io()
let messageArea = document.querySelector('.message_area')
let Name;   //it is used when a new user joins the chat
do{
   Name = prompt('Please enter your name:')

}while(!Name)

let textarea = document.querySelector('#textarea') // it is used when a aperson type a message a press enter key the e event occurs message will be displayed
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter' ){
        sendMessage(e.target.value)
    }
})


function sendMessage(message) {
    let msg ={
        user:Name,
        message:message.trim()
    }

    //apend (used to show the message)
    appendMessage(msg,'outgoing')    //(it is a outgoing msg because it is send when we pree enter)
    textarea.value = '' 
      //used to clear the textrae after pressing the enter btn
      scrollToBottom();

     // send to server
     socket.emit('message', msg)
} 

function appendMessage(msg,type) {
let mainDiv = document.createElement('div')   //this is a div to dynamically pass the incoming or outgoing message
let className = type
mainDiv.classList.add(className,'message')

let markup = `
<h3>${msg.user}</h3>
<p>${msg.message}</p>
`

mainDiv.innerHTML = markup

messageArea.appendChild(mainDiv)
}


// Recieve the message

socket.on('message',(msg) => {

    appendMessage(msg,'incoming')
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop = MessageArea.scrollHeight
}