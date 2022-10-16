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

app.listen(port, () => {
	console.log(`App is listening on PORT ${port}`);
});
