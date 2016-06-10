import React from 'react';
import ReactDOM from 'react-dom';

class ReactListScroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggerPos: 0,
      startpos: 0,
      action: null,
      height: props.height || '200',
      contentHeight: 0,
      speed: 1
    }

    this.drag = this.drag.bind(this);
    this.releaseDragger = this.releaseDragger.bind(this);
  }

  componentDidMount() {
    //TODO: height er undefined
    window.addEventListener('mouseup', this.releaseDragger);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Log', this.state);

    let el = ReactDOM.findDOMNode(this),
    contentHeight = el.querySelector('.ReactListScroll-content').clientHeight;
    if(prevState.contentHeight !== contentHeight) {
      let speed = (contentHeight / this.state.height);

      this.setState({
        contentHeight: contentHeight,
        speed: speed
      })
    }
  }

  drag(e) {
    let y = e.clientY - this.state.startpos;
    console.log('dragging', y)
    if(y <= 0) {
      y = 0;
    } else if (y >= this.state.height - 30) {
      y = this.state.height - 30;
    }
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
      console.log('remove mousemove')
      window.removeEventListener('mousemove', this.drag)
    }
  }

  clickDragger(e) {
    console.log('mousedown')

    this.setState({
      action: 'down',
      startpos: (this.state.startpos > 0) ? this.state.startpos : e.pageY
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

  scroll(e) {
    let y;
    if(e.deltaY > 0) {
      y = this.state.draggerPos + 10;
    } else {
      y = this.state.draggerPos - 10;
    }

    console.log('dragging', y)
    if(y <= 0) {
      y = 0;
    } else if (y >= this.state.height - 30) {
      y = this.state.height - 30;
    }
    this.setState({
      draggerPos: y,
      startpos: y
    });
  }

  render() {
    return(
      <div className="ReactListScroll" style={listStyles(this.state.height)} onWheel={this.scroll.bind(this)}>
        <div className="ReactListScroll-scrollerwrap" style={scrollerwrapStyles()}>
          <div className="ReactListScroll-scroller" style={scrollerStyles({y:this.state.draggerPos, height:30})} onMouseDown={this.clickDragger.bind(this)}></div>
        </div>
        <div className="ReactListScroll-content" style={contentStyles(this.state.draggerPos*this.state.speed)}>
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
  console.log(data)
  return{
    position: 'absolute',
    width: '6px',
    height: data.height+'px',
    right: '0px',
    left: '2px',
    backgroundColor: '#000',
    transform: 'translateY('+data.y+'px)',
    borderRadius: '10px'
  }
}
let contentStyles = (y) => {
  return {
    position: 'absolute',
    zIndex: -1,
    transform: 'translateY(-'+y+'px)'
  }
}

export default ReactListScroll;
