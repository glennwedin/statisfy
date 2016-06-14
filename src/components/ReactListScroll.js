import React from 'react';
import ReactDOM from 'react-dom';

'use strict';

class ReactListScroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggerPos: 0,    
      startpos: 0,      //Used to define the draggerposition on mouse down
      pct: 0,
      action: null,
      height: parseInt(props.height) || '200',
      contentHeight: 0, //Placeholder for internal use
      scrollerHeight: 40,
      mouseoffset: 0,
      speed: props.speed || 6
    }

    this.scroll = this.scroll.bind(this);
    this.releaseDragger = this.releaseDragger.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.releaseDragger);
  }

  componentDidUpdate(prevProps, prevState) {
    //let el = ReactDOM.findDOMNode(this),
    let contentHeight = ReactDOM.findDOMNode(this).querySelector('.ReactListScroll-content').clientHeight;
    if(prevState.contentHeight !== contentHeight) {
      //let speed = (contentHeight / this.state.height);

      this.setState({
        contentHeight: contentHeight
        //speed: speed
      })
    }
  }

  over() {
    ReactDOM.findDOMNode(this).classList.add('hover');
  }

  out() {
    ReactDOM.findDOMNode(this).classList.remove('hover');
  }

  toogleMoveListener () {
    if(this.state.action === 'down') {
      window.addEventListener('mousemove', this.scroll);
    } else if(this.state.action === 'up'){
      window.removeEventListener('mousemove', this.scroll)
    }
  }

  clickDragger(e) {
    this.setState({
      action: 'down',
      mouseoffset: e.clientY - ReactDOM.findDOMNode(this).offsetTop - this.state.draggerPos
    }, () => {
      this.toogleMoveListener();
    })
  }

  releaseDragger(e) {
    this.setState({
      action: 'up',
      mouseoffset: 0
    }, () => {
      this.toogleMoveListener();
    });
  }

  scroll(e) {
    let y;
    //If event has delta (onMouseWheel-event)
    if(e.deltaY) {
      e.preventDefault();

      //ØØMAAIZEBALLS Stolen from https://www.sitepoint.com/html5-javascript-mouse-wheel/
      let delta = Math.max(-1, Math.min(1, (e.deltaY || -e.detail)));
      y = this.state.draggerPos + (delta*this.state.speed);
    } else if(e.clientY) { 
      //calculate delta with positive or negative
      let fromtop = ReactDOM.findDOMNode(this).getBoundingClientRect().top, //Y er undefined i chrome
      delta = e.clientY - this.state.draggerPos;
      y = this.state.draggerPos + delta - fromtop - this.state.mouseoffset;
    }

    if(y <= 0) {
      y = 0;
    } else if (y >= this.state.height - this.state.scrollerHeight) {
      y = this.state.height - this.state.scrollerHeight;
    }
    
    this.setState({
      pct: (y/this.state.height)*100,
      draggerPos: y,
    });
  }

  render() {
    return(
      <div className="ReactListScroll" style={listStyles(this.state.height)} onMouseOut={this.out.bind(this)} onMouseOver={this.over.bind(this)} onWheel={this.scroll.bind(this)}>
        <div className="ReactListScroll-scrollerwrap" style={scrollerwrapStyles()}>
          <div className="ReactListScroll-scroller" style={scrollerStyles({y:this.state.draggerPos, height:this.state.scrollerHeight})} onMouseDown={this.clickDragger.bind(this)}></div>
        </div>
        <div className="ReactListScroll-content" style={contentStyles(this.state.pct)}>
        {this.props.children}
        </div>
      </div>
    )
  }
}

let listStyles = (height) => {
  return{
    height: height+'px',
    overflow: 'hidden',
    position: 'relative'
  }
}
let scrollerwrapStyles = () => {
  return{
    width: '12px',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#aaa',
    right: '0px'
  }
}
let scrollerStyles = (data) => {
  return{
    position: 'absolute',
    width: '7px',
    height: data.height+'px',
    right: '0px',
    left: '3px',
    backgroundColor: '#000',
    transform: 'translate3D(0,'+data.y+'px, 0)',
    borderRadius: '10px',
    cursor: 'pointer'
  }
}
let contentStyles = (pct) => {
  return {
    position: 'absolute',
    zIndex: -1,
    transform: 'translate3d(0, -'+pct+'%, 0)'
  }
}

export default ReactListScroll;
