import React from 'react';
import FileList from '../../../MainWindowLists/FileList/FileList';
import EntRelChartContainer from '../../../../containers/EntRelChartContainer'; 
import './FileListEntChartView.css';

const FileListEntChartView = ({
  displaySelectedEnt,
  entList,
  entListWindowMode,
  entCentredChartScreen1,
  nextDiagramScreenOne,
  showWhereUsedFile
}) => {
return (
  <div className = "EntListChartWindowContainer">
    <div className="EntListChartWindow">
    <div key={"A"} className="EntityListChartHeader" >Files</div>
    <FileList 
    showWhereUsedFile={showWhereUsedFile}
    maxDiagScreenId={1} 
    maxSourceScreenId={0} 
    screenId={1} 
    entList={entList}  
    displaySelectedEnt={displaySelectedEnt} 
    entListWindowMode={entListWindowMode} >
    </FileList>
    </div>
    <EntRelChartContainer  
    screenId={1} 
    centre={entCentredChartScreen1} 
    entListWindowMode={entListWindowMode}
    nextEntRelChart={nextDiagramScreenOne}
    ></EntRelChartContainer>
    </div>

  );
}

export default FileListEntChartView;

