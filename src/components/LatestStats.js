import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { browserHistory } from 'react-router';
import ReactListScroll from 'reactlistscroll';

class LatestStats extends React.Component {

	componentDidMount() {
	}

	goTo(type, name, name2) {
		browserHistory.push('/'+type+'/'+name+'/'+name2);
	}

	render () {
		let list = [];

		if(this.props.stats.userstats.recenttracks) {
			let trackstat = this.props.stats.userstats.recenttracks;
			list = trackstat.track.map((el, i) => {
				let date = "",
				time = "";

				if(el['@attr']) {
					date = "Now";
				} else if(el.date) {
					if(moment(el.date['#text'], 'D MMM Y HH:mm').format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
						time = "";
						date = moment(el.date['#text'], 'D MMM Y HH:mm').format('HH:mm');
					} else {
						time = moment(el.date['#text'], 'D MMM Y HH:mm').format('HH:mm');
						date = moment(el.date['#text'], 'D MMM Y HH:mm').format('D. MMM');
					}
				}
				return (
					<div key={i} onClick={this.goTo.bind(this, 'track', el.artist['#text'], el.name)} className="tr">
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
							<div className="date">
								{time}<br />
								{date}
							</div>
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

LatestStats = connect(state => state)(LatestStats);
export default LatestStats;
