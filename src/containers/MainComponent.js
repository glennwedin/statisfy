import React from "react";
import { Link } from "react-router";
import { Provider } from 'react-redux';

import store from '../stores/Store';
import TopMenu from '../components/TopMenu';

class MainComponent extends React.Component {

	constructor (props) {
		super(props);
		
		this.state = {
			loading: store.getState().stats.isFetching
		}
	}

	componentDidMount() {
		//console.log('test')
		store.subscribe(() => {
			this.setState({
				loading: store.getState().stats.isFetching
			})
		});
	}

	render () {
		let loadingScreen = "";
		if(this.state.loading) {
			loadingScreen = <div className="loading">LOADING</div>
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