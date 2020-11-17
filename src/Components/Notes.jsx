//init
import React, { useState, useEffect } from "react";
import { fetch } from "../actions";

//Importing Components
import Nav from "./Nav";
import Input from "./Input";
import Cards from "./Cards";

//Component
function Notes() {
	//Initializing States
	let [card, setCard] = useState([]); //This will get all data from db and send to card component via props
	let [reload, setReload] = useState(0); //We are tracking this in useEffect hook so if this change the component will reload

	//useEffect hook to fetch data from API via actions.js
	useEffect(() => {
		fetch(setCard);
	}, [reload]);

	//This function will reload the component
	function handleReload() {
		setReload((prev) => ++prev);
	}

	//Returning all components
	return (
		<React.Fragment>
			<Nav />

			{/* When input submit the note then it will call this function to reload the component */}
			<Input handleReload={handleReload} />

			{/* Sending data that we got from database, And it will call the function after any update to reload */}
			{card.map((data, index) => {
				return (
					<Cards
						handleReload={handleReload}
						key={index}
						id={data._id}
						title={data.title}
						note={data.note}
					/>
				);
			})}
		</React.Fragment>
	);
}

//Export
export default Notes;
