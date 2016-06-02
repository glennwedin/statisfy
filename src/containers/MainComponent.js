import React from "react";
import { Link } from "react-router";
import { Provider } from 'react-redux';
import { getStats } from '../actions/actions';
import store from '../stores/Store';
import TopMenu from '../components/TopMenu';

class MainComponent extends React.Component {

	constructor (props) {
		super(props);
	}

	componentDidMount() {
		//console.log('test')
		store.dispatch(getStats('glennwedin'));
	}

	render () {
		return (
				<Provider store={store}>
					<html lang="en">
					<head>
						<meta charSet="UTF-8" />
						<title>Simple-isomorphic-react-boilerplate</title>
					</head>
					<body>
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