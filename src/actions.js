import React, { useState } from "react";
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
function handleSubmit(note, setNote, setError, setUpdate, e) {
	e.preventDefault();
	axios
		.post("http://localhost:5000/notes", {
			withCredentials: true,
			data: note,
		})
		.then(() => {
			setUpdate((prev) => ++prev);
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

function fetch() {
	const data = [];

	return axios
		.get("http://localhost:5000/notes")
		.then((res) => {
			data.push(...res.data);
			return data;
		})
		.catch((err) => console.log(err));
}

/*
================
Delete Request
================
*/

function handleDelete(id, setUpdate) {
	axios
		.delete(`http://localhost:5000/notes/${id}`)
		.then(() => setUpdate((prev) => ++prev))
		.catch((err) => console.log(err));
}

//Function Export
export { handleInput, handleSubmit, fetch, handleDelete };
