import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

//Material Content
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

function Input() {
	//Intializing States
	let [note, setNote] = useState({ title: "", note: "" });

	//When user click on note textarea then have to expand with title and btn
	let [expand, setExpand] = useState(false);

	//Initializing History
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
					{expand ? (
						<input
							type="text"
							name="title"
							placeholder="Title"
							value={note.title}
							onChange={handleInput}
						/>
					) : null}
					<textarea
						cols="30"
						rows="5"
						name="note"
						placeholder="Take a note..."
						value={note.note}
						onChange={handleInput}
						onClick={() => setExpand(true)}
						required
					/>
					{expand ? (
						<Button type="submit">
							<AddIcon />
						</Button>
					) : null}
				</form>
			</div>
		</section>
	);
}

export default Input;
