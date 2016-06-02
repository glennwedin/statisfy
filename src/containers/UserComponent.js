import React from 'react';
import { connect } from 'react-redux';
import UserStats from '../components/UserStats';
import { getStats } from '../actions/actions';

class UserComponent extends React.Component {

	constructor (props) {
		super(props);
		
	}

	componentDidMount() {
		this.props.dispatch(getStats('glennwedin'));
	}

	render () {
		return (
			<section className="row">
				<div className="small-12 medium-4 columns">
					<h1>My top tracks</h1>
					<UserStats />
				</div>
				<div className="small-12 medium-4 columns">
					<h1>Userfeed</h1>
				</div>
			</section>
		)
	}
}

UserComponent = connect(state => state)(UserComponent)
export default UserComponent;