import React from 'react';
import ProgramList from '../../../MainWindowLists/ProgramList/ProgramList';
import PgmStrChartContainer from '../../../../containers/PgmStrChartContainer'; 
import './PgmListStrChartView.css';

const PgmListStrChartView = ({
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
  <div className = "PgmListChartWindowContainer">
    <div className="PgmListChartWindow">
    <div key={"A"} className="ProgramListChartHeader" >Programs</div>
      <ProgramList showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} maxDiagScreenId={1} maxSourceScreenId={0} screenId={1} pgmList={pgmList} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm} pgmListWindowMode={pgmListWindowMode} ></ProgramList>
    </div>
      <PgmStrChartContainer pgmStrChartId={1} showDFDDiagram={showDFDDiagram} pgmListWindowMode={pgmListWindowMode} screenId={1} />
    </div>
  );
}

export default PgmListStrChartView;