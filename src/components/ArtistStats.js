import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getTopArtists } from '../actions/actions';

class ArtistStats extends React.Component {

	constructor(props) {
		super(props);

		console.log(props)
		this.state = {
			filter: [],
			currentpage: props.page,
			totalpages: 1,
			prpage: 24
		}
	}

	componentDidMount() {
		this.setState({
			totalpages: Math.ceil(this.props.stats.topartiststats.length/this.state.prpage)
		});		
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.stats.topartiststats.length !== prevProps.stats.topartiststats.length) {
			this.setState({
				totalpages: Math.ceil(this.props.stats.topartiststats.length/this.state.prpage)
			})
		}     
	}

	setPage(e) {
		let page = parseInt(e.target.innerHTML);
		this.setState({
			currentpage: page
		});
		browserHistory.push('/artists?page='+page)
	}

	next() {
		let page = parseInt(this.state.currentpage) || 1;
		if(page < this.state.totalpages) {
			page += 1;
			this.setState({
				currentpage: page
			});
			browserHistory.push('/artists?page='+page)
		}
	}

	previous() {
		let page = parseInt(this.state.currentpage) || 1;

		if(page > 1) {
			page -= 1;
			this.setState({
				currentpage: page
			});
			browserHistory.push('/artists?page='+page)
		}
	}

	pagination() {
		console.log(this.state.filter)
		if(this.props.stats.topartiststats && this.state.filter.length === 0) {
			//let totalpages = Math.ceil(this.props.stats.topartiststats.length/this.state.prpage) //this.props.stats.topartiststats['@attr'].totalPages;

			let first = [],
				middle = [],
				last = [];

			let x =  (this.state.currentpage-10) >= 1 ? this.state.currentpage-10 : 1;
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
		if(value.length > 0) {
			this.props.stats.topartiststats.filter((obj, i) => {			
				if((obj.name.toLowerCase()).indexOf(value.toLowerCase()) > -1) {
					if(f.length >= 24) { return false; }
					f.push(obj);
				}
			});
		}
		this.setState({
			filter: f
		});
	}


	//Not working. It only deletes the database...
	refresh(e){
		e.preventDefault();
		console.log(this.props.user.username)
		let delReq = window.indexedDB.deleteDatabase(this.props.user.username);
		delReq.onsuccess = () => {
			this.props.dispatch(getTopArtists(this.props.user.username));
		}
		delReq.onerror = (err) => {
			console.log(err);
		}
		delReq.onblocked = function(event) {
		    alert("Error message: Database in blocked state. ");
		};
	}

	render () {
		let artistGrid = "",
		pagecount = 0;
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
				
				//Test if "i" is less than amount pr pagte and that the page starts at correct item
				/*if(pagecount >= this.state.prpage && ((this.state.currentpage*this.state.prpage)-this.state.prpage) > pagecount ) { 
					return; 
				}*/
				//console.log(this.state.currentpage*this.state.prpage)
				if(pagecount < this.state.prpage && i >= (this.state.currentpage*this.state.prpage)-this.state.prpage) {
					pagecount++;
					return (
						<div className="column artist-grid-item" style={{backgroundImage:'url('+a.image[2]['#text']+')'}} key={i}>
							<div className="title">{ a.name }</div>
							<div className="playcount">{ a.playcount }</div>
						</div>
					)
				}
			})
		}

		if(this.props.stats.isFetching) {
			artistGrid = <div className=""><div className="loader"></div></div>
		}

		//
		return (

			<div>
				<div className="row">
					<div className="small-10 medium-4 columns">
						<input className="artist-filter" type="text" name="search" placeholder="Filter this list" onChange={this.search.bind(this)} />
					</div>
					<div className="small-2 medium-4 columns">
						<a className="refresh ion-refresh" onClick={this.refresh.bind(this)} title="Click to refresh this list. Data intensive operation."></a>
					</div>
				</div>
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