//Init
require("./database");
const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const notes = require("./controller/notes");
const port = process.env.PORT || 5000;

//Using build for production
if (process.env.NODE_ENV === "production") {
	app.use(express.static("/client/build"));
}

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

//Routes
app.use("/", notes);

//Server Listening
app.listen(port, () => {
	console.log(`Server is running at port ${port}`);
});
