import React, { useState, useEffect } from "react";
import axios from "axios";

//Material UI
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function Cards() {
	let [card, setCard] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/notes")
			.then((res) => setCard([...res.data]))
			.catch((err) => console.log(err));
	}, []);

	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:5000/notes/${id}`)
			.then(() => window.location.reload())
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
