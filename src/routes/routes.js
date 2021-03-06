import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import MainComponent from "../containers/MainComponent";
import UserComponent from "../containers/UserComponent";
import ArtistComponent from "../containers/ArtistComponent";
import FriendsComponent from "../containers/FriendsComponent";
import ArtistInfoComponent from "../containers/ArtistInfoComponent";
import AlbumInfoComponent from "../containers/AlbumInfoComponent";
import TrackInfoComponent from "../containers/TrackInfoComponent";

var mainroute = (history) => {
	history = history || null;

	return (
		<Router history={history}>
			<Route path="/" component={MainComponent} >
				<IndexRoute component={UserComponent} />
				<Route path="/artists" component={ArtistComponent}/>
				<Route path="/recommendations" component={UserComponent}/>
				<Route path="/friends" component={FriendsComponent}/>
				<Route path="/artist/:id" component={ArtistInfoComponent} />
				<Route path="/album/:artist/:id" component={AlbumInfoComponent} />
				<Route path="/track/:artist/:id" component={TrackInfoComponent} />
			</Route>
		</Router>
	);
};

export default mainroute;
