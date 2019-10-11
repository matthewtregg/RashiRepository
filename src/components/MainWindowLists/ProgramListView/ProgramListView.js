import React from 'react';
import './ProgramListView.css';

function PgmListView({pgmList}) {
    
const ObjectListToDispl = pgmList.map((Obj,index)=>{
  return <div key={index} className="PgmListViewItem">{Obj.PGMID.trim() }</div> 
})


return (
  //Header
  <div className="PgmListViewItems" >
    {ObjectListToDispl} 
  </div> 
)

} 

export default PgmListView;