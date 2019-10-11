import React from 'react';
import ProgramList from '../../../MainWindowLists/ProgramList/ProgramList';

import './PgmListView.css';

const PgmListView = ({
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

  <div className="PgmListWindowContainer">
  <div  key={"A"} className="PgmListHeader">
    <div className="PgmHeader"> Pgm </div>
    <div className="PgmTxtHeader"> Text </div>
    <div className="PgmTypHeader"> Type </div>
    <div className="DirHeader"> Directory </div>
</div>
  <div className = "PgmListWindow">
    <ProgramList showWhereUsedPgm={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} maxDiagScreenId={0} maxSourceScreenId={0} screenId={1} pgmList={pgmList} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm} pgmListWindowMode={pgmListWindowMode} ></ProgramList>
  </div></div>
  );
}

export default PgmListView;