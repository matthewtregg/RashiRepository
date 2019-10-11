import React from 'react';
import './FileList.css';
import CustomContextContainer from '../../../containers/CustomContextContainer';

function FileList({
  entList,
  entListWindowMode,
  screenId,
  maxDiagScreenId,
  maxSourceScreenId,
  displaySelectedEnt,
  showFileDFDDiagram,
  showWhereUsedFile
}) {

const ObjectListToDispl = entList.map((Obj, index)=>{
  return <div key={index} className="ContextListItem">{Obj.ENTID.trim()}</div>
})

const getMenuOptions = (maxDiagScreenId,maxSourceScreenId) => {
const entRelChart = (ent,screenId) => {displaySelectedEnt(ent, screenId)};
const whereUsedFile = (ent,screenId) => { showWhereUsedFile(ent,screenId)};


  if (maxDiagScreenId === 1 && maxSourceScreenId === 0)  {
        
    return [
      {"id": 1,"label": "Entity Relationship Chart", "callback": entRelChart,"loaded":false, "hover":false},
      {"id":4,"label": "Data Flow Diagram", "callback": showFileDFDDiagram , "loaded":false, "hover":false},
      {"id":5, "label": "File WhereUsed", "callback": whereUsedFile, "loaded":false, "hover":false },
    ]  

  }

  if (maxDiagScreenId === 0 && maxSourceScreenId === 1)  {
    
    return [
      {"id": 1,"label": "Entity Relationship Chart", "callback": entRelChart,"loaded":false, "hover":false},
      {"id":4,"label": "Data Flow Diagram", "callback": showFileDFDDiagram , "loaded":false, "hover":false},
      {"id":5, "label": "File WhereUsed", "callback": whereUsedFile, "loaded":false, "hover":false },
    ]  

  }

  return [
    {"id": 1,"label": "Entity Relationship Chart", "callback": entRelChart,"loaded":false, "hover":false},
    {"id":4,"label": "Data Flow Diagram", "callback": showFileDFDDiagram , "loaded":false, "hover":false},
    {"id":5, "label": "File WhereUsed", "callback": whereUsedFile, "loaded":false, "hover":false },
  ]  
}


const menu = getMenuOptions(maxDiagScreenId,maxSourceScreenId)


  const getFileList = (entListWindowMode) => {
  switch (entListWindowMode) {
      case "List":
      return<div className="List" >
      <CustomContextContainer contextId={1} contextClass="ContextListItem" menu={menu} screenId={screenId}   List={ObjectListToDispl}/>
   </div>; 
      default:
      return <div className="FileList" >
      <CustomContextContainer contextId={1}  contextClass="ContextListItem" menu={menu} screenId={screenId}   List={ObjectListToDispl}/>
    </div>; 
    }
  }

  const FileList = getFileList(entListWindowMode)




return (
  //Header
  <>
   {FileList}
 </>
) 

} 

export default FileList;