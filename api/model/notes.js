//init
const mongoose = require("mongoose");

//Schema
const notesSchema = new mongoose.Schema({
	title: String,
	note: {
		type: String,
		required: true,
	},
	pinned: {
		type: Boolean,
		default: false,
	},
	dateCreated: {
		type: Date,
		default: Date.now(),
	},
});

//Model Export
module.exports = mongoose.model("notes", notesSchema);
