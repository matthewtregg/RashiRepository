import React, {Component} from 'react';
import './DFDchart.css';
import {createDFDChart} from './DFDv1/DFDv1';
import {createDFDChart2} from './DFDv2/DFDv2';
import ScrollContainer from '../scrollContainer/ScrollContainer';

// Split up PgmStrChart Window
class DFDChartWindow extends Component {

  constructor(props) {
    super(props);
    this.pgmName = "";
  }

  componentDidMount() {
    this.centred  =false;
    this.MainDiv = ".DFDchartCanvas" + this.props.screenId;
    this.contextMenu='.d3DFDcontextmenu' + this.props.screenId;
    this.screenId = this.props.screenId;
    this.props.setInitialLoadedStatus(this.screenId);
    this.props.setInitialZoom(this.screenId)
    this.props.setInitialCentre({centerX:0,centerY:0},this.screenId)
    this.diagData= null;
    this.forceUpdate();
  }

  componentDidUpdate() {
    this.contextMenu='.d3DFDcontextmenu' + this.props.screenId;
    this.MainDiv = ".DFDchartCanvas" + this.props.screenId;
    this.entryPoint = this.props.nextDFDDiagram ? this.props.nextDFDDiagram: 'APS050';
    console.log(this.props.DFDDiagramData, "data");
    
    if (this.currentDiagram!==this.entryPoint && this.props.DFDChartType==='File') {
      console.log('number 1');
      this.centred = false;
      this.currentDiagram = this.entryPoint;
      this.scale = this.props.zoomLevel;
      this.diagData = this.props.DFDDiagramData;
      const viewName = this.entryPoint.split(':')[1];
      const entName = this.entryPoint.split(':')[0];
      this.props.setDFDFileDiagramData(entName,viewName,this.props.screenId, this.props.repoName); 
    }
    else if (this.currentDiagram!==this.entryPoint) {
      console.log('number 2');
      this.centred = false;
      this.currentDiagram = this.entryPoint;
      this.scale = this.props.zoomLevel;
      if(this.nextDFDType) {
        this.nextDFDType = false; 
        this.props.setDFDFileDiagramData(this.entryPoint,this.props.screenId, this.props.repoName);
      } 
      else this.props.setDFDPgmDiagramData(this.entryPoint,this.props.screenId, this.props.repoName);
    } 
    else if (this.props.DFDDiagramData.DFDChartPgm && this.props.DFDChartType==='File') {
      console.log('number 3');
      createDFDChart2(this.props.DFDDiagramData.DFDChartPgm, this, this.entryPoint)
    }

    else if (this.props.DFDDiagramData.DFDChartPgm) {
      console.log('number 4');
      createDFDChart(this.props.DFDDiagramData.DFDChartPgm, this, this.entryPoint);
    } 
     
    else {
      return false;
    }
  }

  goToDFDDiag = () => {
    if (this.pgm) {
      this.centred = false;
      this.props.setNextPgmDFDDiagram(this.pgmName, this.screenId);
    }
    else {
    if (!this.entName)  this.entName = this.fileName.trim(); 
    this.centred = false;
    const nextDiag = `${this.entName}:${this.fileName}`
    this.props.setNextFileDFDDiagram(nextDiag, this.screenId);
    } 
  }

  goToPgmStr = () => {
    if (this.pgm) {
      this.props.displaySelectedPgm(this.pgmName, this.screenId);
    }
  }

  zoomIn = () => {
    this.scale = this.props.zoomLevel;
    this.props.zoomIn(this.props.screenId);
    this.centred = false;
    this.props.changeLoadedStatus(this.props.screenId);
  }
  
  zoomOut = () => {
    this.scale = this.props.zoomLevel;
    this.props.zoomOut(this.props.screenId);
    this.centred = false;
    this.props.changeLoadedStatus(this.props.screenId);
  }

  // expand separate window
  expandSeparateWindow = () => {
    this.props.setNextDiagram(this.pgmName, this.props.screenId + 1);
    this.props.setPgmListWindowMode("ListAnd2DFDCharts")
  }

  // expand source
  expandSourceView = () => {
    console.log("Source View");
    this.centred = false;
    // console.log(this.pgmName);
    // console.log(this.props.screenId);
    //this.props.setNextDiagram(this.pgmName, this.props.screenId); 
    //this.props.changeLoadedStatus(this.props.screenId);
  }

  render() { 
   const contextMenu = "d3DFDcontextmenu" + this.props.screenId;
   const MainDiv = "DFDchartCanvas"+ this.props.screenId;
   const zoomInClass = "zoomIn" + this.props.screenId; 
   const zoomOutClass = "zoomOut" + this.props.screenId; 

   // d3 context menu 
   return (
    <ScrollContainer pgmListWindowMode={this.props.pgmListWindowMode} screenId={1} className="scroll-container" scrollPos={this.props.centre} changeLoadedStatus={this.props.changeLoadedStatus} loaded={this.props.loaded} >
         <button className={zoomInClass} onClick={this.zoomIn} >+</button>
        <button className={zoomOutClass} onClick={this.zoomOut} >-</button>
         <div className={MainDiv} >
         <div className={contextMenu}>
            <div className="d3contextItem" onClick={this.goToDFDDiag}><p>{`Go to DFD`}</p></div>
            <div className="d3contextItem" onClick={this.expandSeparateWindow}><p>{`Expand in separate window`}</p></div>
            <div className="d3contextItem" onClick={this.expandSourceView}><p>{`Expand in source view`}</p></div>
            <div className="d3contextItem" onClick={this.goToPgmStr}><p>{`go to pgm str chart`}</p></div>
         </div>
         </div>
    </ScrollContainer>

 )}


}

export default DFDChartWindow;

