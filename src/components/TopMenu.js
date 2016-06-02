import React from 'react';
import { connect } from 'react-redux';

class TopMenu extends React.Component {
	render () {
		return (
			<div className="row topmenu">
				<div className="small-12 columns">
					<div className="title">Statisfy</div>
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