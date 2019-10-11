import React from 'react';
import './VarWhereUsed.css';
import whereUsed from '../../../Redux/reducers/whereUsed';

export const VarWhereUsed = ({ 
  whereUsedData, 
  setPgmWhereUsed, 
  setVarWhereUsed,
  setFieldWhereUsed,
  setFileWhereUsed
}) => {

const whereUsedView =  whereUsedData.map((src, index) => 
{
return <div className="WhereUsedLine" key={index} onMouseEnter={() =>console.log('hello world')} onMouseLeave={()=>console.log('hello world')}>
          <div className="WhereUsedPgmId">
              <p>{src.PGMID}</p>
          </div>
          <div className="WhereUsedLineNum">
            <p>{src.LINENUM}</p>
          </div>
          <div className="WhereUsedSourceCode">
            <pre><span className="WhereUsedSourceItem">{src.STN}</span></pre>
          </div>
</div>;  
})


return(
  <div className="WhereUsedContainer">
  <div className="WhereUsedHeaders">
  <div className="PgmIdHeader">
    <p>Pgm</p>
  </div>
  <div className="WhereUsedLineNumberHeader">
    <p>Seq No</p>
  </div>
  <div className="WhereUsedSourceCodeHeader">
    <p>Where Used Source</p>
  </div>
  </div>
    <div className="WhereUsedBrowser">
    {whereUsedView}
    </div>
  </div>
)

}