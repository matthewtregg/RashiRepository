import React from 'react';
import './WhereUsedSource.css';

export const WhereUsedSource = ({ whereUsed }) => {

const whereUsedView =  whereUsed.map((src, index) => 
{
return <div className="WhereUsedSourceLine" key={index} onMouseEnter={() =>console.log('hello world')} onMouseLeave={()=>console.log('hello world')}>
          <div className="WhereUsedSourcePgmId">
              <p>{src.PGMID}</p>
          </div>
          <div className="WhereUsedSourceLineNum">
            <p>{src.LINENUM}</p>
          </div>
          <div className="WhereUsedSourceCode">
            <pre><span className="WhereUsedSourceItem">{src.STN}</span></pre>
          </div>
</div>; 
})


return(
  <div className="WhereUsedSourceContainer">
  <div className="WhereUsedSourceHeaders">
  <div className="PgmIdSourceHeader">
    <p>Pgm</p>
  </div>
  <div className="WhereUsedSourceLineNumberHeader">
    <p>Seq No</p>
  </div>
  <div className="WhereUsedSourceCodeHeader">
    <p>Where Used Source</p>
  </div>
  </div>
    <div className="WhereUsedSourceBrowser">
    {whereUsedView}
    </div>
  </div>  
)

}