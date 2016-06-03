import React from "react";
import { Link } from "react-router";
import { Provider } from 'react-redux';

import store from '../stores/Store';
import { setUser } from '../actions/actions';
import TopMenu from '../components/TopMenu';

class MainComponent extends React.Component {

	constructor (props) {
		super(props);
		
		this.state = {
			loading: store.getState().stats.isFetching,
		}
	}

	componentDidMount() {
		//console.log('test')
		store.subscribe(() => {
			this.setState({
				loading: store.getState().stats.isFetching,
				username: store.getState().user.username
			})
		});
	}

	setUsername() {
		let username = document.getElementById('username').value;
		store.dispatch(setUser(username));
	}

	render () {

		let loadingScreen = "";
		if(this.state.loading) {
			loadingScreen = <div className="loading">LOADING</div>
		}

		let nope = "";
		if(!this.state.username) {
			nope = (
				<div className="nope_username">
					<div className="row">
						<div className="small-4 columns">
							&nbsp;
						</div>
						<div className="small-4 columns">
							<input id="username" type="text" placeholder="LastFM username" />
							<button className="button" onClick={this.setUsername.bind(this)}>OK!</button>
						</div>
						<div className="small-4 columns">
							&nbsp;
						</div>
					</div>
				</div>
			)
		}
		return (
				<Provider store={store}>
					<html lang="en">
					<head>
						<meta charSet="UTF-8" />
						<title>Statisfy</title>
					</head>
					<body>
						{loadingScreen}
						{nope}
						<TopMenu />
						<div id="app">{this.props.children}</div>
						<script type="text/javascript" src="js/app.js"></script>
						</body>
					</html>
				</Provider>
			);
	}
}
export default MainComponent;