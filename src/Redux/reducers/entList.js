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
  
    case "SET_CHART_ARRAY":
    return {
      ...state,
      entList: action.entList,
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