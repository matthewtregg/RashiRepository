import React, { Component } from 'react';
import './style.css';
import classnames from 'classnames';
import bem from 'easy-bem';
import PropTypes from 'prop-types';
import MyLocationIcon from './MyLocationIcon.jpeg';

const cn = bem('indiana-scroll-container');

export default class ScrollContainer extends Component {
 

  static propTypes = {
    centerX: PropTypes.number,
    centerY: PropTypes.number,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    hideScrollbars: PropTypes.bool,
    activationDistance: PropTypes.number,
    children: PropTypes.node,
    onStartScroll: PropTypes.func,
    onScroll: PropTypes.func,
    onEndScroll: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    ignoreElements: PropTypes.string
  }

  static defaultProps = {
    hideScrollbars: true,
    activationDistance: 10,
    vertical: true,
    horizontal: true,
    style: {}
  }

  constructor(props) {
    super(props)
    this.container = React.createRef()
  }

  componentDidMount() {
   window.addEventListener('mouseup', this.onMouseUp)
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('touchmove', this.onTouchMove, {passive: false})
    window.addEventListener('touchend', this.onTouchEnd)
    this.loaded = false;
  }


  
  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchEnd)
  }
  


  componentDidUpdate(){
    if (this.props.loaded ) {
      this.loaded = false;
      this.props.changeLoadedStatus(this.props.screenId);
    }

    if (!this.loaded) { 
    this.setCenter()
    ;}
    else {
      return false
    }
  
  }

  isDraggable(target) {
    const ignoreElements = this.props.ignoreElements
    if (ignoreElements) {
      const closest = target.closest(ignoreElements)
      return closest === null || closest.contains(this.getElement())
    } else {
      return true
    }
  }

  getElement() {
    return this.container.current
  }

  onTouchStart = (e) => {
    if (this.isDraggable(e.target)) {
      const touch = e.touches[0]
      this.pressed = true
      this.clientX = touch.clientX
      this.clientY = touch.clientY
      e.stopPropagation()
    }
  }

  onTouchEnd = (e) => {
    this.processEnd()
  };

  onTouchMove = (e) => {
    if (this.pressed) {
      const touch = e.touches[0]
      if (touch) {
        this.processMove(touch.clientX, touch.clientY)
        if (e.preventDefault) {
          e.preventDefault()
        }
      }
    }
  }

  onMouseDown = (e) => {
    if (this.isDraggable(e.target)) {
      this.pressed = true;
      this.clientX = e.clientX;
      this.clientY = e.clientY;
      e.stopPropagation();
    }
  };

  onMouseMove = (e) => {
    if (this.pressed) {
      this.processMove(e.clientX, e.clientY, e)
      if (e.preventDefault) {
        e.preventDefault()
      }
    }
  }

  onMouseUp = (e) => {
    if (e.preventDefault) {
      e.preventDefault()
    }
    e.stopPropagation()

    this.processEnd()
  };

  processMove(newClientX, newClientY) {
    const {
      horizontal, vertical, activationDistance, onScroll, onStartScroll
    } = this.props
    const container = this.container.current
    if (!this.dragging && this.pressed) {
      if ((horizontal && Math.abs(newClientX - this.clientX) > activationDistance) || (vertical && Math.abs(newClientY - this.clientY) > activationDistance)) {
        this.clientX = newClientX
        this.clientY = newClientY
        this.dragging = true
        document.body.classList.add('indiana-dragging')
        if (onStartScroll) {
          onStartScroll()
        }
        this.forceUpdate()
      }
    }
    if (this.dragging) {
      if (horizontal) {
        container.scrollLeft -= newClientX - this.clientX;

      }
      if (vertical) {
        container.scrollTop -= newClientY - this.clientY;
      }
      if (onScroll) {
        onScroll(container.scrollLeft, container.scrollTop, container.scrollWidth, container.scrollHeight)
      }
      this.clientX = newClientX
      this.clientY = newClientY
    }
  }

  processEnd() {
    const { onEndScroll } = this.props;
    const container = this.container.current;
    this.loaded = true;
    this.pressed = false;
    this.dragging = false;
    document.body.classList.remove('indiana-dragging')
    if (onEndScroll) {
      onEndScroll(container.scrollLeft, container.scrollTop, container.scrollWidth, container.scrollHeight)
    }
    this.forceUpdate()
  }



  setCenter() {

    const {
      horizontal, vertical, onScroll,
    scrollPos} = this.props
    const container = this.container.current
      if (horizontal) {
        const centerX = scrollPos.centerX - 500;
        container.scrollLeft= centerX;
      }
      if (vertical) {
        container.scrollTop = scrollPos.centerY;
      }
      if (onScroll) {
        onScroll(container.scrollLeft, container.scrollTop, container.scrollWidth, container.scrollHeight)
      }
     
    
  }
  render() {
    const {
      children, style, hideScrollbars,className,pgmListWindowMode,
    } = this.props
    
    const centerClass = pgmListWindowMode  === "ListAnd2PgmStrCharts"? "center" + this.props.screenId : "center";

    return (
      <div  
        className={classnames(className, cn({ dragging: this.dragging }))}
        style={{ ...style, overflow: hideScrollbars ? 'hidden' : 'auto' }}
        ref={this.container}
        onTouchStart={this.onTouchStart}
        onMouseDown={this.onMouseDown}
      >
        {children}
      <div className={centerClass}>
      <button onClick={() => { this.setCenter()}}>
       <img src={MyLocationIcon} alt="assets"></img></button>
      </div>
      </div>
    )
  }
}