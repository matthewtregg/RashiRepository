import React, {Component} from 'react';
import './PgmStrChart.css';
import {getPgmCoords} from './PgmStrChartUtils';
import ScrollContainer from '../scrollContainer/ScrollContainer';
import {newPgmStrChart } from '../ProgramStructureDiagrams/PgmStrChartV1/PgmStrChartV1';
import {newPgmStrChart2 } from '../ProgramStructureDiagrams/PgmStrChartV2/PgmStrChartV2';
import {newPgmStrChart3 } from '../ProgramStructureDiagrams/PgmStrChartV3/PgmStrChartV3';
// Split up PgmStrChart Window
class PgmStrChartWindow extends Component {

  constructor(props) {
    super(props);
    this.state = {searchValue:''}
    this.pgmName = "";
  }


  componentDidMount() {
    // set centred to false
    this.centred  =false;
    // set the main div that d3 is attached to
    this.MainDiv = ".chartCanvas" + this.props.screenId;
    // set the context menu attached to diagram
    this.contextMenu='.d3contextmenu' + this.props.screenId;
    // set the screen Id
    this.screenId = this.props.screenId;
    // if screen Id is one set initial load status of screen
    this.props.setInitialLoadedStatus(this.screenId);
    // if screen Id is one set initial load status of screen
    this.props.setInitialZoom(this.screenId)
    // if screen Id is one set initial load status of screen
    this.props.setInitialCentre({centerX:0,centerY:0},this.screenId)
    this.forceUpdate();
  }

  componentDidUpdate() {
    // set the context menu attached to diagram
    this.contextMenu='.d3contextmenu' + this.props.screenId;
    // set the main div that d3 is attached to
    this.MainDiv = ".chartCanvas" + this.screenId;
    // set the entry equal to next diagram
    this.entryPoint = this.props.nextDiagram;
    // if changing diagram on component

    if (this.currentDiagram!==this.entryPoint) {
      // set centred to false
      this.centred = false;
      // save current diagram as this diagram
      this.currentDiagram = this.entryPoint;
      // save scale of diagram 
      this.scale = this.props.zoomLevel;
      // construct the diagram data from diagrams modules
      this.props.setDiagramData(this.props.chartArray, this.entryPoint,this.props.screenId) 
      // create the d3 diagram
      this.createPgmStrChart(this.props.diagData, this)
    } 

    else if (this.props.zoomLevel!== this.scale) {
      // save current diagram
      this.currentDiagram = this.entryPoint;
      // save currently highlighted Pgm
      this.HighlightedPgm = this.props.HighlightedPgm ;
      // create the d3 diagram
      this.createPgmStrChart(this.props.diagData, this)
    }
    
    else if (this.HighlightedPgm!== this.props.HighlightedPgm && this.props.HighlightedPgm ) {
      // save current diagram
      this.currentDiagram = this.entryPoint;
      // save currently highlighted Pgm
      this.HighlightedPgm = this.props.HighlightedPgm ;
      // create the d3 diagram
      this.createPgmStrChart(this.props.diagData, this)
    }

    else if (this.mode!== this.props.pgmStrChartMode && this.props.pgmStrChartMode) {
      // save current diagram
      this.currentDiagram = this.entryPoint;
      // create the d3 diagram
      this.createPgmStrChart(this.props.diagData, this)
    }
  
    else {
      return false;
    }
  }


  createPgmStrChart(data, context) {
    if (data) {
    if (context.props.pgmStrChartMode) {
    switch(context.props.pgmStrChartMode) {
      case "Conventional":  
      newPgmStrChart(data, context);
      break;
      case "UML View":
      newPgmStrChart2(data, context);
      break;
      case "Compact UML View":
      newPgmStrChart3(data, context);
      break;
      default:
      newPgmStrChart(data, context);

    }
  }
  else newPgmStrChart(data, context)
    }
  }

    highlightPgm = () => {
      this.props.setHighlightedPgm(this.pgmName, this.props.screenId);
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
    
    centreOnPgm = (e) => {
      e.preventDefault();
      const {centerX, centerY} = getPgmCoords(this.diagData, this.state.searchValue);
      this.props.setChartCentre({centerX:(centerX*this.props.zoomLevel + this.props.zoomLevel*5000),centerY:(centerY*this.props.zoomLevel)}, this.props.screenId);
      this.props.changeLoadedStatus(this.props.screenId);
    }

    setSearchValue = (e) => {
      const searchValue  = e.target.value;
      // set search Value on local state
      this.setState({searchValue:searchValue})
    }

    goToDFDDiag = () => {
      // move to show DFD diagram
      this.props.showDFDDiagram(this.pgmName,this.props.screenId)
    }

    goToNextPgm = () => {
      // move to another Pgm Structure chart
      this.centred = false;
      this.props.setNextDiagram(this.pgmName, this.props.screenId); 
      this.props.changeLoadedStatus(this.props.screenId);
    }

    expandSeparateWindow = () => {
      // move to two Pgm Structure Charts
      this.props.setNextDiagram(this.pgmName, this.props.screenId + 1);
      this.props.setInitialLoadedStatus(this.props.screenId+1);
      this.props.setInitialZoom(this.props.screenId+1)
      this.props.setInitialCentre({centerX:0,centerY:0},this.props.screenId+1)
      this.props.setPgmListWindowMode("ListAnd2PgmStrCharts")
    }
    
    expandSourceView = () => {
      // move to Pgm Structure chart and source
      this.props.setChartLinkedPgm(this.pgmName, this.props.screenId);
      this.props.changePgmSource(this.pgmName, this.props.screenId);
      this.props.setPgmListWindowMode("ListSourceCodeAndPgmStrChart")  
    }

    switchUMLView = () => {
      // move Pgm structure chart in elbow line view
      this.props.setPgmStrChartMode("UML View", this.props.screenId)
    }

    switchCompactUMLView = () => {
      // move Pgm structure chart in compact elbow line view
      this.props.setPgmStrChartMode("Compact UML View", this.props.screenId)
    }

    switchConventional = () => {
      // move Pgm structure chart in conventional view
      this.props.setPgmStrChartMode("Conventional", this.props.screenId)
    }
  
    WhereUsed = () => {
      this.props.showWhereUsedPgm(this.pgmName,this.props.screenId);
  }


  render() { 
    // get chart title search form for screen id
    const chartTitle = getChartTitle(this.props.pgmListWindowMode, this);
    const searchForm = getSearchForm(this.props.pgmListWindowMode, this); 
    // get the zoom in class
    const zoomInClass = this.props.pgmListWindowMode === "ListAnd2PgmStrCharts" ? "zoomIn" + this.props.screenId:"zoomIn";
    // get the zoom out class
    const zoomOutClass = this.props.pgmListWindowMode  === "ListAnd2PgmStrCharts"? "zoomOut" + this.props.screenId:"zoomOut";
    // get the d3 context menu
    const contextMenu = "d3contextmenu" + this.props.screenId;
    // get
    const MainDiv = "chartCanvas" + this.props.screenId;
    // d3 context menu 
    return (
    <ScrollContainer pgmListWindowMode={this.props.pgmListWindowMode} screenId={this.props.screenId} className="scroll-container" scrollPos={this.props.centre} changeLoadedStatus={this.props.changeLoadedStatus} loaded={this.props.loaded} >
          <button className={zoomInClass} onClick={this.zoomIn} >+</button>
          <button className={zoomOutClass} onClick={this.zoomOut} >-</button>
          <div className={MainDiv} >
          <div className={contextMenu}>
             <div className="d3contextItem" onClick={this.goToNextPgm}><p>{`Go to pgm`}</p></div>
             <div className="d3contextItem" onClick={this.goToDFDDiag}><p>{`Go to DFD`}</p></div>
             <div className="d3contextItem" onClick={this.expandSeparateWindow}><p>{`Expand in separate window`}</p></div>
             <div className="d3contextItem" onClick={this.expandSourceView}><p>{`Expand in source view`}</p></div>
             <div className="d3contextItem" onClick={this.switchUMLView}><p>{`UML View`}</p></div>
             <div className="d3contextItem" onClick={this.switchCompactUMLView}><p>{`Compact UML View`}</p></div>
             <div className="d3contextItem" onClick={this.switchConventional}><p>{`Conventional`}</p></div> 
             <div className="d3contextItem" onClick={this.highlightPgm}><p>{`Highlight Pgm`}</p></div> 
             <div className="d3contextItem" onClick={this.WhereUsed}><p>{`Where Used`}</p></div>  
          </div>  
          </div>
            {chartTitle}
            {searchForm} 
    </ScrollContainer>
  )}

}



const getChartTitle = (windowMode,context) => {
  const chartTitleCss = "chartTitle" + context.screenId
  switch (windowMode) {
    case "ListAndPgmStrChart":
      return <div className={chartTitleCss}>
      <h1>{`Pgm: ${context.entryPoint}`}</h1>
    </div>;
    case "ListAnd2PgmStrCharts":
      return <div className={chartTitleCss}>
      <h1>{`Pgm: ${context.entryPoint}`}</h1>
      </div>;
    case "ListSourceCodeAndPgmStrChart":
      return <div className="chartTitle2">
      <h1>{`Pgm: ${context.entryPoint}`}</h1>
      </div>;
    case "ListSourceCodeWhereUsedAndPgmStrChart":
      return <div className="sourceCodeWhereUsedChartTitle">
      <h1>{`Pgm: ${context.entryPoint}`}</h1>
      </div>;
    default :
      return <div className="chartTitlePgmWindow">
      <h1>{`Pgm: ${context.entryPoint}`}</h1>
    </div>;
  }

}

const getSearchForm = (windowMode, context) => {
  const searchFormTitleCss = "searchForm" + context.screenId;
  
  switch (windowMode) {
    case "ListAndPgmStrChart":
      return  <form onSubmit={context.centreOnPgm}  className={searchFormTitleCss}>
      <input type='text' placeholder ="...centre on pgm" onChange={context.setSearchValue} value={context.state.searchValue} name="search" className="text"/>
  </form>;
    case "ListAnd2PgmStrCharts":
      return <form onSubmit={context.centreOnPgm}  className={searchFormTitleCss}>
      <input type='text' placeholder ="...centre on pgm" onChange={context.setSearchValue} value={context.state.searchValue} name="search" className="text"/>
    </form>;
    case "ListSourceCodeAndPgmStrChart":
      return <form onSubmit={context.centreOnPgm}  className="searchForm2">
      <input type='text' placeholder ="...centre on pgm" onChange={context.setSearchValue} value={context.state.searchValue} name="search" className="text"/>
    </form>;
    case "ListSourceCodeWhereUsedAndPgmStrChart":
      return <form onSubmit={context.centreOnPgm}  className="searchFormsourceCodeWhereUsed">
      <input type='text' placeholder ="...centre on pgm" onChange={context.setSearchValue} value={context.state.searchValue} name="search" className="text"/>
      </form>;
    default :
      return <form onSubmit={context.centreOnPgm} className="searchFormPgmWindow">
      <input type='text' placeholder ="...centre on pgm" onChange={context.setSearchValue} value={context.state.searchValue} name="search" className="text"/>
  </form>;  
  }

}

export default PgmStrChartWindow;


