import React from 'react';
import './WhereUsed.css';
import {PgmWhereUsed} from './Views/PgmWhereUsed';
import {FileWhereUsed} from './Views/FileWhereUsed';
import {FieldWhereUsed} from './Views/FieldWhereUsed';
import {VarWhereUsed} from './Views/VarWhereUsed';


// Split up PgmStrChart Window

export const WhereUsed = ({ 
  whereUsedType, 
  whereUsedInfo,
  setPgmWhereUsed,
  setVarWhereUsed,
  setFileWhereUsed,
  setFieldWhereUsed,
  whereUsed  
}) => { 

const createPgmWhereUsed = (whereUsed,whereUsedData, setPgmWhereUsed, setVarWhereUsed, setFileWhereUsed, setFieldWhereUsed) => {
  return <PgmWhereUsed 
    whereUsedData = {whereUsedData}
    setPgmWhereUsed = {setPgmWhereUsed}
    setVarWhereUsed = {setVarWhereUsed}
    setFileWhereUsed = {setFileWhereUsed}
    setFieldWhereUsed = {setFieldWhereUsed}
    whereUsed = {whereUsed}
  > 
  </PgmWhereUsed>
  }
  
  const createFileWhereUsed = (whereUsed,whereUsedData, setPgmWhereUsed, setVarWhereUsed, setFileWhereUsed, setFieldWhereUsed) => {
  return <FileWhereUsed
    whereUsedData = {whereUsedData}
    setPgmWhereUsed = {setPgmWhereUsed}
    setVarWhereUsed = {setVarWhereUsed}
    setFileWhereUsed = {setFileWhereUsed}
    setFieldWhereUsed = {setFieldWhereUsed}
    whereUsed = {whereUsed}
  >   
  </FileWhereUsed>
  }
  
  const createFieldWhereUsed = (whereUsed,whereUsedData, setPgmWhereUsed, setVarWhereUsed, setFileWhereUsed, setFieldWhereUsed) => {
  return <FieldWhereUsed 
    whereUsedData = {whereUsedData}
    setPgmWhereUsed = {setPgmWhereUsed}
    setVarWhereUsed = {setVarWhereUsed}
    setFileWhereUsed = {setFileWhereUsed}
    setFieldWhereUsed = {setFieldWhereUsed}
    whereUsed = {whereUsed}
  > 
  </FieldWhereUsed>
  }
  
  const createVarWhereUsed = (whereUsed,whereUsedData, setPgmWhereUsed, setVarWhereUsed, setFileWhereUsed, setFieldWhereUsed) => {
  return <VarWhereUsed
    whereUsedData = {whereUsedData}
    setPgmWhereUsed = {setPgmWhereUsed}
    setVarWhereUsed = {setVarWhereUsed}
    setFileWhereUsed = {setFileWhereUsed}
    setFieldWhereUsed = {setFieldWhereUsed}
    whereUsed = {whereUsed}
  > </VarWhereUsed>
  }
  
  
  
  let whereUsedView = <div></div>; 
   if ( whereUsedType==='Pgm') {
      whereUsedView  = createPgmWhereUsed(whereUsed,whereUsedInfo, setPgmWhereUsed, setVarWhereUsed, setFileWhereUsed, setFieldWhereUsed)
    }
    else if (whereUsedType ==='File' ) {
      whereUsedView = createFileWhereUsed(whereUsed,whereUsedInfo, setPgmWhereUsed, setVarWhereUsed, setFileWhereUsed, setFieldWhereUsed);
    } 
    else if (whereUsedType ==='Field') {
      whereUsedView = createFieldWhereUsed(whereUsed,whereUsedInfo, setPgmWhereUsed, setVarWhereUsed, setFileWhereUsed, setFieldWhereUsed);
    } 
    else if (whereUsedType ==='Variable' ) {
      whereUsedView = createVarWhereUsed(whereUsed,whereUsedInfo, setPgmWhereUsed, setVarWhereUsed, setFileWhereUsed, setFieldWhereUsed);
    } 

  return whereUsedView
     
 



}

export default WhereUsed;

