export const setNextDFDChart = (DFDChartPgms, DFDChartPgm, screenId) => {
  if (DFDChartPgms.length > 0) {
  const currentDFDChartPgm = DFDChartPgms.filter((item)=> item.screenId === screenId)
  if (currentDFDChartPgm.length > 0 ){
    return DFDChartPgms.map((item)=> {
      if (item.screenId === screenId) item.DFDChartPgm = DFDChartPgm;
      return item;
    })
    }
  } 
  return [...DFDChartPgms, {screenId:screenId, DFDChartPgm:DFDChartPgm }]

}