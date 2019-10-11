export const setNextChartLinkedEnt = ( chartLinkedEnts, chartLinkedEnt, screenId) => {
  if (chartLinkedEnts.length > 0) {
  const currentChartLinkedEnt = chartLinkedEnts.filter((item)=> item.screenId === screenId)
  if (currentChartLinkedEnt.length > 0 ){
    return chartLinkedEnt.map((item)=> {
      if (item.screenId === screenId) item.chartLinkedEnt = chartLinkedEnt;
      return item;
    })
    }
  } 
  return [...chartLinkedEnt, {screenId:screenId, chartLinkedEnt:chartLinkedEnt }]

}