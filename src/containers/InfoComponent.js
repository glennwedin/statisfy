import React from 'react';
import { connect } from 'react-redux';

class InfoComponent extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <section className="row">
				<div className="small-12 medium-8 columns">
					<h1>Artist</h1>
					<div className="friends small-up-3 medium-up-3 large-up-3">

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
