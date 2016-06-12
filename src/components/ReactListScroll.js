import React from 'react';
import ReactDOM from 'react-dom';

class ReactListScroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggerPos: 0,
      startpos: 0,
      pct: 0,
      action: null,
      height: parseInt(props.height) || '200',
      contentHeight: 0,
      speed: 1
    }

    this.scroll = this.scroll.bind(this);
    this.releaseDragger = this.releaseDragger.bind(this);
  }

  componentDidMount() {
    //TODO: height er undefined
    window.addEventListener('mouseup', this.releaseDragger);
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('Log', this.state);

    //let el = ReactDOM.findDOMNode(this),
    let contentHeight = document.querySelector('.ReactListScroll-content').clientHeight;
    if(prevState.contentHeight !== contentHeight) {
      let speed = (contentHeight / this.state.height);

      //Dette er ikke veldig effektivt...
      this.setState({
        contentHeight: contentHeight,
        speed: speed
      })
    }
  }

  toogleMoveListener () {
    //console.log(this.state.action)
    if(this.state.action === 'down') {
      console.log('add mousemove')
      window.addEventListener('mousemove', this.scroll);
    } else if(this.state.action === 'up'){
      console.log('remove mousemove')
      window.removeEventListener('mousemove', this.scroll)
    }
  }

  clickDragger(e) {
    //console.log('mousedown')
    this.setState({
      action: 'down',
      startpos: (this.state.startpos > 0) ? this.state.startpos : e.pageY
    }, () => {
      this.toogleMoveListener();
    })
  }

  releaseDragger(e) {
    //console.log('release')
    this.setState({
      action: 'up'
    }, () => {
      this.toogleMoveListener();
    });
  }

  scroll(e) {
    e.preventDefault();

    //FUBAR
    let y,
    startpos,
    fromtop = document.querySelector('.ReactListScroll').getBoundingClientRect().y;
    //If event has delta (onMouseWheel-event)
    if(e.deltaY) {
      y = Math.round(this.state.draggerPos + e.deltaY);
      startpos = y;
    } else if(e.clientY) { 
      //calculate delta with positive or negative
      let delta = e.clientY - this.state.startpos;
      y = this.state.startpos + delta - fromtop; //TODO: minus avstanden fra toppen pluss museposisjon
      startpos = this.state.startpos + delta - fromtop;
    }
    
    if(y <= 0) {
      y = 0;
    } else if (y >= this.state.height - 30) {
      y = this.state.height - 30;
    }

    console.log('pct', y/this.state.height);

    this.setState({
      pct: (y/this.state.height)*100,
      draggerPos: y,
      startpos: startpos //this might not be necessary in the end.
    });
  }

  render() {
    return(
      <div className="ReactListScroll" style={listStyles(this.state.height)} onWheel={this.scroll.bind(this)}>
        <div className="ReactListScroll-scrollerwrap" style={scrollerwrapStyles()}>
          <div className="ReactListScroll-scroller" style={scrollerStyles({y:this.state.draggerPos, height:30})} onMouseDown={this.clickDragger.bind(this)}></div>
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
    width: '10px',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#aaa',
    right: '0px',
    cursor: 'pointer'
  }
}
let scrollerStyles = (data) => {
  return{
    position: 'absolute',
    width: '6px',
    height: data.height+'px',
    right: '0px',
    left: '2px',
    backgroundColor: '#000',
    transform: 'translate3D(0,'+data.y+'px, 0)',
    borderRadius: '10px'
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
