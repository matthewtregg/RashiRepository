
import React from 'react';
import {WhereUsedSource} from '../components/WhereUsed/WhereUsedSource';
import {connect} from 'react-redux';

const mapStateToProps = (state) => { 
  return {
    whereUsedSource: state.pgmSource.whereUsedSource, 
    chartLinkedPgms: state.diagrams.chartLinkedPgms,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   
  }
}


export const WhereUsedSourceContainer = ({
    whereUsedSource
}) => {



 

//
return (
    <WhereUsedSource
    whereUsed={whereUsedSource} 
    ></WhereUsedSource>
)



}

export default connect(mapStateToProps,mapDispatchToProps)(WhereUsedSourceContainer);
