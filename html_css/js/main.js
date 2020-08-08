const chatField = document.getElementById('chat-message-field');
const scrollset = document.querySelector('.chat-messages');
const socket = io();
const logged_user = window.localStorage.getItem('email');
//send message to chat screen
socket.on('message', message => {
	outputMessage(message);

	//scroll set to bottom after seding a new message
	scrollset.scrollTop = scrollset.scrollHeight;
})

//send-message

chatField.addEventListener('submit', (e) => {
	e.preventDefault();

	//fetch text message details from container
	const msg = e.target.elements.msg.value;

	//send this text to server
	socket.emit('chat-msg', msg);
	yourMessage(msg);

	scrollset.scrollTop = scrollset.scrollHeight;

	//clear text feild after sendig a message
	e.target.elements.msg.value = '';
	e.target.elements.msg.focus();
})

//function that creates msg body class for other users
function outputMessage(message) {
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
<p class="text">${message.text}</p>`
	document.querySelector('.chat-messages').appendChild(div);
};

//function that creates msg body class for logged in user
function yourMessage(message) {
	const div = document.createElement('div'); 
	div.classList.add('message');
	div.classList.add('send');
	div.innerHTML = `<p class="text">${message}</p>`
	document.querySelector('.chat-messages').appendChild(div);
};