import React from 'react';
import { connect } from 'react-redux';
import ArtistStats from '../components/ArtistStats';
import { getTopArtists } from '../actions/actions';

class ArtistComponent extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			page: 1,
			username: 'draugon'
		}
	}

	componentDidMount() {
		if(this.props.location.query.page) {
			this.setState({
				page: this.props.location.query.page
			}, () => {
				this.props.dispatch(getTopArtists(this.state.username, 24, this.state.page));
			});
		} else {
			this.props.dispatch(getTopArtists(this.state.username, 24, this.state.page));
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
					<ArtistStats page={page}/>
				</div>
			</section>
		)
	}
}

ArtistComponent = connect(state => state)(ArtistComponent)
export default ArtistComponent;