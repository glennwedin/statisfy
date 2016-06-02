import React from 'react';
import { connect } from 'react-redux';

class UserStats extends React.Component {

	componentDidMount() {
		    
	}

	render () {
		let list = [];

		if(this.props.stats.userstats.toptracks) {
			let trackstat = this.props.stats.userstats.toptracks;
			list = trackstat.track.map((el, i) => {
				return (
					<tr key={i}>
						<td>
							<div style={styles(el.image[1]['#text'])}></div>
						</td>
						<td>
							<div className="tablepad">
								{el.name}<br />
								<strong>{el.artist.name}</strong>
							</div>
						</td>
						<td>
							{el.playcount}
						</td>
					</tr>
				)
			});
		}

		return (
			<div className="">
				<table>
					<thead>
						<tr><th></th><th>Artist</th><th>Playcount</th></tr>
					</thead>
					<tbody>
						{list}
					</tbody>
				</table>
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