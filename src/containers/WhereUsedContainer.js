
import React, {useEffect} from 'react';
import {WhereUsed} from '../components/WhereUsed/WhereUsed';
import {connect} from 'react-redux';
import { setWhereUsedType, getPgmWhereUsedData, getFileWhereUsedData, getFieldWhereUsedData, getVarWhereUsedData} from '../Redux/actions/WhereUsed';


const mapStateToProps = (state) => { 
  return {
    whereUsedList: state.whereUsed.whereUsedList, 
    whereUsedType: state.whereUsed.whereUsedType,
    whereUsed: state.whereUsed.whereUsed,
    chartLinkedPgms: state.diagrams.chartLinkedPgms,
    repoName: state.mainWindow.repoName,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPgmWhereUsedData : (pgm, screenId, repo) => dispatch(getPgmWhereUsedData(pgm, screenId, repo)),
    getFileWhereUsedData: (ent, screenId, repo) => dispatch(getFileWhereUsedData(ent, screenId, repo)),
    getFieldWhereUsedData: (field, screenId,repo) => dispatch(getFieldWhereUsedData(field, screenId, repo)),
    getVarWhereUsedData: (variable, screenId, repo) => dispatch(getVarWhereUsedData(variable, screenId, repo)),
    setWhereUsedType: (type) => dispatch(setWhereUsedType(type))
  }
}

export const WhereUsedContainer = ({
    whereUsedList,
    whereUsedType,
    getPgmWhereUsedData,
    getFieldWhereUsedData,
    getFileWhereUsedData,
    getVarWhereUsedData,
    setWhereUsedType,
    screenId,
    whereUsed,
    repoName
}) => {



// pgm variable
const setPgmWhereUsed = (pgm, screenId) => {
  console.log(repoName);
  getPgmWhereUsedData(pgm, screenId,repoName);
}
// regex variable
const setVarWhereUsed = (variable, screenId) => {
  console.log(repoName);
  getVarWhereUsedData(variable,screenId, repoName);
}

// file variable
const setFileWhereUsed = (ent, screenId) => {
  console.log(repoName);
  getFileWhereUsedData(ent, screenId, repoName);
}

// field variable
const setFieldWhereUsed = (field, screenId) => {
  console.log(repoName);
  getFieldWhereUsedData(field, screenId, repoName)
}

const whereUsedInfo =  whereUsedList.length > 0 ? whereUsedList.filter((whereUsed) => whereUsed.screenId === screenId)[0].whereUsed: null;

return (
    <WhereUsed
    whereUsed={whereUsed}

    whereUsedType={whereUsedType}
    
    whereUsedInfo={whereUsedInfo}

    setPgmWhereUsed = {setPgmWhereUsed}

    setSourceWhereUsed = {setVarWhereUsed}

    setFileWhereUsed = {setFileWhereUsed}

    setFieldWhereUsed= {setFieldWhereUsed}
    ></WhereUsed>
)



}

export default connect(mapStateToProps,mapDispatchToProps)(WhereUsedContainer);

