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
function handleSubmit(note, setNote, setError, handleReload, e) {
	e.preventDefault();
	axios
		.post("http://localhost:5000/notes", {
			withCredentials: true,
			data: note,
		})
		.then(() => {
			handleReload();
			setNote({ title: "", note: "" });
			setError("");
		})
		.catch((err) => {
			setError("Note Cannot be empty");
		});
}

//Handle Update
function handleUpdate(id, note, setError, handleReload, setUpdate, e) {
	e.preventDefault();
	axios
		.put(`http://localhost:5000/notes/${id}`, {
			withCredentials: true,
			data: note,
		})
		.then(() => {
			handleReload();
			setUpdate({
				status: 0,
				id: "",
				title: "",
				note: "",
			});
			//This will set back the property display of note to inline-block
			document.getElementById(id).style.display = "inline-block";
		})
		.catch(() => {
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
		//Reversing the array to sort note by date added
		.then((res) => setCard([...res.data.reverse()]))
		.catch((err) => console.log(err));
}

/*
================
Delete Request
================
*/

function handleDelete(id, handleReload) {
	axios
		.delete(`http://localhost:5000/notes/${id}`)
		.then(() => handleReload())
		.catch((err) => console.log(err));
}

/*
=================
Handle Search
=================
*/

function handleSearch(e) {
	//Getting Value from input element
	let inputVal = e.target.value.toLowerCase();

	//Getting all notes from page
	let noteCard = document.getElementsByClassName("card");

	//forEach function to search
	Array.from(noteCard).forEach((element) => {
		//Getting note title
		let titleTxt = element
			.getElementsByTagName("h2")[0]
			.innerText.toLowerCase();

		//Getting note
		let noteTxt = element
			.getElementsByTagName("p")[0]
			.innerText.toLowerCase();

		//Searching
		if (titleTxt.includes(inputVal) || noteTxt.includes(inputVal)) {
			element.style.display = "inline-block";
		} else {
			element.style.display = "none";
		}
	});
}

/*
==================
Handle Pinned
==================
*/

function handlePinned(id, handleReload) {
	axios
		.patch(`http://localhost:5000/notes/${id}`)
		.then(() => {
			handleReload();
		})
		.catch((err) => console.log(err));
}

/*
====================
Functions Export
====================
*/

export {
	handleInput,
	handleSubmit,
	handleUpdate,
	fetch,
	handleDelete,
	handleSearch,
	handlePinned,
};
