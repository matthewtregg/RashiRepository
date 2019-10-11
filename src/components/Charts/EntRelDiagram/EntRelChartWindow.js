import React, {Component} from 'react';
import './EntRelChartWindow.css';
import ScrollContainer from '../scrollContainer/ScrollContainer';
import {entRelChart } from './EntRelV1/EntRelV1';

// Split up PgmStrChart Window
class EntRelChartWindow extends Component {

  constructor(props) {
    super(props);
    this.state = {searchValue:''}
    this.pgmName = "";
  }
  
  componentDidMount() {
    this.centred  =false;
    this.MainDiv = ".entRelChartCanvas" + this.props.screenId;
    this.contextMenu='.d3contextmenu' + this.props.screenId;
    this.screenId = this.props.screenId;
    if (this.screenId === 1) {
      this.props.setEntRelInitialLoadedStatus(this.screenId);
      this.props.setEntRelInitialZoom(this.screenId)
      this.props.setEntRelInitialCentre({centerX:0,centerY:0},this.screenId)
    }
    this.forceUpdate();
  }

  componentDidUpdate() {
    this.contextMenu='.d3contextmenu' + this.props.screenId;
    this.MainDiv = ".entRelChartCanvas" + this.props.screenId;
    this.entryPoint = this.props.nextEntRelChart ? this.props.nextEntRelChart : "ACUIVH";
    if (this.currentDiagram!==this.entryPoint) {
      this.centred = false;
      this.currentDiagram = this.entryPoint;
      this.scale = this.props.zoomLevel;
      this.loaded = false;
      this.props.getEntRelChartArray(this.entryPoint,this.props.screenId)
    } 
  
    else if (!this.loaded) {
      if (this.buttonPressed) {
        this.buttonPressed = false;
        if (this.childrenParentsAdded) { 
          if(this.parent) this.props.remParRelChartArray(this.entName, this.props.screenId);
          if(this.child) this.props.remChldRelChartArray(this.entName, this.props.screenId); 
        }
        else {
          if (this.child) this.props.addChldRelChartArray(this.entName, this.props.screenId);
          if (this.parent)this.props.addParRelChartArray(this.entName, this.props.screenId); 
        }
        this.parent = false;
        this.child = false;
        this.childrenParentsAdded = false;
      }
      else {
      this.loaded = true;
      this.props.setEntRelChartData(this.props.relChartArray, this.entryPoint,this.props.screenId,this.props.otherRelData);} 
    }
    else if (this.loaded) {
      entRelChart(this.props.chartData,this);
    }
  
    else {
      return false;
    }
  }

// expand nodes 
expandChildrenParents(context, childrenParentsAdded) {
  context.loaded = false;
  context.buttonPressed = true;
  context.childrenParentsAdded = childrenParentsAdded;
  if (context.parent) context.props.setParButtonPressed(context.entName, context.props.screenId);
  else context.props.setChldButtonPressed(context.entName, context.props.screenId);
}

 
   
  render() { 

     // if List and 2 PgmStrCharts and screen Id ==2 
    const contextMenu = "d3contextmenu" + this.props.screenId;
    const MainDiv = "entRelChartCanvas" + this.props.screenId;
    // d3 context menu 
    return (
    <ScrollContainer pgmListWindowMode={this.props.pgmListWindowMode} screenId={1} className="scroll-container" scrollPos={{centerX:7000,centerY:7800}} changeLoadedStatus={false} loaded={false} >
          <div className={MainDiv} >
          <div className={contextMenu}>
             <div className="d3contextItem" onClick={this.goToNextPgm}><p>{`Go to pgm`}</p></div>
             <div className="d3contextItem" onClick={()=>{this.expandChildrenParents(this)}}><p>{`Expand Children/Parents`}</p></div>
          </div>
          </div> 
    </ScrollContainer>
  )}

}



export default EntRelChartWindow;

