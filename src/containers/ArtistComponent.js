import React from 'react';
import { connect } from 'react-redux';
import ArtistStats from '../components/ArtistStats';
import { getTopArtists } from '../actions/actions';

class ArtistComponent extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			page: 1
		}
	}

	componentDidMount() {
		if(this.props.location.query.page) {
			this.setState({
				page: this.props.location.query.page
			});
		}

		if(this.props.user.username) {
			this.props.dispatch(getTopArtists(this.props.user.username));
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.user.username !== this.props.user.username) {
			this.props.dispatch(getTopArtists(this.props.user.username));
		}
	}

	render () {
		let page = 1;
		if(this.props.location.query.page) {
			page = this.props.location.query.page;
		}
		return (
			<section className="row">
				<div className="small-12 columns">
					<h1>My artists</h1>
					<p>This list may take some time to load and refresh depending on the number of artists in your database</p>
					<ArtistStats page={page}/>
				</div>
			</section>
		)
	}
}

ArtistComponent = connect(state => state)(ArtistComponent)
export default ArtistComponent;
