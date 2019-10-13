import React  from 'react';
import {connect} from 'react-redux';
import {setPgmListWindowMode} from '../Redux/actions/pgmList';
import PgmListWindow from '../components/PgmListWindow/PgmListWindow';
import {setNextDiagram} from '../Redux/actions/Mainwindow';
import {changePgmSource} from '../Redux/actions/pgmSource';
import {getPgmWhereUsedData, getFileWhereUsedData, getFieldWhereUsedData, getVarWhereUsedData} from '../Redux/actions/WhereUsed';
import {setNextDFDType} from '../Redux/actions/pgmDFDChart';

const mapStateToProps = (state) => {
  return {
    // program list
    pgmList: state.pgmList.pgmList,
    // program list window mode
    pgmListWindowMode: state.pgmList.pgmListWindowMode,
    // array of program source list
    pgmSourceList: state.pgmSource.pgmSourceList, 
    // linked pgms for multiple view (NEED TO CHANGE THIS)
    chartArray: state.mainWindow.chartArray,
    // next diagram list
    nextDiagrams: state.mainWindow.nextDiagrams,
    // repoName
    repoName: state.mainWindow.repoName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // change the pgm List view show
    setPgmListWindowMode: (pgmListWindowMode) => dispatch(setPgmListWindowMode(pgmListWindowMode)),
    // change the diagram to show (this is an array of diagram screen key value pair)
    setNextDiagram: (nextDiagram,screenId) => dispatch(setNextDiagram(nextDiagram,screenId)),
    // change the pgm source data for pgm source view
    changePgmSource: (pgmSource, screenId) => dispatch(changePgmSource(screenId,pgmSource)),
    // get Pgm where used data
    getPgmWhereUsedData : (pgm, screenId, repoName) => dispatch(getPgmWhereUsedData(pgm, screenId, repoName)),
    // get file where used data
    getFileWhereUsedData: (ent, screenId, repoName) => dispatch(getFileWhereUsedData(ent, screenId , repoName)),
    // get field where used data
    getFieldWhereUsedData: (field, screenId, repoName) => dispatch(getFieldWhereUsedData(field, screenId, repoName)),
    // get variable where used data
    getVarWhereUsedData: (variable, screenId, repoName) => dispatch(getVarWhereUsedData(variable, screenId, repoName)),
    // next DFD type 
    setNextDFDType: (type) => dispatch(setNextDFDType(type))
  }
}

// THIS WINDOW IS FOR NAVIGATING BETWEEN DIFFERENT TYPES OF CHART


function PgmListWindowContainer({
  // set the next diagram to show for a particular screen number
  setNextDiagram,
  // change the pgm list window mode
  setPgmListWindowMode,
  // the pgm list 
  pgmList,
  // the pgm list mode
  pgmListWindowMode,
  // change the loaded status for a pgm str chart at a given window
  changeLoadedStatus,
  // change the chart centres for a pgm str chart at a given window
  changePgmSource,
  // the pgm structure chart Array -- only need this in pgm str chart container
  chartArray,
  // data for pgm where used
  getPgmWhereUsedData,
  // repoName
  repoName
}) {



// THESE ARE ALL UNIVERSAL METHODS TO SWITCH BETWEEN SCREENS 
const showWhereUsedPgm = (pgm,screenId) => {
  console.log("Where used pgm");
  console.log(repoName);
  getPgmWhereUsedData(pgm, 1, repoName);
  setPgmListWindowMode("ListAndWhereUsed");
}

const showWhereUsedFile= (file,screenId) => {
  getFileWhereUsedData(file, screenId, repoName);
  setPgmListWindowMode("ListAndWhereUsed");
}

const showWhereUsedVar= (variable,screenId) => {
  getVarWhereUsedData(variable,screenId, repoName)
  setPgmListWindowMode("ListAndWhereUsed");
}

const showWhereUsedField= (field,screenId) => {
  getFieldWhereUsedData(field, screenId, repoName);
  setPgmListWindowMode("ListAndWhereUsed");
}



const displaySelectedPgm = (pgm, screenId) => {
  setNextDiagram(pgm, 1);
  setPgmListWindowMode("ListAndPgmStrChart");
}

const showDFDDiagram = (pgm) => {
  setNextDiagram(pgm, 1);
  setPgmListWindowMode("ListAndDFD");
}


const compareSelectedPgm = (pgm, screenId) => {
  setNextDiagram(pgm, screenId+1);
  setPgmListWindowMode("ListAnd2PgmStrCharts");
  
}

const goToSourceView = (pgm,screenId) => {
  setNextDiagram(pgm, 1);
  changePgmSource(pgm, 1)
  setPgmListWindowMode("ListAndSourceCode");
}

const compareSource = (pgm,screenId) => {
  setNextDiagram(pgm, screenId+1);
  changePgmSource(pgm, screenId+1)
  setPgmListWindowMode("ListAnd2SourceCode");
}



const ListWindow = chartArray.length > 0 ? 
< PgmListWindow 
// move to DFD diagram
showDFDDiagram = {
  showDFDDiagram
}
// set the next diagram
setNextDiagram = {
  setNextDiagram
}

// change the loaded status of diagram at a given screen
changeLoadedStatus = {
  changeLoadedStatus
}
// move to two screens of pgm structure chart
compareSelectedPgm = {
  compareSelectedPgm
}
// move to two screens of compare source
compareSource = {
  compareSource
}

// display the selected pgm structure chart
displaySelectedPgm = {
  displaySelectedPgm
}

// display the selected pgm source browser view
goToSourceView = {
  goToSourceView
}

// the mode of the pgm list window
pgmListWindowMode = {
  pgmListWindowMode
}

// program list 
pgmList = {
  pgmList
}

// move to show where used pgm 
showWhereUsedPgm = {
  showWhereUsedPgm
}
/>  
:<div>loading</div>;

return (
  ListWindow
)

} 

export default connect(mapStateToProps,mapDispatchToProps)(PgmListWindowContainer);

