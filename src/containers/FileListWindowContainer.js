import React from 'react';
import {connect} from 'react-redux';
import {setEntListWindowMode} from '../Redux/actions/entList';
import FileListWindow from '../components/FileListWindow/FileListWindow';
import {setNextDiagram} from '../Redux/actions/Mainwindow';
import { getFileWhereUsedData, getFieldWhereUsedData, getVarWhereUsedData} from '../Redux/actions/WhereUsed';


const mapStateToProps = (state) => {
  return {
    entList: state.entList.entList,
    entListWindowMode: state.entList.entListWindowMode,
    chartArray: state.mainWindow.chartArray,
    nextDiagrams: state.mainWindow.nextDiagrams,
    repoName: state.mainWindow.repoName,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEntListWindowMode: (entListWindowMode) => dispatch(setEntListWindowMode(entListWindowMode)),
    setNextDiagram: (nextDiagram,screenId) => dispatch(setNextDiagram(nextDiagram,screenId)),
    getFileWhereUsedData: (ent, screenId, repoName) => dispatch(getFileWhereUsedData(ent, screenId, repoName)),
    getFieldWhereUsedData: (field, screenId, repoName) => dispatch(getFieldWhereUsedData(field, screenId, repoName)),
    getVarWhereUsedData: (variable, screenId, repoName) => dispatch(getVarWhereUsedData(variable, screenId, repoName)),
  }
}

function FileListWindowContainer({
  repoName,
  currentDiagrams,
  chartArray,
  entList,
  entListWindowMode,
  setNextDiagram,
  setEntListWindowMode,
  nextDiagrams,
  getFileWhereUsedData,
}) {


const displaySelectedEnt = (ent, screenId) => {
  setNextDiagram(ent, screenId);
  setEntListWindowMode("ListAndEntRelChart");
}

const showWhereUsedFile= (file,screenId) => {
  getFileWhereUsedData(file, screenId, repoName);
  setEntListWindowMode("ListAndWhereUsed");
}


const ListWindow = chartArray.length > 0 ? 
< FileListWindow 

entListWindowMode = {
  entListWindowMode
}

entList = {
  entList
}

nextDiagrams = {
  nextDiagrams
}

showWhereUsedFile ={
  showWhereUsedFile
}

currentDiagrams = {
  currentDiagrams
}

displayEntRelChart = {
  displaySelectedEnt
}
/>  
:<div>loading</div>;

return (
  ListWindow
)

} 

export default connect(mapStateToProps,mapDispatchToProps)(FileListWindowContainer);
