import React from 'react';
import {connect} from 'react-redux';
import DFDChart from '../components/Charts/DFDDiagram/DFDchart';
import {setDFDPgmDiagramData, setDFDFileDiagramData,setNextDFDType} from '../Redux/actions/pgmDFDChart';
import {setNextDiagram} from '../Redux/actions/Mainwindow';
import {setPgmListWindowMode} from '../Redux/actions/pgmList';
import {changeLoadedStatus,setChartLinkedPgm, setChartCentre, zoomIn, zoomOut, setInitialLoadedStatus,setInitialZoom, setInitialCentre} from '../Redux/actions/diagrams';

const mapStateToProps = (state) => {
  return {
    // dfd diagram data
    DFDDiagramData: state.pgmDFDChart.DFDChartData,
    // DFD chart Type
    DFDChartType: state.pgmDFDChart.DFDChartType,
    // zoom LEVELS for all charts
    zoomLevels: state.diagrams.zoomLevels,
    // charts for whether chart is Loaded 
    loadedCharts: state.diagrams.loadedCharts, 
    // chart center coordinate for all charts
    chartCentres: state.diagrams.chartCentres,
    // next diagrams
    nextDiagrams: state.mainWindow.nextDiagrams,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setDFDPgmDiagramData: (pgm, screenId) => dispatch(setDFDPgmDiagramData(pgm, screenId)),
    setDFDFileDiagramData: (ent,view, screenId) => dispatch(setDFDFileDiagramData(ent,view, screenId)),
    setNextDFDType: (type) => dispatch(setNextDFDType(type)),
    setNextDiagram: (nextDiagram, screenId) => dispatch(setNextDiagram(nextDiagram,screenId)),
    setChartCentre: (centre,screenId) => dispatch(setChartCentre(centre,screenId)),
    changeLoadedStatus: (screenId) => dispatch(changeLoadedStatus(screenId)),
    setChartLinkedPgm: (chartLinkedPgm, screenId) => dispatch(setChartLinkedPgm(chartLinkedPgm,screenId)),
    setInitialLoadedStatus: (screenId) => dispatch(setInitialLoadedStatus(screenId)),
    setInitialZoom: (screenId) => dispatch(setInitialZoom(screenId)),
    setInitialCentre: (screenId, centre) => dispatch(setInitialCentre(screenId,centre)),
    zoomIn: (screenId) => dispatch(zoomIn(screenId)),
    zoomOut: (screenId) => dispatch(zoomOut(screenId)) 
  } 
}


function DFDChartContainer ({
  setDFDPgmDiagramData,
  DFDDiagramData,
  screenId,
  setNextDiagram,
  setDFDFileDiagramData,
  setNextDFDType,
  DFDChartType,
  displaySelectedPgm,
  nextDiagrams,
  loadedCharts,
  chartCentres,
  zoomLevels,
  zoomIn,
  zoomOut,
  setInitialCentre,
  setInitialLoadedStatus,
  setInitialZoom,
  setChartCentre,
  changeLoadedStatus
}) {

const getScreenInfo = (screenId) => {
    // MainWindowhas a list of all diagrams and corresponding screenId
    const nextDiagramScreen = nextDiagrams.length > 0 ? nextDiagrams.filter(nextDiagram => nextDiagram.screenId === screenId)[0].nextDiagram : null;
    // loaded charts for corresponding charts
    const loadedScreen = loadedCharts.length > 0 ? loadedCharts.filter(loadedChart => loadedChart.screenId === screenId)[0].loaded : null;
    // centred info for corresponding charts
    const centredChartScreen = chartCentres.length > 0 ? chartCentres.filter(centredChart => centredChart.screenId === screenId)[0].centre : null;
    // zoom level for corresponding charts
    const zoomLevelScreen = zoomLevels.length > 0 ? zoomLevels.filter(zoomLevel => zoomLevel.screenId === screenId)[0].zoomLevel : null;
  
    return [
      nextDiagramScreen,
      loadedScreen,
      centredChartScreen,
      zoomLevelScreen
    ]
}  
  // get Relevant Diagram Information 

const getDFDInfo = (DFDDiagramData, DFDId) => {
  return DFDDiagramData.filter(DiagData => DiagData.screenId === DFDId)[0];
}  
  // get Relevant DFD chart Information 



const [nextDiagram, loaded, centre, zoomLevel] = getScreenInfo(screenId)
const DFDData = getDFDInfo(DFDDiagramData,screenId)


const setNextFileDFDDiagram = (nextDiagram,screenId) => {
  setNextDFDType('File');
  setNextDiagram(nextDiagram,screenId);
}

const setNextPgmDFDDiagram = (nextDiagram,screenId) => {
  setNextDFDType('');
  setNextDiagram(nextDiagram,screenId);
}

return (
  <DFDChart 

  zoomLevel = {
    zoomLevel
  }
  zoomIn = {
    zoomIn
  }
  zoomOut = {
    zoomOut
  }
  
  setInitialLoadedStatus = {
    setInitialLoadedStatus
  }
  
  setInitialZoom = {
    setInitialZoom
  }
  
  setInitialCentre = {
    setInitialCentre
  }
  screenId={screenId} 
   
  DFDDiagramData={DFDData} 

  setPgmListWindowMode={setPgmListWindowMode}

  setNextPgmDFDDiagram ={setNextPgmDFDDiagram}

  setNextFileDFDDiagram={setNextFileDFDDiagram} 
   
  nextDFDDiagram={nextDiagram} 
   
  setDFDPgmDiagramData={setDFDPgmDiagramData}
   
  setDFDFileDiagramData={setDFDFileDiagramData}
   
  DFDChartType={DFDChartType}

  displaySelectedPgm={displaySelectedPgm}

  centre = {
    centre
  }
  setChartCentre = {
    setChartCentre
  }

  changeLoadedStatus = {
    changeLoadedStatus
  }

  loaded = {
    loaded
  }
  >
 </DFDChart>
)
} 

export default connect(mapStateToProps,mapDispatchToProps)(DFDChartContainer);


