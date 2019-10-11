import React from 'react';
import ProgramList from '../../../MainWindowLists/ProgramList/ProgramList';
import PgmStrChartContainer from '../../../../containers/PgmStrChartContainer'; 
import SourceBrowserContainer from '../../../../containers/SourceBrowserContainer';
import './PgmListSrcStrView.css';

const PgmListSrcStrView = ({
  goToSourceView,
  displaySelectedPgm,
  pgmList,
  pgmListWindowMode,
  compareSelectedPgm,
  compareSource,
  subMode,
  showDFDDiagram,
  showWhereUsedPgm 
}) => {


return (
  <div className="PgmListChartWindowContainer">
  <div className="PgmListChartWindow">
  <div key={"A"} className="ProgramListHeader" > Programs</div>
    <ProgramList showWhereUsedPgm ={showWhereUsedPgm} 
    showDFDDiagram={showDFDDiagram}
     compareSource={compareSource} 
     compareSelectedPgm={compareSelectedPgm}
     maxDiagScreenId={1} 
     maxSourceScreenId={1} 
     screenId={1} 
     pgmList={pgmList} 
     goToSourceView={goToSourceView} 
     displaySelectedPgm={displaySelectedPgm} 
     pgmListWindowMode={pgmListWindowMode} ></ProgramList>
  </div>
    <div className="PgmStrChartSourceView">
   <SourceBrowserContainer sourceId={1} screenId={1}></SourceBrowserContainer>
  </div>
  <div className ="PgmChartContainerSource">
    <PgmStrChartContainer pgmListWindowMode={subMode} pgmStrChartId={1} screenId={1} />
    </div>
</div>

  );
}

export default PgmListSrcStrView;