import {setNextDiagData,setNextStrChartMode,setNextZoomLevel, setNextCentre, setNextLoadedStatus, setHighlightPgms } from './pgmStrChartUtils'

const initialState = {
  HighlightedPgms: [],
  modes: [],
  diagData: [],
  chartLinkedPgms: [],
}

const PgmStrChart = (state = initialState, action) => {

  switch (action.type) {

    case 'HIGHLIGHT_PGM':
     return {
       ...state,
       HighlightedPgms: setHighlightPgms(state.HighlightedPgms, action.HighlightedPgm, action.screenId ) 
    }

    case 'SET_PGM_STR_MODE': 
      return {
        ...state,
        modes:setNextStrChartMode(state.modes, action.mode, action.screenId)
      }    
    case 'SET_STR_DIAGRAM_DATA':
    return {
      ...state,
      diagData:setNextDiagData(state.diagData, action.payload, action.screenId)
    } 
   
    default:
      return state;
  }

 
}  

export default PgmStrChart;



