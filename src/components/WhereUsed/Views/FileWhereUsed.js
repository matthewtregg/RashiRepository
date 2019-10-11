import React from 'react';
import './FileWhereUsed.css';
import CustomContextContainer from '../../../containers/CustomContextContainer';


export const FileWhereUsed = ({ 
  whereUsedData, 
  setPgmWhereUsed, 
  whereUsed,
  screenId,
}) => {

// PgmWhereUsed
const getCldPgm= (src, index) => {
  return <div className="WhereUsedPgmSourceLine" key={index} onMouseEnter={() => {}} onMouseLeave={()=>{}}>
          <div className="WhereUsedPgmSourceName">
             <p><span className="WhereUsedPgm" >{src.CLDPGM}</span></p>
          </div>
          <div className="WhereUsedPgmSourceText">
            <p>{src.PGMTX}</p>
          </div>
          <div className="WhereUsedPgmSourceType">
           <p>{src.PGMTYP.trim()}</p>
          </div>
</div>;  
}

const getCallingPgm= (src, index) => {
  return <div className="WhereUsedPgmSourceLine" key={index} onMouseEnter={() =>{}} onMouseLeave={()=>{}}>
        
          <div className="WhereUsedPgmSourceName">
          <p><span className="WhereUsedPgm" >{src.PGMID}</span></p>
          </div>
          <div className="WhereUsedPgmSourceText">
            <p>{src.PGMTX}</p>
          </div>
          <div className="WhereUsedPgmSourceType">
            <p>{src.PGMTYP.trim()}</p>
          </div>
</div>;  
}


const whereUsedView = whereUsedData ? whereUsedData.map((src, index) => 
{
  
  if (src.PGMID.trim() === whereUsed.trim()) return getCldPgm(src, index)
  else return getCallingPgm(src,index)


}): null;

const WhereUsedCallback = (variable) => {
 console.log("source browser")
  
};

const GlobalUsedCallback = (pgm) => {
  console.log(`placeholder for global where used`)};


const menu = [
  {"id":1,"label": "Pgm Where Used", "callback": WhereUsedCallback, "loaded":false, "hover":false},
  {"id":2, "label": "Global Where Used", "callback": GlobalUsedCallback, "loaded":false, "hover":false },
]  


// wrap inside custom context
return(
  <div className="WhereUsedPgmSourceContainer">
  <div className="WhereUsedPgmSourceHeaders">
  <div className="PgmIdPgmSourceHeader">
    <p>Pgm</p>
  </div>
  <div className="WhereUsedPgmSourceTextHeader">
    <p>Pgm Text</p>
  </div>
  <div className="WhereUsedPgmSourceCodeHeader">
    <p>Pgm Type</p>
  </div>
  </div>
    <div className="WhereUsedPgmSourceBrowser">
    <CustomContextContainer contextId={2} menu={menu} screenId={screenId} contextClass={"WhereUsedPgm"}  List={whereUsedView}>
     </CustomContextContainer>
    </div>
  </div>
  
  
)



}