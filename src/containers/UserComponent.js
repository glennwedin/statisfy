import React from 'react';
import { connect } from 'react-redux';
import UserStats from '../components/UserStats';
import LatestStats from '../components/LatestStats';
import { getStats } from '../actions/actions';

class UserComponent extends React.Component {

	constructor (props) {
		super(props);
		
	}

	componentDidMount() {
		if(this.props.user.username) {
			this.props.dispatch(getStats(this.props.user.username));
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.user.username !== this.props.user.username) {
			this.props.dispatch(getStats(this.props.user.username));
		}
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
					<LatestStats />
				</div>
			</section>
		)
	}
}

UserComponent = connect(state => state)(UserComponent)
export default UserComponent;