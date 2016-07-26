import React from "react";
import { Link } from "react-router";
import { Provider } from 'react-redux';

import store from '../stores/Store';
import { setUser } from '../actions/actions';
import TopMenu from '../components/TopMenu';
import LocalDatabase from '../data/LocalDatabase';

class MainComponent extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			loading: store.getState().stats.isFetching,
		}
	}

	componentDidMount() {
		store.subscribe(() => {
			this.setState({
				loading: store.getState().stats.isFetching,
				username: store.getState().user.username
			})
		});
		let username = this.checkUsername();
		if(username) {
			store.dispatch(setUser(username));
		} else {
			let db = new LocalDatabase();
			db.resetTopArtists();
		}
	}

	checkUsername() {
		if(window.localStorage.getItem('statisfy:username')) {
			return window.localStorage.getItem('statisfy:username');
		}
		return false;
	}

	setUsername () {
		let username = document.getElementById('username').value;
		window.localStorage.setItem('statisfy:username', username);
		store.dispatch(setUser(username));
	}

	onEnter (e) {
		if(e.which === 13) {
			document.getElementById('ok-button').click();
		}
	}

	render () {
		/*
		let loadingScreen = "";
		if(this.state.loading) {
			loadingScreen = <div className="loading"><div className="loader"></div></div>
		}
		*/

		let nope = "";
		if(!this.state.username) {
			nope = (
				<div className="nope_username">
					<div className="row">
						<div className="small-1 medium-4 columns">
							&nbsp;
						</div>
						<div className="small-10 medium-4 columns">
							<h1>Statisfy</h1>
							<input id="username" type="text" placeholder="LastFM username" onKeyPress={this.onEnter.bind(this)} />
							<button id="ok-button" className="button" onClick={this.setUsername.bind(this)}>OK!</button>
						</div>
						<div className="small-1 medium-4 columns">
							&nbsp;
						</div>
					</div>
				</div>
			)
		}
		//{loadingScreen}
		return (
				<Provider store={store}>
					<html lang="en">
					<head>
						<meta charSet="UTF-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
						<title>Statisfy</title>
					</head>
					<body>
						{nope}
						<TopMenu />
						<div id="app">{this.props.children}</div>
						<script type="text/javascript" src="http://localhost:3002/js/app.js"></script>
						</body>
					</html>
				</Provider>
			);
	}
}
export default MainComponent;
