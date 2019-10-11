

import React from 'react';
import './SourceBrowser.css';
import moment from 'moment';
import CustomContextContainer from '../../containers/CustomContextContainer';

export const SourceBrowser = ({
    pgmSourceList,
    screenId,
    setPgmListWindowMode,
    setWhereUsed,
    pgmListWindowMode
  }) => {

 //date create and sequence number
 // variable where used is just a filter on the variable
let pgmSource = []
if (pgmSourceList) {
  pgmSource = pgmSourceList.filter(pgmSource => pgmSource.screenId === screenId)
  if (pgmSource.length > 0 ) pgmSource = pgmSource[0].pgmSource;
  else pgmSource = [];
}
const getPgmSourceView = (pgmSource) => {
  return pgmSource.map((line,index) => {
    if(line.MVAR) {
      const newline = line.STN.split(`${line.MVAR}`);
      return <div className="Line"key={index}>
      <p className="LineNum">{line.LINENUM}</p>
      <pre className="SourceCode"><span>{newline[0]}</span> 
      <span className="SourceItem" onClick={()=>{
          }}>{ `${line.MVAR}`}</span>     
      <span>{newline[1]}</span></pre>
      {/* <p className="SourceDate">{moment(line.STNDATE).calendar()}</p> */}
      </div>;
    }
    else {
    return <div className="Line"key={index}>
          <p className="LineNum">{line.LINENUM}</p>
          <pre className="SourceCode"><span>{line.STN}</span></pre>
          {/* <p className="SourceDate">{moment(line.STNDATE).calendar()}</p> */}
        </div>;   
    }    
  })
}

const sourceCodeToDisp = pgmSource ? getPgmSourceView(pgmSource) :null


const WhereUsedCallback = (variable) => {
  setWhereUsed(variable, screenId);
  if (pgmListWindowMode=== "ListSourceCodeAndPgmStrChart") setPgmListWindowMode("ListSourceCodeWhereUsedAndPgmStrChart")
  else setPgmListWindowMode("ListSourceCodeAndWhereUsed")
  
};

const GlobalUsedCallback = (pgm) => {
  console.log(`placeholder for global where used`)};


const menu = [
  {"id":1,"label": "Pgm Where Used", "callback": WhereUsedCallback, "loaded":false, "hover":false},
  {"id":2, "label": "Global Where Used", "callback": GlobalUsedCallback, "loaded":false, "hover":false },
]  


return(
  <div className="WindowContainer"> 
  <div className="SourceBrowserContainer">
    <div className="SourceHeaders">
    <div className="LineNumberHeader">
      <p>Seq No</p>
    </div>
    <div className="SourceCodeHeader">
      <p>Source</p>
    </div>
    </div>
    <div className="SourceBrowser" >
    <CustomContextContainer contextId={2} menu={menu} screenId={screenId} contextClass={"SourceItem"}  List={sourceCodeToDisp}>
     </CustomContextContainer>
    </div>
  </div>
  </div>
)




}