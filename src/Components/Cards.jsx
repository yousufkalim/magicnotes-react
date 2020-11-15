import React, { useState, useEffect } from "react";
import axios from "axios";

//Material UI
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function Cards(props) {
	let [card, setCard] = useState([]);

	useEffect(() => {
		const fetch = async () => {
			const res = await axios.get("http://localhost:5000/notes");
			console.log(res.data);
			setCard([...res.data]);
		};
		fetch();
	}, []);

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
								<Button className="del-btn">
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
