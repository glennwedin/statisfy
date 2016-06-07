import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class TopAlbums extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render() {
		console.log('albums', this.props)
		let list = [];

		if(this.props.stats.userstats.topalbums) {
			let albumstat = this.props.stats.userstats.topalbums;
			list = albumstat.album.map((el, i) => {
				return (
					<div key={i} className="tr">
						<div className="td">
							<div style={styles(el.image[1]['#text'])}></div>
						</div>
						<div className="td">
							<div className="tablepad">
								{el.name}<br />
								<strong>{el.artist.name}</strong>
							</div>
						</div>
						<div className="td">
							{el.playcount}
						</div>
					</div>
				)
			});
		}

		return (
			<div className="">
				<div className="table">
					<div className="tbody">
						{list}
					</div>
				</div>
			</div>
		)
	}
}

let styles = (img) => {
	return {
		width: "50px",
		height: "50px",
		backgroundSize: 'cover',
		backgroundImage: 'url('+img+')'
	}
}

TopAlbums = connect(state => state)(TopAlbums)
export default TopAlbums;