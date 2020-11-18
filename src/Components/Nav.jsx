//init
import React from "react";
import { Link } from "react-router-dom";
import { handleSearch } from "../actions";

//Component
function Nav() {
	return (
		<nav>
			<div className="logo">
				<Link to="/">
					<span>Magic Notes</span>
				</Link>
			</div>
			<div className="search">
				<input
					type="text"
					id="search"
					placeholder="Search"
					onChange={handleSearch}
				/>
				{/* <Link to="/logout">Logout</Link> */}
			</div>
		</nav>
	);
}

//Export
export default Nav;
