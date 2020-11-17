import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

/*
===============
Post Request
===============
*/

//Handel input
function handleInput(e, setNote) {
	setNote((prev) => {
		return {
			...prev,
			[e.target.name]: e.target.value,
		};
	});
}

//Handle Submit
function handleSubmit(note, setNote, setError, e) {
	e.preventDefault();
	axios
		.post("http://localhost:5000/notes", {
			withCredentials: true,
			data: note,
		})
		.then(() => {
			window.location.reload();
			setNote({ title: "", note: "" });
			setError("");
		})
		.catch((err) => {
			setError("Note Cannot be empty");
		});
}

/*
=================
Fetch Request
=================
*/

function fetch(setCard) {
	axios
		.get("http://localhost:5000/notes")
		.then((res) => setCard([...res.data]))
		.catch((err) => console.log(err));
}

/*
================
Delete Request
================
*/

function handleDelete(id, deleted, setDeleted) {
	axios
		.delete(`http://localhost:5000/notes/${id}`)
		.then(() => setDeleted(deleted + 1))
		.catch((err) => console.log(err));
}

//Function Export
export { handleInput, handleSubmit, fetch, handleDelete };
