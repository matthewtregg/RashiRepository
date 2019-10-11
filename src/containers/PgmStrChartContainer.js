import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {setPgmStrChartMode,setHighlightPgm, setDiagramData} from '../Redux/actions/pgmStrChart';
import PgmStrChartWindow from '../components/Charts/ProgramStructureDiagrams/PgmStrChartWindow';
import {setNextDiagram} from '../Redux/actions/Mainwindow';
import {setPgmListWindowMode} from '../Redux/actions/pgmList';
import {changePgmSource} from '../Redux/actions/pgmSource';
import {changeLoadedStatus,setChartLinkedPgm, setChartCentre, zoomIn, zoomOut, setInitialLoadedStatus,setInitialZoom, setInitialCentre} from '../Redux/actions/diagrams';


const mapStateToProps = (state) => {
  return {
    // chart array
    chartArray: state.mainWindow.chartArray,
    // highlighted pgms
    HighlightedPgms: state.pgmStrChart.HighlightedPgms,
    // pgm structure chart mode
    pgmStrChartMode: state.pgmStrChart.modes,
    // diagram data
    diagData: state.pgmStrChart.diagData,
    // chart linked pgms
    zoomLevels: state.diagrams.zoomLevels,
    // charts for whether chart is Loaded 
    loadedCharts: state.diagrams.loadedCharts, 
    // chart center coordinate for all charts
    chartCentres: state.diagrams.chartCentres,
    // the pgm structure chart array
    chartLinkedPgms: state.diagrams.chartLinkedPgms,
    // next diagrams
    nextDiagrams: state.mainWindow.nextDiagrams,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // set chart Centre for screen Id
    setChartCentre: (centre,screenId) => dispatch(setChartCentre(centre,screenId)),
    // zoom in at screen Id
    zoomIn: (screenId) => dispatch(zoomIn(screenId)),
    // zoom out at screen Id
    zoomOut: (screenId) => dispatch(zoomOut(screenId)) , 
    // set next diagram at screen Id
    setNextDiagram: (nextDiagram, screenId) => dispatch(setNextDiagram(nextDiagram,screenId)),
    // change loaded status at screen Id
    changeLoadedStatus: (screenId) => dispatch(changeLoadedStatus(screenId)),
    // set initial loaded status at screen Id
    setInitialLoadedStatus: (screenId) => dispatch(setInitialLoadedStatus(screenId)),
    // set inital zoom at screen Id
    setInitialZoom: (screenId) => dispatch(setInitialZoom(screenId)),
    // set initial centre at screen Id
    setInitialCentre: (screenId, centre) => dispatch(setInitialCentre(screenId,centre)),
    // set Pgm list window mode
    setPgmListWindowMode: (pgmListWindowMode) => dispatch(setPgmListWindowMode(pgmListWindowMode)),
    // set chart linked pgm 
    setChartLinkedPgm: (chartLinkedPgm, screenId) => dispatch(setChartLinkedPgm(chartLinkedPgm,screenId)),
    // set highlighted Pgm on str chart
    setHighlightedPgm: (highlightedPgm, screenId) => dispatch(setHighlightPgm(highlightedPgm, screenId)),
    // set the mode of the pgm str chart
    setPgmStrChartMode: (mode, screenId) => dispatch(setPgmStrChartMode(mode, screenId)),
    // set Diagram Data for pgm str chart
    setDiagramData: (chartArray, pgm, screenId) => dispatch(setDiagramData(chartArray,pgm,screenId)),
    // MAKE PGM SOURCE GET REQUEST (to remove)
    changePgmSource: (pgmSource, screenId) => dispatch(changePgmSource(screenId,pgmSource))
  } 
}

function PgmStrChartContainer({
  RepoName,
  chartCentres,
  setChartCentre,
  zoomLevels,
  zoomIn,
  zoomOut,
  nextDiagrams,
  setNextDiagram,
  loadedCharts,
  changeLoadedStatus,
  setPgmListWindowMode,
  screenId,
  setInitialLoadedStatus,
  setInitialZoom,
  setInitialCentre,
  pgmListWindowMode,
  setChartLinkedPgm,
  chartArray,
  setHighlightedPgm,
  HighlightedPgms,
  pgmStrChartMode,
  setPgmStrChartMode,
  setDiagramData,
  diagData,
  changePgmSource,
  showDFDDiagram
}) {




useEffect(() => {
setPgmStrChartMode("Conventional", screenId)
},[])


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

const [nextDiagram, loaded, centre, zoomLevel] = getScreenInfo(screenId)


const checkIfExists  = (array, screenId) => {
  if (array.length > 0) return array.filter((pgm)=> pgm.screenId === screenId )
  else return []
}

let newHighlightedPgm = checkIfExists(HighlightedPgms, screenId)
let mode = checkIfExists(pgmStrChartMode, screenId)
let data = checkIfExists(diagData, screenId)

console.log(diagData);
console.log(data);
console.log(screenId);
newHighlightedPgm = newHighlightedPgm.length>0 ?
newHighlightedPgm[0].HighlightedPgm : undefined;

mode = mode.length > 0  ? 
mode[0].chartMode:undefined;

data = data.length > 0  ? 
data[0].DiagData:undefined;


const PgmStrChart = chartArray.length > 0 ?  < PgmStrChartWindow 
  setInitialLoadedStatus = {
    setInitialLoadedStatus
  }
  setInitialZoom = {
    setInitialZoom
  }
  setInitialCentre = {
    setInitialCentre
  }
  RepoName = {
    RepoName
  }
  zoomLevel = {
    zoomLevel
  }
  zoomIn = {
    zoomIn
  }
  zoomOut = {
    zoomOut
  }
  centre = {
    centre
  }
  setChartCentre = {
    setChartCentre
  }
  setNextDiagram = {
    setNextDiagram
  }
  nextDiagram = {
    nextDiagram
  }

  showDFDDiagram ={
    showDFDDiagram
  }
  changeLoadedStatus = {
    changeLoadedStatus
  }
  loaded = {
    loaded
  }
  setPgmListWindowMode = {
    setPgmListWindowMode
  }

  pgmListWindowMode = {
    pgmListWindowMode
  }

  diagData = { 
    data
  }

  screenId = {
    screenId
  }
  
  setChartLinkedPgm = {
    setChartLinkedPgm
  }

  setHighlightedPgm = {
    setHighlightedPgm
  }

  HighlightedPgm = {
    newHighlightedPgm
  }

  pgmStrChartMode = {
    mode
  }

  setPgmStrChartMode = {
    setPgmStrChartMode
  }

  chartArray = {
    chartArray
  }

  setDiagramData = {
    setDiagramData
  }

  // state for changing pgm Source in source browser 
  changePgmSource ={
    changePgmSource
  }
/> : <div>loading</div>

return (
   PgmStrChart
)

} 

export default connect(mapStateToProps,mapDispatchToProps)(PgmStrChartContainer);
