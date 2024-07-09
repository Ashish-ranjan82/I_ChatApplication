const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://127.0.0.1:5500', // Update this to your frontend origin
        methods: ['GET', 'POST'],
    }
});

// Middleware to handle CORS
app.use(cors()); // Use the CORS middleware

const users = {};

io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {
        users[socket.id] = name;
        console.log("New User Joined", name);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', (data) => {
        socket.broadcast.emit('receive', { message: data.message, name: users[socket.id], messageId: data.messageId });
    });

    socket.on('delete-message', (messageId) => {
        socket.broadcast.to(socket.id).emit('delete-message', messageId);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-left', users[socket.id]);
        delete users[socket.id];
    });
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});









// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors'); 

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: 'http://127.0.0.1:5500', // Update this to your frontend origin
//         methods: ['GET', 'POST'],
//     }
// });

// // Middleware to handle CORS
// app.use(cors()); 

// const users = {};

// io.on('connection', (socket) => {
//     socket.on('new-user-joined', (name) => {
//         users[socket.id] = name;
//         console.log("New User Joined", name);
//         socket.broadcast.emit('user-joined', name);
//     });

//     socket.on('send', (data) => {
//         socket.broadcast.emit('receive', { message: data.message, name: users[socket.id], messageId: data.messageId });
//     });

//     socket.on('delete-message', (messageId) => {
//         socket.broadcast.to(socket.id).emit('delete-message', messageId);
//     });

//     socket.on('disconnect', () => {
//         socket.broadcast.emit('user-left', users[socket.id]);
//         delete users[socket.id];
//     });
// });

// const PORT = 8000;
// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });





















































// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: 'http://127.0.0.1:5500', // Update this to your frontend origin
//         methods: ['GET', 'POST'],
//     }
// });

// // Middleware to handle CORS
// app.use(cors()); // Use the CORS middleware

// const users = {};

// io.on('connection', (socket) => {
//     socket.on('new-user-joined', (name) => {
//         users[socket.id] = name;
//         console.log("New User Joined", name);
//         socket.broadcast.emit('user-joined', name);
//     });

//     socket.on('send', (message) => {
//         socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
//     });

//     socket.on('disconnect', () => {
//         socket.broadcast.emit('user-left', users[socket.id]);
//         delete users[socket.id];
//     });
// });

// const PORT = 8000;
// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });


