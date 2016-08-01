import React from 'react';
import { browserHistory } from 'react-router';
import { getInfo } from '../actions/actions';
import { connect } from 'react-redux';

class TrackInfoComponent extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount() {
    let name = this.props.routeParams.artist,
    track    = this.props.routeParams.id;
    //Load data from last.fm/artist
    let type = window.location.pathname.split('/')[1];
    if(type) {
      this.props.dispatch(getInfo(name, type, track));
    }
  }

  componentDidUpdate() {
    //console.log('props', this.props);
  }

  back() {
    browserHistory.goBack();
  }

  showMore(e) {
    let el = e.target.parentNode.querySelector('.showtoggler'),
    summary = e.target.parentNode.querySelector('.summary');

    if(el.classList.contains('hidden')) {
      el.classList.remove('hidden');
      summary.classList.add('hidden');
      e.target.innerHTML = "Show less";
    } else {
      el.classList.add('hidden');
      summary.classList.remove('hidden');
      e.target.innerHTML = "Show more";
    }
  }

  render () {
    function createMarkup(content) {
        content = '<p>'+content.replace(/\n/g, "<br />")+'</p>';
        return {__html: content};
    };

    let name = '',
    artistname = '',
    summary = '',
    content = '',
    image = '',
    loading = true;
    if(this.props.artistortrack.info) {
      name = this.props.artistortrack.info.name;
      artistname = this.props.artistortrack.info.artist.name;
      if(this.props.artistortrack.info.wiki) {
        summary = this.props.artistortrack.info.wiki.summary;
        content = this.props.artistortrack.info.wiki.content;
      }
      //image = <img className="b50p" src={this.props.artistortrack.info.image[3]['#text']} alt="" />
      loading = this.props.artistortrack.info.isFetching;
    }

    if(loading) {
      return (<div className=""><div className="loader"></div></div>)
    }

    return (
      <section className="row">
        <div className="medium-4 columns">
          {image}
        </div>
        <div className="medium-8 columns">
          <h1>{artistname} &ndash; {name}</h1>
          <div className="infocontent">
            <div className="summary" dangerouslySetInnerHTML={createMarkup(summary)}></div>
            <div className="hidden showtoggler" dangerouslySetInnerHTML={createMarkup(content)}></div>
            <div className="show" onClick={this.showMore.bind(this)}>Show more</div>
            <hr />
          </div>
        </div>
        <div className="backbar" onClick={this.back.bind(this)}>Back</div>
			</section>
    )
  }
}
TrackInfoComponent = connect(state => state)(TrackInfoComponent)
export default TrackInfoComponent;
