import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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
				let date = "",
				time = "";

				if(el['@attr']) {
					date = "Now";
				} else if(el.date) {
					//console.log(el.date['#text'], moment(el.date['#text'], 'D MMM Y HH:mm').format('DD.MM.YYYY - HH:mm'));
					if(moment(el.date['#text'], 'D MMM Y HH:mm').format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
						time = "";
						date = moment(el.date['#text'], 'D MMM Y HH:mm').format('HH:mm');
					} else {
						time = moment(el.date['#text'], 'D MMM Y HH:mm').format('HH:mm');
						date = moment(el.date['#text'], 'D MMM Y HH:mm').format('D. MMM');
					}
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
							<div className="date">
								{time}<br />
								{date}
							</div>
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