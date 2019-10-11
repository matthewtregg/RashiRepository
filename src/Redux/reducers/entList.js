import { setNextChartLinkedEnt } from "./entListUtils";

const initialState = {
  entList:[],
  entListWindowMode : 'List',
  currentEnt: '',
  chartLinkedEnts: [],
  entListLoading: 'NotLoaded'
}

// ENTITY LIST STATE

const entList = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ENTLIST_WINDOW_MODE":
    return {
      ...state,
      entListWindowMode : action.entListWindowMode 
    }
    case "GET_ENT_LIST_PENDING":
    return {
        ...state,
        entListLoading:'Loading',
    }
    case "SET_ENT_LIST":
    return {
      ...state,
      entList: action.payload,
      entListLoading: 'Loaded'
    }
    // what does current pghm
    case "SET_CURRENT_ENT":
    return {
      ...state,
      currentEnt: action.currentEnt
    }
    // for where used
    default:
      return state; 
  }

}  

export default entList;