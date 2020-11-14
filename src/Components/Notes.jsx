import React from "react";

//Components
import Nav from "./Nav";
import Input from "./Input";
import Cards from "./Cards";

function Notes() {
	return (
		<React.Fragment>
			<Nav />
			<Input />
			<section className="cards-container">
				<Cards />
			</section>
		</React.Fragment>
	);
}

export default Notes;
