import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setUser } from '../actions/actions';

class TopMenu extends React.Component {

	constructor (props) {
		super(props);
	}

	leave(e) {
		e.preventDefault();
		window.localStorage.removeItem('statisfy:username');
		this.props.dispatch(setUser(null));
		browserHistory.push('/');
	}

	render () {
		return (
			<div className="topmenu">
				<div className="row">
					<div className="small-6 columns">
						<div className="title">Statisfy</div>
					</div>
					<div className="small-6 columns">
						<nav className="menu">
							<ul>
								<li>
									<Link to="/">Main stats</Link>
								</li>
								<li>
									<Link to="/artists">My artists</Link>
								</li>
								<li>
									<a href="" onClick={this.leave.bind(this)}>Leave this user</a>
								</li>
								<li>
									<Link to="/"></Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		)
	}
}


TopMenu = connect(state => state)(TopMenu);
export default TopMenu;