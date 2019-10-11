import {remChldRelChartArray,remParRelChartArray,setChldButtonPressed,setParButtonPressed,addToRelChartArray,setNextEntRelData,setNewRelChartArray, setNextZoomLevel,setNextCentre,setNextLoadedStatus} from './entRelUtils';

const initialState = {
  entChartCentres: [],
  entZoomLevels: [],
  entLoadedCharts: [],
  entRelData: [],
  relChartArray: [],
}

const EntRelChart = (state = initialState, action) => {
  switch (action.type) {

    case 'GET_REL_CHART_ARRAY':
      return {
        ...state,
        relChartArray: setNewRelChartArray(state.relChartArray, action.payload, action.screenId)
      }
    
    case 'ADD_PAR_TO_REL_CHART_ARRAY':
      return {
        ...state,
        relChartArray: addToRelChartArray(state.relChartArray, action.payload, action.screenId)
      }  

    case 'ADD_CHLD_TO_REL_CHART_ARRAY':
      return {
        ...state,
        relChartArray: addToRelChartArray(state.relChartArray, action.payload, action.screenId)
      }  
  
    case 'SET_PAR_BUTTON_PRESSED':
      return {
        ...state,
        relChartArray: setParButtonPressed(state.relChartArray, action.ent, action.screenId)
      }

    case 'SET_CHLD_BUTTON_PRESSED':
      return {
        ...state,
        relChartArray: setChldButtonPressed(state.relChartArray, action.ent, action.screenId)
      }
    case 'REM_PAR_REL_CHART_ARRAY':
      return {
        ...state,
        relChartArray: remParRelChartArray(state.relChartArray, action.ent, action.screenId)
      }  

    case 'REM_CHILD_REL_CHART_ARRAY':
      return {
        ...state,
        relChartArray: remChldRelChartArray(state.relChartArray, action.ent, action.screenId)
      }  

    case 'SET_ENT_DIAGRAM_DATA':
      return {
        ...state,
        entRelData: setNextEntRelData(state.entRelData, action.payload, action.screenId)
      }

      default:
        return state;
  }

 
}  

export default EntRelChart;