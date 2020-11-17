import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetch } from "../actions";

//Material UI
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function Cards() {
	let [card, setCard] = useState([]);
	let [deleted, setDeleted] = useState(0);

	useEffect(() => {
		fetch(setCard);
	}, [deleted]);

	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:5000/notes/${id}`)
			.then(() => setDeleted(deleted + 1))
			.catch((err) => console.log(err));
	};

	return (
		<React.Fragment>
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
									onClick={() => handleDelete(data._id)}
								>
									<DeleteIcon />
								</Button>
							</div>
						</div>
					</>
				);
			})}
		</React.Fragment>
	);
}

export default Cards;
