import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ReactListScroll from 'reactlistscroll';
//import ReactListScroll from './scrolltest';

class TopAlbums extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}

	goTo(type, name, name2) {
		browserHistory.push('/'+type+'/'+name+'/'+name2);
	}

	render() {
		let list = [];

		if(this.props.stats.userstats.topalbums) {
			let albumstat = this.props.stats.userstats.topalbums;
			list = albumstat.album.map((el, i) => {
				return (
					<div key={i} onClick={this.goTo.bind(this, 'album', el.artist.name, el.name)} className="tr">
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

		if(this.props.stats.isFetching) {
			list = <div className=""><div className="loader"></div></div>
		}

		return (
			<ReactListScroll height="500">
				<div className="table">
					<div className="tbody">
						{list}
					</div>
				</div>
			</ReactListScroll>
		)
	}
}

let styles = (img) => {
	return {
		width: "50px",
		height: "50px",
		backgroundSize: 'cover',
		backgroundImage: 'url('+img+')',
		backgroundColor: '#333'
	}
}

TopAlbums = connect(state => state)(TopAlbums)
export default TopAlbums;
