
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPgmWhereUsedData : (pgm, screenId) => dispatch(getPgmWhereUsedData(pgm, screenId)),
    getFileWhereUsedData: (ent, screenId) => dispatch(getFileWhereUsedData(ent, screenId)),
    getFieldWhereUsedData: (field, screenId) => dispatch(getFieldWhereUsedData(field, screenId)),
    getVarWhereUsedData: (variable, screenId) => dispatch(getVarWhereUsedData(variable, screenId)),
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
    whereUsed
}) => {



// pgm variable
const setPgmWhereUsed = (pgm, screenId) => {
  getPgmWhereUsedData(pgm, screenId);
}
// regex variable
const setVarWhereUsed = (variable, screenId) => {
  getVarWhereUsedData(variable,screenId)
}

// file variable
const setFileWhereUsed = (ent, screenId) => {
  getFileWhereUsedData(ent, screenId)
}

// field variable
const setFieldWhereUsed = (field, screenId) => {
  getFieldWhereUsedData(field, screenId)
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

