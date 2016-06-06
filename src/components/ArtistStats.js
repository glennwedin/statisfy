import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getTopArtists } from '../actions/actions';

class ArtistStats extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			filter: [],
			currentpage: 1,
			totalpages: 1,
			prpage: 24
		}
	}

	componentDidMount() {
		this.setState({
			totalpages: this.props.stats.topartiststats/this.state.prpage
		});		
	}

	setPage(e) {
		let page = parseInt(e.target.innerHTML);
		this.props.dispatch(getTopArtists(this.props.user.username, 24, page));
		browserHistory.push('/artists?page='+page)
	}

	next() {
		let page = parseInt(this.props.page) || 1,
		total = parseInt(this.props.stats.topartiststats/24);

		if(page < total) {
			page += 1;
			this.props.dispatch(getTopArtists(this.props.user.username, 24, page));
			browserHistory.push('/artists?page='+page)
		}
	}

	previous() {
		let page = parseInt(this.props.page) || 1;

		if(page > 1) {
			page -= 1;
			this.props.dispatch(getTopArtists(this.props.user.username, 24, page));
			browserHistory.push('/artists?page='+page)
		}
	}

	pagination() {
		if(this.props.stats.topartiststats) {
			//let totalPages = this.props.stats.topartiststats/24; //this.props.stats.topartiststats['@attr'].totalPages;

			let first = [],
				middle = [],
				last = [];

			let x =  (this.props.currentpage-10) >= 1 ? this.props.page-10 : 1;
			let y = 0;
			for(x, y = 0; y < 20 && y < this.state.totalpages; x++,y++) {
				first.push(<div key={x} className="p" onClick={this.setPage.bind(this)}>{x}</div>)
			}
			last.push(<div key="sdfsdgwrgw" className="p"> &raquo; {this.state.totalpages}</div>)

			return (
				<div className="pagination">
					<div className="wrap">
						<div className="pagination-section" onClick={this.previous.bind(this)}><div className="p">Previous</div></div>
						<div className="pagination-section">{first}</div>
						<div className="pagination-section pagination-separator"> - - -</div>
						<div className="pagination-section">{last}</div>
						<div className="pagination-section" onClick={this.next.bind(this)}><div className="p">Next</div></div>
					</div>
				</div>
			)
		} else {
			return <div></div>
		}
	}

	search(e) {
		let value = e.target.value;

		let f = this.state.filter;
		f = [];
		this.props.stats.topartiststats.filter((obj, i) => {			
			if(value.length > 3 && (obj.name.toLowerCase()).indexOf(value.toLowerCase()) > -1) {
				if(f.length >= 24) { return f; }
				f.push(obj);
			}
		})
		this.setState({
			filter: f
		});
	}

	render () {
		let artistGrid = "";
		if(this.state.filter.length > 0) {
			artistGrid = this.state.filter.map((a, i) => {
				return (
					<div className="column artist-grid-item" style={{backgroundImage:'url('+a.image[2]['#text']+')'}} key={i}>
						<div className="title">{ a.name }</div>
						<div className="playcount">{ a.playcount }</div>
					</div>
				)
			})
		} else if(this.props.stats.topartiststats) {
			artistGrid = this.props.stats.topartiststats.map((a, i) => {
				if(i >= this.state.prpage) { return; }
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
				<input type="text" name="search" placeholder="Filter this list" onChange={this.search.bind(this)} />
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