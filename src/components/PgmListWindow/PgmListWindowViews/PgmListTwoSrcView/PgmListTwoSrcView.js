import React from 'react';
import ProgramList from '../../../MainWindowLists/ProgramList/ProgramList';
import SourceBrowserContainer from '../../../../containers/SourceBrowserContainer';
import './PgmListTwoSrcView.css';

const PgmListTwoSrcViews = ({
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
  <div key={"A"} className="ProgramListHeader" >Programs</div>
    <ProgramList showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} maxDiagScreenId={0} maxSourceScreenId={1} screenId={1} pgmList={pgmList} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm} pgmListWindowMode={pgmListWindowMode} ></ProgramList>
  </div>
  <div className="Source1View">
   <SourceBrowserContainer  sourceBrowserId={1} screenId={1} ></SourceBrowserContainer>
  </div>
  <div className="Source2View">
   <SourceBrowserContainer sourceBrowserId={2} screenId={2} ></SourceBrowserContainer>
  </div>
</div>

  );
}

export default PgmListTwoSrcViews;