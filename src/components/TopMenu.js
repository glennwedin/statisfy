import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class TopMenu extends React.Component {
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
									<Link to="/"></Link>
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

function mapStateToProps(state) {
	return { todos: state.todos }
}

TopMenu = connect(mapStateToProps)(TopMenu);
export default TopMenu;