import React from 'react';
import './FileListWindow.css';
import FileListView from './FileListViews/FileListView/FileListView';
import FileListWhereUsedView from './FileListViews/FileListWhereUsedView/FileListWhereUsedView';
import FileListEntChartView from './FileListViews/FileListEntChartView/FileListEntChartView';

function FileListWindow({
  entList,
  entListWindowMode,
  showDFDDiagram,
  showWhereUsedFile,
  displayEntRelChart,
}) {





const getFileListWindowToDispl = (subMode) => {
if (subMode ==="List") {
  return  entList.length > 0 ?
  <FileListView   
  showWhereUsedFile ={showWhereUsedFile} 
  showDFDDiagram={showDFDDiagram} 
  entListWindowMode={entListWindowMode} 
  displaySelectedEnt={displayEntRelChart} 
  entList={entList}></FileListView>: <div>loading</div>;  
} 
else if (subMode ==="ListAndEntRelChart") {
  return  entList.length > 0 ?
  <FileListEntChartView   
  showWhereUsedFile ={showWhereUsedFile} 
  showDFDDiagram={showDFDDiagram} 
  entListWindowMode={entListWindowMode} 
  displaySelectedEnt={displayEntRelChart} 
  entList={entList}></FileListEntChartView>: <div>loading</div>;  
} 
else if (subMode ==="ListAndDFDDiagram") {
  return  entList.length > 0 ?
  <FileListEntChartView   
  showWhereUsedFile ={showWhereUsedFile} 
  showDFDDiagram={showDFDDiagram} 
  entListWindowMode={entListWindowMode} 
  displaySelectedEnt={displayEntRelChart} 
  entList={entList}></FileListEntChartView>: <div>loading</div>;  
} 
else if (subMode ==="ListAndWhereUsed") {
  return  entList.length > 0 ?
  <FileListWhereUsedView   
  showWhereUsedFile ={showWhereUsedFile} 
  showDFDDiagram={showDFDDiagram} 
  entListWindowMode={entListWindowMode} 
  displaySelectedEnt={displayEntRelChart} 
  entList={entList}></FileListWhereUsedView>: <div>loading</div>;  
} 



}
// mode is different
const ObjectListToDispl = getFileListWindowToDispl(entListWindowMode);

return (
<>
     {ObjectListToDispl}  
</>   
)

} 

export default FileListWindow;