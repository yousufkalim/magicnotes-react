import React, { useState } from "react";
import { handleInput, handleSubmit } from "../actions";

//Material Content
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

function Input(props) {
	//Intializing States
	let [note, setNote] = useState({ title: "", note: "" });
	let [error, setError] = useState("");

	//When user click on note textarea then have to expand with title and btn
	let [expand, setExpand] = useState(false);

	//Returning component
	return (
		<section>
			<div className="input-container">
				<form
					onSubmit={(e) => handleSubmit(note, setNote, setError, e)}
					style={error !== "" ? { border: "2px solid red" } : null}
				>
					{expand ? (
						<input
							type="text"
							name="title"
							placeholder="Title"
							value={note.title}
							onChange={(e) => handleInput(e, setNote)}
						/>
					) : null}
					<textarea
						cols="30"
						rows="5"
						name="note"
						placeholder="Take a note..."
						value={note.note}
						onChange={(e) => handleInput(e, setNote)}
						onClick={() => setExpand(true)}
					/>
					{error ? (
						<span className="create-error">
							Note Cannot be Empty
						</span>
					) : null}
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
