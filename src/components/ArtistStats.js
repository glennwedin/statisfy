import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getTopArtists } from '../actions/actions';

class ArtistStats extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	setPage(e) {
		let page = parseInt(e.target.innerHTML);
		this.props.dispatch(getTopArtists("draugon", 24, page));
		browserHistory.push('/artists?page='+page)
	}

	pagination() {
		if(this.props.stats.topartiststats.artist) {
			let totalPages = this.props.stats.topartiststats['@attr'].totalPages;

			let first = [],
				middle = [],
				last = [];

			/*
			for(let x = this.state.page+5, y = 0; y <=5; x++, y++) {
				first.push(<div key={x} className="p" onClick={this.setPage.bind(this)}>{x}</div>)
			}
			for(let x = this.state.page+(totalPages/2 - 5), y = 0; y < totalPages/2; x++, y++) {
				middle.push(<div key={x} className="p" onClick={this.setPage.bind(this)}>{x}</div>)
			}
			for(let x = (totalPages - 4); x <= totalPages; x++) {
				last.push(<div key={x} className="p" onClick={this.setPage.bind(this)}>{x}</div>)
			}
			*/
			let x =  (this.props.page-10) >= 1 ? this.props.page-10 : 1;
			let y = 0;
			for(x, y = 0; y < 20; x++,y++) {
				first.push(<div key={x} className="p" onClick={this.setPage.bind(this)}>{x}</div>)
			}
			last.push(<div key="sdfsdgwrgw" className="p"> &raquo; {totalPages}</div>)

			return (
				<div className="pagination">
					<div className="wrap">
						<div className="pagination-section"><div className="p">Previous</div></div>
						<div className="pagination-section">{first}</div>
						<div className="pagination-section pagination-separator"> - - -</div>
						<div className="pagination-section">{last}</div>
						<div className="pagination-section"><div className="p">Next</div></div>
					</div>
				</div>
			)
		} else {
			return <div></div>
		}
	}

	render () {
		console.log(this.state)
		let artistGrid = "";
		if(this.props.stats.topartiststats.artist) {
			artistGrid = this.props.stats.topartiststats.artist.map((a, i) => {
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
				<div className="small-up-3 medium-up-3 large-up-8">
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