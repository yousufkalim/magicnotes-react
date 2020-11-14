import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

function Input() {
	return (
		<section>
			<div className="input-container">
				<form>
					<input type="text" name="title" placeholder="Title" />
					<textarea
						cols="30"
						rows="5"
						name="note"
						placeholder="Take a note..."
					/>
					<Button>
						<AddIcon />
					</Button>
				</form>
			</div>
		</section>
	);
}

export default Input;
