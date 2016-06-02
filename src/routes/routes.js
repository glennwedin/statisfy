import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import MainComponent from "../containers/MainComponent";
import UserComponent from "../containers/UserComponent";

var mainroute = (history) => {
	history = history || null;
	return (
		<Router history={history}>
			<Route path="/" component={MainComponent} >
				<IndexRoute component={UserComponent} />
				<Route path="/albums" component={UserComponent}/>
				<Route path="/stream" component={UserComponent}/>
			</Route>
		</Router>
	);
};

export default mainroute;