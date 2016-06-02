import React from 'react';
import { connect } from 'react-redux';
import UserStats from '../components/UserStats';
import AlbumStats from '../components/AlbumStats';

class UserComponent extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<section className="row">
				<div className="small-12 columns">
					<h1>My top tracks</h1>
					<UserStats />
					<AlbumStats />
				</div>
			</section>
		)
	}
}

UserComponent = connect(state => state)(UserComponent)
export default UserComponent;