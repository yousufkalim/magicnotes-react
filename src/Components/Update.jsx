//init
import React, { useState, useEffect } from "react";
import { handleInput, handleUpdate } from "../actions";

//Material Content
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

//Component
function Input(props) {
	//Intializing States
	let [note, setNote] = useState({ title: "", note: "" });
	let [error, setError] = useState("");

	//this useEffect hook will track the update state in Notes.js and will assign the data to note state to show values in input tag
	useEffect(() => {
		setNote({ title: props.title, note: props.note });
	}, [props.update]);

	//Returning component
	return (
		<section>
			<div className="input-container">
				<form
					onSubmit={(e) =>
						handleUpdate(
							props.id,
							note,
							setNote,
							setError,
							props.handleReload,
							props.setUpdate,
							e
						)
					}
					style={error !== "" ? { border: "2px solid red" } : null}
				>
					<input
						type="text"
						name="title"
						placeholder="Title"
						value={note.title}
						onChange={(e) => handleInput(e, setNote)}
					/>
					<textarea
						cols="30"
						rows="5"
						name="note"
						placeholder="Take a note..."
						value={note.note}
						onChange={(e) => handleInput(e, setNote)}
					/>
					{error ? (
						<span className="create-error">
							Note Cannot be Empty
						</span>
					) : null}
					<Button type="submit">
						<AddIcon />
					</Button>
				</form>
			</div>
		</section>
	);
}

//Export
export default Input;
