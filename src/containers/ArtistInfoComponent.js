import React from 'react';
import { browserHistory } from 'react-router';
import { getInfo } from '../actions/actions';
import { connect } from 'react-redux';

class ArtistInfoComponent extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount() {
    let name = this.props.routeParams.id;
    //Load data from last.fm/artist
    let type = window.location.pathname.split('/')[1];
    if(type) {
      this.props.dispatch(getInfo(name, type));
    }
  }

  componentDidUpdate() {
    //console.log('props', this.props);
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

  back() {
    browserHistory.goBack();
  }

  render () {
    function createMarkup(content) {
      content = '<p>'+content.replace(/\n/g, "<br />")+'</p>';
      return {__html: content};
    };

    let name = '',
    summary = '',
    content = '',
    image = '',
    loading = true;
    if(this.props.artistortrack.info) {
      name = this.props.artistortrack.info.name;
      summary = this.props.artistortrack.info.bio.summary;
      content = this.props.artistortrack.info.bio.content;
      image = <img className="b50p" src={this.props.artistortrack.info.image[3]['#text']} alt="" />
      loading = this.props.artistortrack.info.isFetching;
    }

    if(loading) {
      return (<div className=""><div className="loader"></div></div>)
    }

    return (
      <section className="row">
        <div className="medium-4 columns">
          <div className="centeredImage">{image}</div>
        </div>
        <div className="medium-8 columns">
          <div className="infocontent">
            <h1>{name}</h1>
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
ArtistInfoComponent = connect(state => state)(ArtistInfoComponent)
export default ArtistInfoComponent;
