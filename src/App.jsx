import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Style
import "./style/App.css";
import "./style/Nav.css";
import "./style/Input.css";
import "./style/Cards.css";

//Components
import Notes from "./Components/Notes";

//App Component
function App() {
	return (
		<Switch>
			<Route exact path="/" component={Notes} />
			<Redirect to="/" />
		</Switch>
	);
}

export default App;
