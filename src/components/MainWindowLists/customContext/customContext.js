import React, {Component} from 'react';


// SPECIAL COMPONENT FOR ADDING A CONTEXT MENUS FOR NON-D3 ELEMENTS
class CustomContext extends Component{
  constructor(props) {
    super(props);
    this.contextRef = React.createRef();
    this.returnMenu = this.returnMenu.bind(this); 
  }
  
  componentDidMount() {
      this["contextMenu"+ this.props.contextId] = (event) => {
        event.preventDefault();
        const clickX = event.clientX;
        const clickY = event.clientY;
       
          if (event.target.className === this.props.contextClass) {
            this.props.setState(
              true,
              clickX,
              clickY,
              event.target.innerHTML,
              this.props.contextId
            )
          } else {
            this.props.setState(
             false,
              0,
              0,
              '',
              this.props.contextId
            )
          }
        };
      
      this["clickContext"+ this.props.contextId] = (event) => {
        if (this.contextRef.current) {
          
          const contextClassName = 'customContext' + this.props.contextId;
          console.log(contextClassName);
          if (this.contextRef.current.id === contextClassName) {
            console.log(this.contextRef.current.id);
            this.click(event.target.getAttribute('index'), this.props.state.object);
          }
          event.preventDefault();
            this.props.setState(
              false,
              0,
              0,
              '',
              this.props.contextId
            );
          }
        
      };

    
    document.addEventListener('contextmenu', this["contextMenu"+ this.props.contextId]);
    document.addEventListener('click', this["clickContext"+ this.props.contextId]);
  
  }
  

    componentWillUnmount(){
      document.removeEventListener('contextmenu',this["contextMenu"+ this.props.contextId]);
      document.removeEventListener('click', this["clickContext"+ this.props.contextId]);
      this.contextRef = null;
    }
   

   

   click(index, object) {
    console.log(index, 'index');
    console.log(object, 'object');

     if (index) {
       if (this.props.items[index].callback)
         this.props.items[index].callback(object, this.props.screenId);
       else {
         console.log("callback not registered for the menu item")
       }
     }
   }


  returnMenu(items){
    const myStyle = {
      'position': 'absolute',
      'top': `${this.props.state.y}px`,
      'left':`${this.props.state.x+5}px`,
      'backgroundColor':  '#e6e6e6',
      'opacity': 1,  
      'boxShadow': `1px 2px`,
    }

    const contextClassName = 'customContext' + this.props.contextId;
    const contextStyleId = 'customContext' + this.props.contextId;
    const contextItemLast = 'custom-context-item-last' + this.props.contextId;
    const contextItem = 'custom-context-item' + this.props.contextId;
    // on mouseEnter on mouseLeave

    return <div className={contextClassName} id={contextStyleId} style={myStyle} ref={this.contextRef}>
        {items.map((item, index, arr) =>{

        const itemStyle = item.hover ? {
          'backgroundColor':  '#aaa5a5',
          'opacity': 1,  
        } : {
          'backgroundColor':  '#e6e6e6',
          'opacity': 1,  
        }
          
          if(arr.length-1===index){
            return <div key={index} className={contextItemLast} style={itemStyle} onMouseOver={()=>{this.props.hoverMouseOver(item.id,this.props.contextId)}}  index={index} >{item.label}</div>
          }else{
            return <div key={index} className={contextItem} style={itemStyle} onMouseOver={()=>{this.props.hoverMouseOver(item.id,this.props.contextId)}} index={index} >{item.label}</div>
          }
        })}
        </div>;
  }



  
  render() {
    return  (<div className='cmenu'>
        {this.props.state.visible ? this.returnMenu(this.props.items): null}
        {this.props.List}
    </div>
    )
  }
}

export default CustomContext;


