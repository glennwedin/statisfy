import React from 'react';
import ReactDOM from 'react-dom';

class ReactListScroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggerPos: 0,    
      startpos: 0,      //Used to define the draggerposition on mouse down
      pct: 0,
      action: null,
      height: parseInt(props.height) || '200',
      contentHeight: 0,
      scrollerHeight: 30,
      mouseoffset: 0,
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
    //console.log(e.clientY - ReactDOM.findDOMNode(this).offsetTop - this.state.draggerPos)
    this.setState({
      action: 'down',
      mouseoffset: e.clientY - ReactDOM.findDOMNode(this).offsetTop - this.state.draggerPos,
      //startpos: (this.state.startpos > 0) ? this.state.startpos : e.pageY //denne gjør visst ikke noe
    }, () => {
      this.toogleMoveListener();
    })
  }

  releaseDragger(e) {
    //console.log('release')
    this.setState({
      action: 'up',
      mouseoffset: 0
    }, () => {
      this.toogleMoveListener();
    });
  }

  scroll(e) {
    e.preventDefault();
    console.log(e)
    let y,
    fromtop = document.querySelector('.ReactListScroll').getBoundingClientRect().y;
    //If event has delta (onMouseWheel-event)
    if(e.deltaY) {
      y = Math.round(this.state.draggerPos + e.deltaY);
      //startpos = y;
    } else if(e.clientY) { 
      //calculate delta with positive or negative
      console.log((e.clientY - e.pageY))
      let delta = e.clientY - this.state.draggerPos;
      y = this.state.draggerPos + delta - fromtop - this.state.mouseoffset; //TODO: trekk museposisjon fra toppen av scrollelement
      //startpos = this.state.startpos + delta - fromtop;
    }
    
    if(y <= 0) {
      y = 0;
    } else if (y >= this.state.height - this.state.scrollerHeight) {
      y = this.state.height - this.state.scrollerHeight;
    }


    this.setState({
      pct: (y/this.state.height)*100,
      draggerPos: y,
      //startpos: startpos //this might not be necessary in the end.
    });
  }

  render() {
    return(
      <div className="ReactListScroll" style={listStyles(this.state.height)} onWheel={this.scroll.bind(this)}>
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
    width: '10px',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#aaa',
    right: '0px'
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
