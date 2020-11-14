import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

//Material Content
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

function Input() {
	//Intializing States
	let [note, setNote] = useState({ title: "", note: "" });
	let history = useHistory();

	//Handle Input
	const handleInput = (e) => {
		setNote((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	//Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/notes", {
				withCredentials: true,
				data: note,
			})
			.then((res) => {
				history.push("/");
			})
			.catch((err) => {
				history.push({
					pathname: "/",
					state: "Note cannot be empty...",
				});
			});
	};

	//Returning component
	return (
		<section>
			<div className="input-container">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="title"
						placeholder="Title"
						value={note.title}
						onClick={handleInput}
					/>
					<textarea
						cols="30"
						rows="5"
						name="note"
						placeholder="Take a note..."
						value={note.note}
						onClick={handleInput}
						required
					/>
					<Button type="submit">
						<AddIcon />
					</Button>
				</form>
			</div>
		</section>
	);
}

export default Input;
