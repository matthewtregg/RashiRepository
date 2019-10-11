
import {setNextZoomLevel,setNextCentre, setNextLoadedStatus, setNext} from './diagramUtils';
import { setNextChartLinkedPgm } from './pgmListUtils';
//STATE TRUE ACROSS ALL DIAGRAMS

const initialState = {
  nextDiagrams:[],
  chartCentres:[],
  zoomLevels:[],
  loadedCharts: [],
  chartLinkedPgm:''
}

const diagrams = (state = initialState, action) => {
  switch (action.type) { 
  case 'SET_INITIAL_ZOOM':
    return {
      ...state,
      zoomLevels:setNextZoomLevel(state.zoomLevels, 0.25, action.screenId ) 
  };
  case 'SET_CHART_LINKED_PGM':
  return {
   ...state,
   chartLinkedPgm: action.chartLinkedPgm
  }
  

  case 'SET_INITIAL_CENTRE':
   return {
    ...state,
    chartCentres: setNextCentre(state.chartCentres, action.centre, action.screenId)
   }

  case 'SET_INITIAL_LOADED_STATUS':
  return {
    ...state,
    loadedCharts: setNextLoadedStatus(state.loadedCharts, action.loaded, action.screenId ) 
   }
  
    case 'SET_NEXT_DIAGRAM':
    return {
      ...state,
      nextDiagrams: setNext(state.nextDiagrams,action.nextDiagram, action.screenId)
    }
    case 'CENTRE':
    return {
      ...state,
      chartCentres : state.chartCentres.map((centre) => {
        if (centre.screenId === action.screenId) centre.centre = action.centre
        return centre;
      })
    } ;
    case 'ZOOM_IN':
      return {
        ...state,
        zoomLevels:state.zoomLevels.map((zoomLevel) => {
          if (zoomLevel.screenId === action.screenId) zoomLevel.zoomLevel = zoomLevel.zoomLevel*1.5
          return zoomLevel;
        })
      };
    case 'ZOOM_OUT':
      return {
        ...state,
        zoomLevels:state.zoomLevels.map((zoomLevel) => {
          if (zoomLevel.screenId === action.screenId) zoomLevel.zoomLevel = zoomLevel.zoomLevel/1.5
          return zoomLevel;
        })
      };

    case 'LOADED': 
      return {
        ...state, 
       loadedCharts:state.loadedCharts.map((loadedChart) => {
          if (loadedChart.screenId === action.screenId) loadedChart.loaded = !loadedChart.loaded;
          return loadedChart;
        })
    };

    default:
      return state;
  }

}  

export default diagrams;