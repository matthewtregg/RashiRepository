import React from 'react';
import './PgmListWindow.css';
import PgmListView from './PgmListWindowViews/PgmListView/PgmListView';
import PgmListStrChartView from './PgmListWindowViews/PgmListStrChartView/PgmListStrChartView';
import PgmListTwoStrChartsView from './PgmListWindowViews/PgmListTwoStrChartsView/PgmListTwoStrChartsView';
import PgmListTwoSrcView from './PgmListWindowViews/PgmListTwoSrcView/PgmListTwoSrcView';
import PgmListSrcView from './PgmListWindowViews/PgmListSrcView/PgmListSrcView';
import PgmListSrcWhereUsedView from './PgmListWindowViews/PgmListSrcWhereUsedView/PgmListSrcWhereUsedView';
import PgmListSrcStrChrtWhrUsed from './PgmListWindowViews/PgmListSrcStrChrtWhrUsed/PgmListSrcStrChrtWhrUsed';
import PgmListSrcStrView from './PgmListWindowViews/PgmListSrcStrView/PgmListSrcStrView';
import PgmListDFDView from './PgmListWindowViews/PgmListDFDView/PgmListDFDView';
import PgmListWhereUsedView from './PgmListWindowViews/PgmListWhereUsedView/PgmListWhereUsedView';


function PgmListWindow({
    // go to the source browser view
    goToSourceView,
    displaySelectedPgm,
    pgmList,
    pgmListWindowMode,
    setChartLinkedPgm,
    compareSelectedPgm,
    compareSource,
    showDFDDiagram,
    showWhereUsedPgm
}) {

// chart linked pgms for source browsing 

const getPgmListWindowToDispl = (subMode) => {
  if (subMode ==="List") {
    return  pgmList.length > 0 ?
    <PgmListView   showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} 
    compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} 
    pgmListWindowMode={pgmListWindowMode} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm} pgmList={pgmList}></PgmListView>: <div>loading</div>;  
  } 

  else if (subMode ==="ListAndWhereUsed") {
    return pgmList.length > 0 ?
    <PgmListWhereUsedView showWhereUsedPgm={showWhereUsedPgm} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} pgmListWindowMode={pgmListWindowMode} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm} showDFDDiagram={showDFDDiagram} pgmList={pgmList} ></PgmListWhereUsedView>:<div>loading</div>
  } 

  else if (subMode ==="ListAndDFDSrc") {
    return pgmList.length > 0 ?
    <PgmListDFDView showWhereUsedPgm ={showWhereUsedPgm} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} pgmListWindowMode={pgmListWindowMode} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm} showDFDDiagram={showDFDDiagram} pgmList={pgmList}></PgmListDFDView>:<div>loading</div>
  }

  else if (subMode ==="ListAndDFD") {
    return pgmList.length > 0 ?
    <PgmListDFDView showWhereUsedPgm ={showWhereUsedPgm} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} pgmListWindowMode={pgmListWindowMode} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm} showDFDDiagram={showDFDDiagram} pgmList={pgmList}></PgmListDFDView>:<div>loading</div>
  }
  
  else if (subMode === "ListAndPgmStrChart") {
    return pgmList.length > 0 ?
    <PgmListStrChartView showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} setChartLinkedPgm={setChartLinkedPgm} pgmListWindowMode={pgmListWindowMode} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm} pgmList={pgmList}></PgmListStrChartView>
    : <div>loading</div>;
  }
  else if (subMode === "ListAnd2PgmStrCharts") {
    return pgmList.length > 0 ?
    <PgmListTwoStrChartsView showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} subMode={subMode}  compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} setChartLinkedPgm={setChartLinkedPgm} pgmListWindowMode={pgmListWindowMode} pgmList={pgmList} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm}></PgmListTwoStrChartsView>
    : <div>loading</div>;
  }

  else if (subMode ==="ListAndSourceCode") {
    return pgmList.length > 0 ?
    <PgmListSrcView showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} subMode={subMode} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} setChartLinkedPgm={setChartLinkedPgm} pgmListWindowMode={pgmListWindowMode} pgmList={pgmList} displaySelectedPgm={displaySelectedPgm} goToSourceView={goToSourceView}></PgmListSrcView>
  : <div>loading</div>;
  }

  else if (subMode ==="ListAnd2SourceCode") {
    return pgmList.length > 0 ?
    <PgmListTwoSrcView showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} pgmListWindowMode={pgmListWindowMode} pgmList={pgmList} displaySelectedPgm={displaySelectedPgm} goToSourceView={goToSourceView}></PgmListTwoSrcView>
  : <div>loading</div>;
  }

  else if (subMode==="ListSourceCodeAndPgmStrChart"){
    return pgmList.length > 0 ?
    <PgmListSrcStrView showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} subMode={subMode} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} setChartLinkedPgm={setChartLinkedPgm} pgmListWindowMode={pgmListWindowMode} pgmList={pgmList} goToSourceView={goToSourceView} displaySelectedPgm={displaySelectedPgm}></PgmListSrcStrView>
  : <div>loading</div>;
  }
  // add in whereUsed  
  else if (subMode==="ListSourceCodeAndWhereUsed"){
    return pgmList.length > 0 ?
    <PgmListSrcWhereUsedView showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} pgmListWindowMode={pgmListWindowMode} pgmList={pgmList} displaySelectedPgm={displaySelectedPgm} goToSourceView={goToSourceView}></PgmListSrcWhereUsedView>
  : <div>loading</div>;
  }

  else if (subMode==="ListSourceCodeWhereUsedAndPgmStrChart"){
    return pgmList.length > 0 ?
    <PgmListSrcStrChrtWhrUsed showWhereUsedPgm ={showWhereUsedPgm} showDFDDiagram={showDFDDiagram} subMode={subMode} compareSource={compareSource} compareSelectedPgm={compareSelectedPgm} setChartLinkedPgm={setChartLinkedPgm} pgmListWindowMode={pgmListWindowMode} pgmList={pgmList} displaySelectedPgm={displaySelectedPgm} goToSourceView={goToSourceView}></PgmListSrcStrChrtWhrUsed>
  : <div>loading</div>;
  }
}
// mode is different
const ObjectListToDispl = getPgmListWindowToDispl(pgmListWindowMode);

return (
  <>
       {ObjectListToDispl}  
  </>   
)

} 

export default PgmListWindow;