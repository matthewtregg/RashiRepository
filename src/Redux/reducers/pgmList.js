import { setNextChartLinkedPgm } from "./pgmListUtils";



const initialState = {
  pgmList:[],
  pgmListWindowMode : 'List',
  currentPgm: '',
  chartLinkedPgms: [],
  pgmListLoading: 'NotLoaded'
}


const pgmList = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PGMLIST_WINDOW_MODE":
    return {
      ...state,
      pgmListWindowMode : action.pgmListWindowMode }
    case "GET_PGM_LIST_PENDING":
    return {
        ...state,
        pgmListLoading:'Loading',
    }
    case "SET_CHART_ARRAY":
    return {
      ...state,
      pgmList: action.pgmList,
      pgmListLoading: 'Loaded'
    }

    // what does current pghm
    case "SET_CURRENT_PGM":
    return {
      ...state,
      currentPgm: action.currentPgm
    }
    // for where used
    case "SET_CHART_LINKED_PGM":
    return {
      ...state,
      chartLinkedPgms: setNextChartLinkedPgm(state.chartLinkedPgms,action.chartLinkedPgm, action.screenId)

    }
    default:
      return state;

    
  }

}  

export default pgmList;