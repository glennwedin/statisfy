import React from 'react';
import { connect } from 'react-redux';

class AlbumStats extends React.Component {

	componentDidMount() {
		    
	}

	render () {
		return (
			<div></div>
		)
	}
}

AlbumStats = connect(state => state)(AlbumStats);
export default AlbumStats;