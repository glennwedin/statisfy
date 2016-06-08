import React from 'react';
import { connect } from 'react-redux';

class UserStats extends React.Component {

	componentDidMount() {
		    
	}

	showOptions (e) {
		let tr = e.target;

	}

	render () {
		let list = [];

		if(this.props.stats.userstats.toptracks) {
			let trackstat = this.props.stats.userstats.toptracks;
			list = trackstat.track.map((el, i) => {
				return (
					<div key={i} onClick={this.showOptions.bind(this)} className="tr">
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
			<div className="list">
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

UserStats = connect(state => state)(UserStats);
export default UserStats;