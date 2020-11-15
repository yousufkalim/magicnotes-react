const mongoose = require("mongoose");
const db_url = process.env.DB_URL;

mongoose
	.connect(db_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("We are connected with database");
	});
