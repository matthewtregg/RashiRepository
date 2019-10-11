export const setNextChartLinkedPgm = ( chartLinkedPgms, chartLinkedPgm, screenId) => {
  if (chartLinkedPgms.length > 0) {
  const currentChartLinkedPgm = chartLinkedPgms.filter((item)=> item.screenId === screenId)
  if (currentChartLinkedPgm.length > 0 ){
    return chartLinkedPgms.map((item)=> {
      if (item.screenId === screenId) item.chartLinkedPgm = chartLinkedPgm;
      return item;
    })
    }
  } 
  return [...chartLinkedPgms, {screenId:screenId, chartLinkedPgm:chartLinkedPgm }]

}