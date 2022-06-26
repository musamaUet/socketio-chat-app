const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const connectionObj = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(
			`Mongodb Connected ${connectionObj.connection.host} `.bgBlue.bold
		);
	} catch (error) {
		console.error(`MongoDB Connection Error! ${error.message}`.red.bold);
		process.exit();
	}
};

module.exports = connectDB;
