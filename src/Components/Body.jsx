import React, { useState, useEffect } from "react";
import { fetch, handleDelete, handleInput, handleSubmit } from "../actions";

//Material UI
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

//Commponent
function Body() {
	//Initializing States
	//Input States
	let [note, setNote] = useState({ title: "", note: "" });
	let [error, setError] = useState("");

	//Cards State
	let [card, setCard] = useState([]);

	//Updated Stats, We will track this state to re render component after an action
	let [update, setUpdate] = useState(0);

	//When user click on note textarea then have to expand with title and btn
	let [expand, setExpand] = useState(false);

	//useEffect Hook to fetch data from API everytime when Page render
	useEffect(async () => {
		const data = await fetch();
		setCard([...data]);
	}, [update]);

	//Returning JSX
	return (
		<React.Fragment>
			{/* Input Section */}
			<section>
				<div className="input-container">
					<form
						onSubmit={(e) =>
							handleSubmit(note, setNote, setError, setUpdate, e)
						}
						// this error will show if there is some validation issue
						style={
							error !== "" ? { border: "2px solid red" } : null
						}
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

			{/* Cards Section */}
			<div className="cards-container">
				{card.map((data) => {
					return (
						<>
							<div className="card">
								<h2>{data.title}</h2>
								<p>{data.note}</p>

								<div className="card-btn">
									<Button className="edit-btn">
										<EditIcon />
									</Button>
									<Button
										className="del-btn"
										onClick={() =>
											handleDelete(data._id, setUpdate)
										}
									>
										<DeleteIcon />
									</Button>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</React.Fragment>
	);
}

export default Body;
