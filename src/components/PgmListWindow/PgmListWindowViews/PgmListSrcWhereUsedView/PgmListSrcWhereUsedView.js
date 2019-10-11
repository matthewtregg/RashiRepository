import React from 'react';
import ProgramList from '../../../MainWindowLists/ProgramList/ProgramList';
import SourceBrowserContainer from '../../../../containers/SourceBrowserContainer';
import WhereUsedSourceContainer from '../../../../containers/WhereUsedSourceContainer'; 

import './PgmListSrcWhereUsedView.css';

const PgmListSrcWhereUsedView = ({
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
  <div className="PgmListChartWindowContainer">
  <div className="PgmListChartWindow">
  <div key={"A"} className="ProgramListHeader" > Programs</div>
    <ProgramList showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} maxDiagScreenId={0} maxSourceScreenId={1} screenId={1} pgmList={pgmList} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm} pgmListWindowMode={pgmListWindowMode} ></ProgramList>
  </div>
    <div className="PgmStrChartSourceViewWhereUsed">
   <SourceBrowserContainer screenId={1} sourceId={1}></SourceBrowserContainer>
  </div>
  <div className="WhereUsed">
  <WhereUsedSourceContainer>
  </WhereUsedSourceContainer>
  </div>
</div>
  

  );
}

export default PgmListSrcWhereUsedView