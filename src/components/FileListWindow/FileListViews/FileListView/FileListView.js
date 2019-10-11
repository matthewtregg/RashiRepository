import React from 'react';
import FileList from '../../../MainWindowLists/FileList/FileList';

import './FileListView.css';

const FileListView = ({
    entList,
    entListWindowMode,
    displaySelectedEnt,
    showWhereUsedFile
}) => {

return (
  <div className="EntListWindowContainer">
  <div key={"A"} className="EntListHeader" > Files</div>
  <div className = "EntListWindow">
  <FileList displaySelectedEnt={displaySelectedEnt} 
  showWhereUsedFile={showWhereUsedFile}
  maxDiagScreenId={0} 
  maxSourceScreenId={0} 
  screenId={1} 
  entList={entList} 
  entListWindowMode={entListWindowMode} ></FileList>
  </div></div>
  );
}

export default FileListView;