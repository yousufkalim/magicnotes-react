//init
const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const notes = require("../model/notes");

//Routes

//CREATE
router.post(
	"/notes",
	[check("title").trim(), check("note").not().isEmpty().trim()],
	(req, res) => {
		const validationError = validationResult(req);
		if (!validationError.isEmpty()) {
			res.status(422).json({ error: "Validation Failed" });
		} else {
			const { title, note } = req.body;
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
	}
);

//Read
router.get("/notes", (req, res) => {
	notes.find((err, data) => {
		if (err) {
			res.status(500).json({ error: "Inetrnal server error" });
		} else {
			res.status(200).json(data);
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
