const socket = io('http://localhost:8000'); // Connect to the server
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio("ting.mp3"); // Corrected the path to the audio file

// Prompt user to enter their name and show the Name when User enter a new
const userName = prompt("Enter your name to join");
console.log("New User", userName);
socket.emit('new-user-joined', userName);

// Create a custom context menu for message options
const contextMenu = document.createElement('div');
contextMenu.classList.add('context-menu');
document.body.appendChild(contextMenu);

const createMenuOption = (text, onClick) => {
    const option = document.createElement('div');
    option.classList.add('context-menu-option');
    option.innerText = text;
    option.onclick = onClick;
    return option;
};

const showContextMenu = (event, options) => {
    contextMenu.innerHTML = '';
    options.forEach(option => contextMenu.appendChild(option));
    contextMenu.style.top = `${event.clientY}px`;
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.display = 'block';
    event.preventDefault();
};

document.addEventListener('click', () => {
    contextMenu.style.display = 'none';
});

// Append message to the message container
const appendMessage = (message, position, messageId = null, sender = false) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);

    const messageText = document.createElement('span');
    messageText.innerText = message;

    if (messageId) {
        messageElement.dataset.id = messageId;
    }

    messageElement.appendChild(messageText);

    messageElement.oncontextmenu = (event) => {
        const deleteOption = createMenuOption('Delete', () => {
            if (confirm('Are you sure you want to delete this message?')) {
                messageElement.remove();
                socket.emit('delete-message', { messageId, sender });
            }
        });
        showContextMenu(event, [deleteOption]);
    };

    messageContainer.append(messageElement);
    if (position === 'left') {
        audio.play();
    }
};

// Handle user joined event
socket.on('user-joined', name => {
    appendMessage(`${name} joined the chat`, 'system');
});

// Handle receive message event
socket.on('receive', data => {
    appendMessage(`${data.name}: ${data.message}`, 'left', data.messageId, false);
});

// Handle user left event
socket.on('user-left', name => {
    appendMessage(`${name} left the chat`, 'system');
});

// Handle delete message event
socket.on('delete-message', data => {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        if (message.dataset.id === data.messageId) {
            if (data.sender || message.classList.contains('right')) {
                message.remove();
            }
        }
    });
});

// Form submit event listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    const messageId = Date.now().toString();
    appendMessage(`You: ${message}`, 'right', messageId, true);
    socket.emit('send', { message, messageId });
    messageInput.value = '';
});








































// const socket = io('http://localhost:8000'); // Connect to the server
// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector(".container");
// var audio = new Audio("ting.mp3"); // Corrected the path to the audio file

// // Prompt user to enter their name and show the Name when User enter a new
// const userName = prompt("Enter your name to join");
// console.log("New User", userName);
// socket.emit('new-user-joined', userName);

// // Create a custom context menu for message options
// const contextMenu = document.createElement('div');
// contextMenu.classList.add('context-menu');
// document.body.appendChild(contextMenu);

// const createMenuOption = (text, onClick) => {
//     const option = document.createElement('div');
//     option.classList.add('context-menu-option');
//     option.innerText = text;
//     option.onclick = onClick;
//     return option;
// };

// const showContextMenu = (event, options) => {
//     contextMenu.innerHTML = '';
//     options.forEach(option => contextMenu.appendChild(option));
//     contextMenu.style.top = `${event.clientY}px`;
//     contextMenu.style.left = `${event.clientX}px`;
//     contextMenu.style.display = 'block';
//     event.preventDefault();
// };

// document.addEventListener('click', () => {
//     contextMenu.style.display = 'none';
// });

// // Append message to the message container
// const appendMessage = (message, position, messageId = null, sender = false) => {
//     const messageElement = document.createElement('div');
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);

//     const messageText = document.createElement('span');
//     messageText.innerText = message;

//     if (messageId) {
//         messageElement.dataset.id = messageId;
//     }

//     messageElement.appendChild(messageText);

//     messageElement.oncontextmenu = (event) => {
//         const deleteOption = createMenuOption('Delete', () => {
//             if (confirm('Are you sure you want to delete this message?')) {
//                 messageElement.remove();
//                 socket.emit('delete-message', messageId);
//             }
//         });
//         showContextMenu(event, [deleteOption]);
//     };

//     messageContainer.append(messageElement);
//     if (position === 'left') {
//         audio.play();
//     }
// };

// // Handle user joined event
// socket.on('user-joined', name => {
//     appendMessage(`${name} joined the chat`, 'system');
// });

// // Handle receive message event
// socket.on('receive', data => {
//     appendMessage(`${data.name}: ${data.message}`, 'left', data.messageId, false);
// });

// // Handle user left event
// socket.on('user-left', name => {
//     appendMessage(`${name} left the chat`, 'system');
// });

// // Handle delete message event
// socket.on('delete-message', messageId => {
//     const messages = document.querySelectorAll('.message');
//     messages.forEach(message => {
//         if (message.dataset.id === messageId) {
//             message.remove();
//         }
//     });
// });

// // Form submit event listener
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const message = messageInput.value;
//     const messageId = Date.now().toString();
//     appendMessage(`You: ${message}`, 'right', messageId, true);
//     socket.emit('send', { message, messageId });
//     messageInput.value = '';
// });





























































// const socket = io('http://localhost:8000'); // Connect to the server
// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector(".container");
// var audio = new Audio("ting.mp3"); // Corrected the path to the audio file

// // Prompt user to enter their name and show the Name when User enter a new
// const userName = prompt("Enter your name to join");
// console.log("New User", userName)
// socket.emit('new-user-joined', userName);

// // Append message to the message container
// // jo bhi message hai container me rahe
// const appendMessage = (message, position) => {
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messageContainer.append(messageElement);
//     if(position == 'left' ){
//         audio.play();
//     }
// };

// // Agar koi Join Kiya to Ye bataye ki Koi join kiya hai chat ko
// socket.on('user-joined', name => {
//     appendMessage(`${name} joined the chat`, 'right');
// });

// // Handle receive message event
// socket.on('receive', data => {
//     appendMessage(`${data.name}: ${data.message}`, 'left');
// });

// // Handle user left event when user left the chat then it shows to other participants taht the left chat
// socket.on('user-left', name => {
//     appendMessage(`${name} left the chat`, 'right');
// });

// // Form submit event listener
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // eske use se reload nahiu hoga page apka
//     const message = messageInput.value;
//     appendMessage(`You: ${message}`, 'right');
//     // upar Template Literal Ka use kiye hai Jisase ..
//     // Variable ko bich me dal sakte hai
//     socket.emit('send', message);
//     messageInput.value = '';
// });





