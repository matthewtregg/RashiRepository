import React from 'react';
import ProgramList from '../../../MainWindowLists/ProgramList/ProgramList';
import DFDChartContainer from '../../../../containers/DFDChartContainer';
import './PgmListDFDView.css';


const PgmListDFDView = ({
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
    <div key={"A"} className="ProgramListChartHeader" > Programs</div>
    <ProgramList showWhereUsedPgm ={showWhereUsedPgm} 
    showDFDDiagram={showDFDDiagram} 
    compareSource={compareSource} 
    compareSelectedPgm={compareSelectedPgm} 
    maxDiagScreenId={0} 
    maxSourceScreenId={0} 
    pgmList={pgmList} 
    goToSourceView={goToSourceView} 
    displaySelectedPgm={displaySelectedPgm} 
    pgmListWindowMode={pgmListWindowMode} ></ProgramList>
  </div>
    <DFDChartContainer 
    screenId={1}
    DFDId = {1}
    displaySelectedPgm={displaySelectedPgm} 
    />
  </div>
  );
}

export default PgmListDFDView;