//init
import React, { useState, useEffect } from "react";
import { fetch } from "../actions";

//Importing Components
import Nav from "./Nav";
import Input from "./Input";
import Cards from "./Cards";
import Update from "./Update";

//Component
function Notes() {
	//Initializing States
	let [card, setCard] = useState([]); //This will get all data from db and send to card component via props
	let [reload, setReload] = useState(0); //We are tracking this in useEffect hook so if this change the component will reload

	//if User click on edit we will update this state with that note's credentials
	let [update, setUpdate] = useState({
		status: 0,
		id: "",
		title: "",
		note: "",
	});

	//useEffect hook to fetch data from API via actions.js
	useEffect(() => {
		fetch(setCard);
	}, [reload]);

	//filtering pinned and other notes
	let pinned = card.filter((status) => {
		return status.pinned === true;
	});

	let others = card.filter((status) => {
		return status.pinned === false;
	});

	//This function will reload the component
	function handleReload() {
		setReload((prev) => ++prev);
	}

	//This onClick function on edit, This function will update the update State with that note's credentials
	const handleUpdateStatus = (id, title, note) => {
		//This will set all card's display to inline block so then previouse actions set to default
		let all = document.getElementsByClassName("card");
		for (var i = 0; i < all.length; i++) {
			all[i].style.display = "inline-block";
		}

		//This will set the display to none on that note that has to edit
		document.getElementById(id).style.display = "none";

		//Update the state with credentials
		setUpdate((prev) => {
			return {
				status: prev.status + 1,
				id: id,
				title: title,
				note: note,
			};
		});
	};

	//Returning all components
	return (
		<React.Fragment>
			<Nav />

			{/* We are checking if user clicked on edit then we will show Update component and by default Input component will run */}
			{update.status !== 0 ? (
				<Update
					handleReload={handleReload}
					id={update.id}
					title={update.title}
					note={update.note}
					update={update}
					setUpdate={setUpdate}
				/>
			) : (
				<Input handleReload={handleReload} />
			)}

			{/* Sending data that we got from database, And it will call the function after any update to reload */}

			<div className="cards-container">
				{pinned.length === 0 ? null : (
					<div className="pinned-container">
						<p className="pinned-title">PINNED</p>
						{pinned.map((data, index) => {
							return (
								<Cards
									handleReload={handleReload}
									handleUpdateStatus={handleUpdateStatus}
									key={index}
									id={data._id}
									title={data.title}
									note={data.note}
									pinned={data.pinned}
								/>
							);
						})}
						<p className="others-title">OTHERS</p>
					</div>
				)}
				<div className="Others-container">
					{others.map((data, index) => {
						return (
							<Cards
								handleReload={handleReload}
								handleUpdateStatus={handleUpdateStatus}
								key={index}
								id={data._id}
								title={data.title}
								note={data.note}
								pinned={data.pinned}
							/>
						);
					})}
				</div>
			</div>
		</React.Fragment>
	);
}

//Export
export default Notes;
