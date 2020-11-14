import React from "react";
import { Link } from "react-router-dom";

function Nav() {
	return (
		<nav>
			<div className="logo">
				<Link to="/">
					<span>Magic Notes</span>
				</Link>
				<a href="#">Home</a>
			</div>
			<div className="search">
				<input type="text" id="search" placeholder="Search" />
				<Link to="/logout">Logout</Link>
			</div>
		</nav>
	);
}

export default Nav;
