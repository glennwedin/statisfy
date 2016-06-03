import React from 'react';
import { connect } from 'react-redux';

class LatestStats extends React.Component {

	componentDidMount() {
		    
	}

	showOptions (e) {
		let tr = e.target;

	}

	render () {
		let list = [];

		if(this.props.stats.userstats.recenttracks) {
			let trackstat = this.props.stats.userstats.recenttracks;
			list = trackstat.track.map((el, i) => {
				let date = "";

				if(el['@attr']) {
					date = "Playing now";
				} else if(el.date) {
					date = el.date['#text'];
				}
				return (
					<div key={i} onClick={this.showOptions.bind(this)} className="tr">
						<div className="td">
							<div style={styles(el.image[1]['#text'])}></div>
						</div>
						<div className="td">
							<div className="tablepad">
								{el.name}<br />
								<strong>{el.artist['#text']}</strong>
							</div>
						</div>
						<div className="td">
							{date}
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

LatestStats = connect(state => state)(LatestStats);
export default LatestStats;