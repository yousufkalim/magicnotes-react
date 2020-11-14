import React from "react";

//Material UI
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function Cards() {
	return (
		<div className="card">
			<h2>My good note</h2>
			<p>Hello my name is yousuf kalim, this is a note written by me.</p>
			<div className="card-btn">
				<Button className="edit-btn">
					<EditIcon />
				</Button>
				<Button className="del-btn">
					<DeleteIcon />
				</Button>
			</div>
		</div>
	);
}

export default Cards;
