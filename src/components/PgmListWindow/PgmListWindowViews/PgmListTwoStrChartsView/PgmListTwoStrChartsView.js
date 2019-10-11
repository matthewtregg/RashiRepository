import React from 'react';
import ProgramList from '../../../MainWindowLists/ProgramList/ProgramList';
import PgmStrChartContainer from '../../../../containers/PgmStrChartContainer'; 
import './PgmListTwoStrChartsView.css';

const PgmListTwoStrChartViews = ({
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
  <div className = "PgmListChartWindowContainer">
      <div className="PgmListChartWindow">
        <div key={"A"} className="ProgramListChartHeader" > Programs</div>
          <ProgramList showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} maxDiagScreenId={2} maxSourceScreenId={0} screenId={1} pgmList={pgmList} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm} pgmListWindowMode={pgmListWindowMode} ></ProgramList>
        </div>
        <div className ="PgmChartContainerTwoOne">
          <PgmStrChartContainer pgmListWindowMode={subMode} pgmStrChartId={1} screenId={1} />
        </div>
        <div className ="PgmChartContainerTwoTwo">
          <PgmStrChartContainer pgmListWindowMode={subMode} pgmStrChartId={2} screenId={2} />
        </div>
    </div>
  

  );
}

export default PgmListTwoStrChartViews;