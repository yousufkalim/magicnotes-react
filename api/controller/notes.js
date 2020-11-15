//init
const router = require("express").Router();
const notes = require("../model/notes");

//Routes

//CREATE
router.post("/notes", (req, res) => {
	if (!req.body.data.note) {
		res.status(422).json({ error: "Data Validation Failed" });
	} else {
		const { title, note } = req.body.data;
		notes.create(
			{
				title: title ? title : "Untitled",
				note: note,
			},
			(err, data) => {
				if (err) {
					res.status(500).json({
						error: "Internal server error",
					});
				}
				res.status(200).json(data);
			}
		);
	}
});

//Read
router.get("/notes", (req, res) => {
	notes.find((err, data) => {
		if (err) {
			res.status(500).json({ error: "Inetrnal server error" });
		} else {
			res.status(200).send(data);
		}
	});
});

//Delete
router.delete("/notes/:id", (req, res) => {
	const id = req.params.id;
	notes.findByIdAndDelete(id, (err, data) => {
		if (err) {
			res.status(500).json({ error: "Inetrnal server error" });
		} else {
			res.status(200).json(data);
		}
	});
});

//Router Export
module.exports = router;
