//init
import React from "react";
import { handleDelete } from "../actions";

//Material UI
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

//Component
function Cards(props) {
	return (
		<React.Fragment>
			<>
				<div className="card">
					<h2>{props.title}</h2>
					<p>{props.note}</p>

					<div className="card-btn">
						<Button
							className="edit-btn"
							onClick={() =>
								props.handleUpdateStatus(
									props.id,
									props.title,
									props.note
								)
							}
						>
							<EditIcon />
						</Button>
						<Button
							className="del-btn"
							onClick={() =>
								handleDelete(props.id, props.handleReload)
							}
						>
							<DeleteIcon />
						</Button>
					</div>
				</div>
			</>
		</React.Fragment>
	);
}

export default Cards;
