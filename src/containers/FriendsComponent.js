import React from 'react';
import { connect } from 'react-redux';
import { getFriends } from '../actions/actions';

class FriendsComponent extends React.Component {

	constructor(props) {
		super(props);

		console.log('props', props)
	}

	componentDidMount() {
		if(this.props.user.username) {
			this.props.dispatch(getFriends(this.props.user.username));
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.user.username !== this.props.user.username) {
			this.props.dispatch(getFriends(this.props.user.username));
		}
	}

	render () {
		let friends = [];
		if(this.props.user.friends) {
			this.props.user.friends.map((f, i) => {
				console.log(f);
				let friend = (
						<div className="column artist-grid-item" style={{backgroundImage: 'url('+f.image[3]['#text']+')'}}>
							<div className="title">{f.name}</div>
						</div>
				)
				friends.push(friend)
			});
		}
 		return (
 			<section className="row">
				<div className="small-12 medium-8 columns">
					<h1>Friends</h1>
					<div className="friends small-up-3 medium-up-3 large-up-3">
						{friends}
					</div>
				</div>
				<div className="small-12 medium-1 columns">

				</div>
				<div className="small-12 medium-3 columns">

				</div>
			</section>
		)
	}

}

FriendsComponent = connect(state => state)(FriendsComponent)
export default FriendsComponent;
