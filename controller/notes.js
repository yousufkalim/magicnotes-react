//init
const router = require("express").Router();
const notes = require("../model/notes");

//Routes

//CREATE
router.post("/", (req, res) => {
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
router.get("/", (req, res) => {
	notes.find((err, data) => {
		if (err) {
			res.status(500).json({ error: "Internal server error" });
		} else {
			res.status(200).send(data);
		}
	});
});

//Update
router.put("/:id", (req, res) => {
	if (!req.body.data.note) {
		res.status(422).json({ error: "Data Validation Failed" });
	} else {
		let { title, note } = req.body.data;
		notes.findOneAndUpdate(
			{ _id: req.params.id },
			{ title: title ? title : "Untitled", note: note },
			(err, data) => {
				if (err) {
					res.status(500).json({ error: "Internal server error" });
				} else {
					res.status(200).send(data);
				}
			}
		);
	}
});

//Patch Request
//Patch req to update pinned status
router.patch("/:id", async (req, res) => {
	const id = req.params.id;
	const result = await notes.findById(id);
	if (!result) res.status(404).json({ error: "User not found" });
	notes.findByIdAndUpdate(
		result.id,
		{ pinned: result.pinned ? false : true },
		(err, data) => {
			if (err) res.status(500).json({ error: "Internal server error" });
			if (data) {
				res.status(200).send(data);
			}
		}
	);
});

//Delete
router.delete("/:id", (req, res) => {
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
