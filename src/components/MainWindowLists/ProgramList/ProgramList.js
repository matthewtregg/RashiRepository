import React from 'react';
import './ProgramList.css';
import CustomContextContainer from '../../../containers/CustomContextContainer';



function PgmList({
  pgmList,
  goToSourceView,
  pgmListWindowMode,
  compareSelectedPgm,
  compareSource,
  displaySelectedPgm,
  screenId,
  maxDiagScreenId,
  maxSourceScreenId,
  showDFDDiagram,
  showWhereUsedPgm
}) {


const ObjectListToDispl = pgmList.map((Obj, index)=>{
  return <div key={index} className="ContextListItem">
   {Obj.PGMID.trim()}
  </div>
})

const PgmListToDispl = pgmList.map((Obj, index)=>{
  return <div className="PgmListItem">
  <div className="Pgm"> 
    <div className="ContextListItem">
    {Obj.PGMID.trim()}
    </div>
  </div>
  <div className="PgmTxt">{Obj.PGMTX.trim()}</div>
  <div className="PgmTyp">{Obj.PGMTYP.trim()}</div>
  <div className="DirNm">{Obj.DIRNM.trim()}</div>
  </div>;  
})


const PgmListToDisplWithHeaders = pgmList.length > 0 ?
<div>
<div className="PgmListCore">
  {PgmListToDispl}
</div>
</div>
: <div>loading</div>;



const getMenuOptions = (maxDiagScreenId,maxSourceScreenId) => {
const pgmStrChart = (pgm,screenId) => {displaySelectedPgm(pgm, screenId)};
const dfdCallback = (pgm,screenId) => {showDFDDiagram(pgm,screenId)};
const whereUsed = (pgm,screenId) => {showWhereUsedPgm(pgm,screenId)};
const sourceView = (pgm, screenId) => {goToSourceView(pgm,screenId)};
const comparePgmStrChart = (pgm,screenId) => {compareSelectedPgm(pgm,screenId)};
const sourceCompare = (pgm,screenId) => {compareSource(pgm,screenId)}


  if (maxDiagScreenId === 1 && maxSourceScreenId === 0)  {
        
    return [
      {"id": 1,"label": "Program Structure Chart", "callback": pgmStrChart,"loaded":false, "hover":false},
      {"id":4,"label": "Data Flow Diagram", "callback": dfdCallback , "loaded":false, "hover":false},
      {"id":5, "label": "Pgm WhereUsed", "callback": whereUsed, "loaded":false, "hover":false },
      {"id":6, "label": "SourceView", "callback": sourceView, "loaded":false, "hover":false },
      {"id":7, "label": "Compare Pgm Str Chart", "callback": comparePgmStrChart, "loaded":false, "hover":false }
    ]  

  }

  if (maxDiagScreenId === 0 && maxSourceScreenId === 1)  {
    
    return [
      {"id": 1,"label": "Program Structure Chart", "callback": pgmStrChart,"loaded":false, "hover":false},
      {"id":4,"label": "Data Flow Diagram", "callback": dfdCallback , "loaded":false, "hover":false},
      {"id":5, "label": "Pgm WhereUsed", "callback": whereUsed, "loaded":false, "hover":false },
      {"id":6, "label": "SourceView", "callback": sourceView, "loaded":false, "hover":false },
      {"id":7, "label": "Compare Source", "callback": sourceCompare, "loaded":false, "hover":false }

    ]  

  }

  return [
    {"id": 1,"label": "Program Structure Chart", "callback": pgmStrChart,"loaded":false, "hover":false},
    {"id":4,"label": "Data Flow Diagram", "callback": dfdCallback , "loaded":false, "hover":false},
    {"id":5, "label": "Pgm WhereUsed", "callback": whereUsed, "loaded":false, "hover":false },
    {"id":6, "label": "SourceView", "callback": sourceView, "loaded":false, "hover":false }
  ]  
}


const menu = getMenuOptions(maxDiagScreenId,maxSourceScreenId)


  const getProgramList = (pgmListWindowMode) => {
  switch (pgmListWindowMode) {
      case "List":
      return<div className="List" >
      <CustomContextContainer contextId={1} contextClass="ContextListItem" menu={menu} screenId={screenId}   List={PgmListToDisplWithHeaders}/>
   </div>; 
    
      default:
      return <div className="ProgramList" >
      <CustomContextContainer contextId={1}  contextClass="ContextListItem" menu={menu} screenId={screenId}   List={ObjectListToDispl}/>
    </div>; 
    }
  }

  const ProgList = getProgramList(pgmListWindowMode)




return (
  //Header
  <>
   {ProgList}
 </>
) 

} 

export default PgmList;