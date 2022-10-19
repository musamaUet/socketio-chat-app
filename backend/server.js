const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
const { Socket } = require('socket.io');

dotenv.config();

connectDB();
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
	console.log(`App is listening on PORT ${port}`);
});

const io = require('socket.io')(server, {
	pingTimeout: 60000, // 60s
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log('connected to socket.io');
	socket.on('setup', (userData) => {
		socket.join(userData._id);
		socket.emit('connection');
	});

	socket.on('join-chat', (room) => {
		socket.join(room);
		console.log('user joined room with chatId', room);
	});

	socket.on('typing', (room) => socket.in(room).emit('typing'));
	socket.on('stop-typing', (room) => socket.in(room).emit('stop-typing'));

	socket.on('new-message', (newMessageReceived) => {
		console.log('new-message', newMessageReceived);
		var chat = newMessageReceived.chat;
		if (!chat.users) return;

		chat.users.forEach((user) => {
			if (user == newMessageReceived.sender._id) return;
			console.log('not returned', user);
			socket.in(user).emit('message-received', newMessageReceived);
		});
	});
	socket.off('setup', () => {
		console.log('USER DISCONNECTED!'.red.bold());
		socket.leave(userData._id);
	});
});
