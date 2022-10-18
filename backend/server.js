const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');

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
		socket.emit('connecttion');
	});

	socket.on('join-chat', (room) => {
		socket.join(room);
		console.log('user joined room with chatId', room);
	});

	socket.on('new-message', (newMessageReceived) => {
		var chat = newMessageReceived.chat;
		if (!chat.users) return console.log('chat.users not defined');

		chat.users.forEach((user) => {
			if (user._id == newMessageReceived.sender._id) return;

			socket.in(user._id).emit('message received');
		});
	});
});
