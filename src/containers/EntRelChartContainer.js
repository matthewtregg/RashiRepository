import React from 'react';
import {connect} from 'react-redux';
import {setNextDiagram} from '../Redux/actions/Mainwindow';
import {remChldRelChartArray,remParRelChartArray,setChldButtonPressed,setParButtonPressed,addChldRelChartArray,addParRelChartArray,getRelChartArray, setEntRelChartData} from '../Redux/actions/entRelChart';
import EntRelChartWindow from '../components/Charts/EntRelDiagram/EntRelChartWindow';
import {changeLoadedStatus,setChartLinkedPgm, setChartCentre, zoomIn, zoomOut, setInitialLoadedStatus,setInitialZoom, setInitialCentre} from '../Redux/actions/diagrams';

const mapStateToProps = (state) => {
  return {
    relChartArray: state.entRelChart.relChartArray,
    zoomLevels: state.diagrams.zoomLevels,
    // charts for whether chart is Loaded 
    loadedCharts: state.diagrams.loadedCharts, 
    // chart center coordinate for all charts
    chartCentres: state.diagrams.chartCentres,
    // the pgm structure chart array
    chartLinkedPgms: state.diagrams.chartLinkedPgms,
    entRelData: state.entRelChart.entRelData ,
    // next diagrams
    nextDiagrams: state.mainWindow.nextDiagrams,
    repoName: state.mainWindow.repoName,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setNextDiagram: (nextDiagram, screenId) => dispatch(setNextDiagram(nextDiagram,screenId)),
    setEntRelChartData: (relChartArray, ent, screenId,otherRelData) => dispatch(setEntRelChartData(relChartArray,ent,screenId,otherRelData)),
    getEntRelChartArray: (ent, screenId) => dispatch(getRelChartArray(ent,screenId)),
    addParRelChartArray: (ent,screenId, repoName) => dispatch(addParRelChartArray(ent, screenId, repoName)),
    addChldRelChartArray: (ent,screenId, repoName) => dispatch(addChldRelChartArray(ent, screenId, repoName)) ,
    setParButtonPressed: (ent,screenId) => dispatch(setParButtonPressed(ent, screenId)) ,
    setChldButtonPressed: (ent,screenId) => dispatch(setChldButtonPressed(ent, screenId)), 
    remParRelChartArray: (ent,screenId) => dispatch(remParRelChartArray(ent, screenId)),
    remChldRelChartArray: (ent,screenId) => dispatch(remChldRelChartArray(ent, screenId)) ,
    setInitialLoadedStatus: (screenId) => dispatch(setInitialLoadedStatus(screenId)),
    setInitialZoom: (screenId) => dispatch(setInitialZoom(screenId)),
    setInitialCentre: (screenId, centre) => dispatch(setInitialCentre(screenId,centre)),
    setChartLinkedPgm: (chartLinkedPgm, screenId) => dispatch(setChartLinkedPgm(chartLinkedPgm,screenId)),
    changeLoadedStatus: (screenId) => dispatch(changeLoadedStatus(screenId)),
    setChartCentre: (centre,screenId) => dispatch(setChartCentre(centre,screenId)),
  }
}

function EntRelChartContainer({
  setEntRelChartData,
  relChartArray,
  screenId,
  setInitialCentre,
  setInitialZoom,
  setInitialLoadedStatus,
  getEntRelChartArray,
  entRelData,
  addParRelChartArray,
  addChldRelChartArray,
  remParRelChartArray,
  remChldRelChartArray,
  setParButtonPressed,
  setChldButtonPressed,
  zoomLevels,
  loadedCharts,
  nextDiagrams,
  chartCentres
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

const [nextDiagram, loaded, centre, zoomLevel] = getScreenInfo(screenId);

const checkIfExists  = (array, screenId) => {
    if (array.length > 0) return array.filter((pgm)=> pgm.screenId === screenId )
    else return []
}  

console.log(relChartArray);

const data = checkIfExists(relChartArray, screenId)
const reldata = data.length > 0  ? 
data[0].entRelDataChart:undefined;

const otherRelData = data.length > 0  ? 
data[0].entRelOtherRels:undefined;

let chartData = checkIfExists(entRelData, screenId)
chartData = chartData.length > 0 ?
chartData[0].entRelDataChart:undefined;



return (

  <EntRelChartWindow 
 
  otherRelData = {
    otherRelData
  }

  addParRelChartArray = {
    addParRelChartArray
  }

  addChldRelChartArray = {
    addChldRelChartArray
  }

  remParRelChartArray = {
    remParRelChartArray
  }

  remChldRelChartArray = {
    remChldRelChartArray
  }

  setParButtonPressed = {
    setParButtonPressed
  }
  
  setChldButtonPressed = {
    setChldButtonPressed
  }


  getEntRelChartArray = {
    getEntRelChartArray
  }

  relChartArray = {
    reldata
  }

  chartData = {
    chartData
  }

  setEntRelInitialCentre = {
    setInitialCentre
  }

  setEntRelInitialZoom = {
    setInitialZoom
  }
  
  setEntRelInitialLoadedStatus = {
    setInitialLoadedStatus
  }

  nextEntRelChart = {
    nextDiagram
  }

  setEntRelChartData = {
    setEntRelChartData
  }

  entRelData = {
    reldata
  }
  
  centre ={
    centre
  }

  setEntChartCentre = {
    setChartCentre
  }

  screenId = {
    screenId
  }

  loaded = {
    loaded
  }

  zoomLevel = {
    zoomLevel
  }

  /> 
  )



} 

export default connect(mapStateToProps,mapDispatchToProps)(EntRelChartContainer);




