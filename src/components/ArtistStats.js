import React from 'react';
import { connect } from 'react-redux';

class ArtistStats extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			page: props.page
		}
	}

	componentDidMount() {
	}

	setPage() {

	}

	pagination() {
		if(this.props.stats.topartiststats.artist) {
			let totalPages = this.props.stats.topartiststats['@attr'].totalPages;

			let first = [],
				middle = [],
				last = [];

			for(let x = 1; x <= 5; x++) {
				first.push(<div className="p">{x}</div>)
			}
			for(let x = (totalPages/2 - 5); x < totalPages/2; x++) {
				middle.push(<div className="p">{x}</div>)
			}
			for(let x = (totalPages - 5); x < totalPages; x++) {
				last.push(<div className="p">{x}</div>)
			}

			return (
				<div className="pagination">
					<div className="pagination-section"><div className="p">Previous</div></div>
					<div className="pagination-section">{first}</div>
					<div className="pagination-section pagination-separator"> - - -</div>
					<div className="pagination-section">{middle}</div>
					<div className="pagination-section pagination-separator"> - - -</div>
					<div className="pagination-section">{last}</div>
					<div className="pagination-section"><div className="p">Next</div></div>
				</div>
			)
		} else {
			return <div></div>
		}
	}

	render () {
		let artistGrid = "";
		if(this.props.stats.topartiststats.artist) {
			artistGrid = this.props.stats.topartiststats.artist.map((a, i) => {
				console.log(a)
				return (
					<div className="column artist-grid-item" style={{backgroundImage:'url('+a.image[2]['#text']+')'}} key={i}>
						<div className="title">{ a.name }</div>
						<div className="playcount">{ a.playcount }</div>
					</div>
				)
			})
		}

		return (
			<div>
				<div className="row small-up-3 medium-up-3 large-up-8">
					{artistGrid}
				</div>
				<div>
					{this.pagination.apply(this)}
				</div>
			</div>
		)
	}
}

ArtistStats = connect(state => state)(ArtistStats);
export default ArtistStats;