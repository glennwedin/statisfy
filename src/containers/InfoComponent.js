import React from 'react';
import { browserHistory } from 'react-router';
import { requestTrack, requestArtist } from '../actions/actions';
import { connect } from 'react-redux';

class InfoComponent extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      name: "name",
      information: "information"
    }
  }

  componentDidMount() {
    //Load data from last.fm/artist
    let type = window.location.pathname.split('/')[1];
    if(type === "track") {
      //this.props.dispatch(requestTrack("trackname"));
    }
    if(type === "artist") {
      //this.props.dispatch(requestArtist("Artistname"));
    }
  }

  render () {
    return (
      <section className="row">
				<div className="small-12 medium-8 columns">
					<h1>{this.state.name}</h1>
          <div className="row">
            <div className="small-4 columns">
              <img src="https://c1.staticflickr.com/9/8436/28464720156_d4529ac295_z.jpg" alt="" />
            </div>
            <div className="small-8 columns">
            {this.state.information}
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in ante nec felis imperdiet consequat in a magna. Ut et rutrum ligula. Nulla finibus nulla sed nunc suscipit egestas. Sed porttitor nulla sapien, id cursus tortor luctus ac. Aliquam in turpis justo. Pellentesque aliquam odio quis quam condimentum ullamcorper. Vivamus eget enim sit amet metus ultricies viverra ac a tortor. Duis pellentesque ante eget elit egestas dignissim. Donec finibus feugiat magna, at auctor orci mattis sit amet. Suspendisse ultricies quam non libero aliquet dignissim.</p>
            <p>Fusce ultricies luctus libero. In vitae diam purus. Phasellus arcu nulla, congue quis dictum nec, blandit ut nisi. Ut ut eros purus. Morbi tempus aliquet vehicula. Morbi sed ex eu ante scelerisque pharetra sed et lorem. Donec dignissim scelerisque libero. Donec sollicitudin libero pretium, bibendum lectus id, ullamcorper enim. Praesent vitae lorem ipsum. Aenean velit enim, ornare ut velit blandit, blandit laoreet sapien. Donec posuere elementum consectetur. Vestibulum et fermentum felis.</p>
            </div>
          </div>
				</div>
				<div className="small-12 medium-1 columns">

				</div>
				<div className="small-12 medium-3 columns">

				</div>
			</section>
    )
  }
}
InfoComponent = connect(state => state)(InfoComponent)
export default InfoComponent;
