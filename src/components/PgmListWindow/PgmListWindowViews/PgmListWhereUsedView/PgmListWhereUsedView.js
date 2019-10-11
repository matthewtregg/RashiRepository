import React from 'react';
import ProgramList from '../../../MainWindowLists/ProgramList/ProgramList';
import WhereUsedContainer from '../../../../containers/WhereUsedContainer';

import './PgmListWhereUsedView.css';

const PgmListWhereUsedView = ({
    goToSourceView,
    displaySelectedPgm,
    pgmList,
    pgmListWindowMode,
    compareSelectedPgm,
    compareSource,
    showDFDDiagram,
    showWhereUsedPgm
}) => {

return (
  <div className="PgmListWhereUsedWindowContainer">
  <div className="PgmListChartWindow">
  <div key={"A"} className="ProgramListHeader" >Programs</div>
    <ProgramList showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} maxDiagScreenId={0} maxSourceScreenId={1} screenId={1} pgmList={pgmList} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm} pgmListWindowMode={pgmListWindowMode} ></ProgramList>
  </div>
    <div className="MainPgmStrChartWhereUsedView">
      <WhereUsedContainer screenId={1}></WhereUsedContainer>
  </div>
</div>
  );
}

export default PgmListWhereUsedView;