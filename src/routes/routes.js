import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import MainComponent from "../containers/MainComponent";
import UserComponent from "../containers/UserComponent";
import ArtistComponent from "../containers/ArtistComponent";
//import FriendComponent from "../containers/FriendComponent";
//<Route path="/friends" component={FriendComponent}/>

var mainroute = (history) => {
	history = history || null;
	return (
		<Router history={history}>
			<Route path="/" component={MainComponent} >
				<IndexRoute component={UserComponent} />
				<Route path="/artists" component={ArtistComponent}/>
				<Route path="/recommendations" component={UserComponent}/>
				
			</Route>
		</Router>
	);
};

export default mainroute;