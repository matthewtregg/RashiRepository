
import {setNextDFDChart } from './pgmDFDChartUtils'

const initialState = {
  windowMode:'',
  DFDChartData: [],
  DFDFileData:[],
  DFDChartType:'',
}

const pgmDFDChart = (state = initialState, action) => {
  switch (action.type) { 
    case 'SET_DFD_DIAGRAM_DATA':
    return {
      ...state,
      DFDChartData: setNextDFDChart(state.DFDChartData, action.payload, action.screenId),
      DFDChartType:'',
    }
    case 'SET_FILE_DFD_DIAGRAM_DATA':
    return {
      ...state,
      DFDChartData: setNextDFDChart(state.DFDChartData, action.payload, action.screenId),
      DFDChartType:'File',
    }
    case 'SET_DFD_TYPE':
    return {
      ...state,
      DFDChartType:action.DFDChartType,
    }
    default:
      return state;
  }

}  




 

export default pgmDFDChart;