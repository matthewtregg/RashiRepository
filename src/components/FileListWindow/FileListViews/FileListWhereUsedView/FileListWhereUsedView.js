import React from 'react';
import FileList from '../../../MainWindowLists/FileList/FileList';
import WhereUsedContainer from '../../../../containers/WhereUsedContainer';

import './FileListWhereUsedView.css';

const FileListWhereUsedView = ({
    entList,
    entListWindowMode,
    compareSelectedPgm,
    showWhereUsedFile,
    displaySelectedEnt,
}) => {

return (
  <div className="EntListWhereUsedWindowContainer">
  <div className="PgmListChartWindow">
  <div key={"A"} className="EntityListHeader" >Files</div>
    <FileList showWhereUsedFile={showWhereUsedFile}
    displaySelectedEnt={displaySelectedEnt} 
    compareSelectedPgm={compareSelectedPgm} 
    maxDiagScreenId={0} 
    maxSourceScreenId={1} 
    screenId={1}
     entList={entList} 
     entListWindowMode={entListWindowMode} >
     </FileList>
  </div>
    <div className="MainFileWhereUsedView">
      <WhereUsedContainer screenId={1}></WhereUsedContainer>
  </div>
</div>
  );
}

export default FileListWhereUsedView;

