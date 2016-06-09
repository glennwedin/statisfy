import React from 'react';
import ReactDOM from 'react-dom';

class ReactListScroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggerPos: 0,
      startpos: null,
      action: null
    }

    this.drag = this.drag.bind(this);
  }

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    //TODO: height er undefined
    window.addEventListener('mouseup', this.releaseDragger.bind(this));
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  drag(e) {
    let y = e.clientY - this.state.startpos;
    console.log('draggin', e)
    this.setState({
      draggerPos: y
    })
  }

  toogleMoveListener () {
    console.log(this.state.action)
    if(this.state.action === 'down') {
      console.log('add mousemove')
      window.addEventListener('mousemove', this.drag);
    } else if(this.state.action === 'up'){
      console.log('fjern mousemove')
      window.removeEventListener('mousemove', this.drag)
    }
  }

  clickDragger(e) {
    console.log('mousedown')

    this.setState({
      action: 'down',
      startpos: this.state.startpos || e.pageY 
    }, () => {
      this.toogleMoveListener();
    })
  }

  releaseDragger(e) {
    console.log('release')
    this.setState({
      action: 'up'
    }, () => {
      this.toogleMoveListener();
    });
  }

  render() {
    return(
      <div className="ReactListScroll" style={listStyles()}>
        <div className="ReactListScroll-scrollerwrap" style={scrollerwrapStyles()}>
          <div className="ReactListScroll-scroller" style={scrollerStyles(this.state.draggerPos)} onMouseDown={this.clickDragger.bind(this)}></div>
        </div>
        <div>
        {this.props.children}
        </div>
      </div>
    )
  }
}

let listStyles = () => {
  return{
    height: '200px',
    overflow: 'hidden',
    position: 'relative'
  }
}
let scrollerwrapStyles = () => {
  return{
    width: '10px',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#aaa',
    right: '0px',
    cursor: 'pointer'
  }
}
let scrollerStyles = (y) => {
  return{
    position: 'absolute',
    width: '6px',
    height: '30px',
    right: '0',
    left: '2px',
    backgroundColor: '#000',
    top: y+'px'
  }
}


export default ReactListScroll;
