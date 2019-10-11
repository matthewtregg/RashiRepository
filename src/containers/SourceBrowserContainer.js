
import React  from 'react';
import {SourceBrowser} from '../../src/components/SourceBrowser/SourceBrowser';
import {connect} from 'react-redux';
import { changePgmSource, setWhereUsed} from '../Redux/actions/pgmSource';
import {setPgmListWindowMode} from '../Redux/actions/pgmList';
const mapStateToProps = (state) => { 
  return {
    pgmSourceList: state.pgmSource.pgmSourceList, 
    pgmListWindowMode: state.pgmList.pgmListWindowMode,
    chartLinkedPgm: state.diagrams.chartLinkedPgm,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePgmSource: (pgmSource, screenId) => dispatch(changePgmSource(screenId,pgmSource)),
    setWhereUsed: (whereUsed, screenId) => dispatch(setWhereUsed(whereUsed,screenId)),
    setPgmListWindowMode: (pgmListWindowMode) => dispatch(setPgmListWindowMode(pgmListWindowMode)),
  }
}


export const SourceBrowserContainer = ({
    pgmSourceList,
    nextDiagram,
    screenId,
    changePgmSource,
    setWhereUsed,
    setPgmListWindowMode,
    pgmListWindowMode,
    chartLinkedPgm
  }) => {

const sourcePgm = chartLinkedPgm === ''? nextDiagram : chartLinkedPgm; 

return (
    <SourceBrowser 
    pgmSourceList={pgmSourceList} 
    nextDiagram={sourcePgm} 
    screenId={screenId}
    setWhereUsed={setWhereUsed}
    setPgmListWindowMode={setPgmListWindowMode}
    pgmListWindowMode={pgmListWindowMode}
    ></SourceBrowser>
)

}

export default connect(mapStateToProps,mapDispatchToProps)(SourceBrowserContainer);





