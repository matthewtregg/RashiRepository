
import {setNext , getSidebar} from './mainWindowUtils'

const initialState = {
  windowMode:'',
  repoList: [],
  navigationHistory: [],
  nextDiagrams:[],
  showSideBar: false,
  chartArray: [],
  repoName: '',
  forceSidebar: false,
  repoLoaded: false,
}

const mainWindow = (state = initialState, action) => {
  switch (action.type) { 
    case "SHOW_SIDEBAR":
    return {
      ...state,
      showSideBar: getSidebar(state.showSideBar, state.forceSidebar)
    }
  
    case "SET_NEW_WINDOW_MODE":
    return {
      ...state,
      windowMode: action.windowMode
    }
    case "GET_REPOSITORY_LIST":
    return {
      ...state,
      repoList: action.payload.map((repo)=> {
        repo.name = repo.LIBRARY_NM;
        repo.expanded = false;
        repo.loading = false;
        return repo;
      })
    }
    case "ADD_CURRENT_CHART":
    return {
      ...state,
      navigationHistory: [...state.navigationHistory, action.currentChart]
    }

    case "EXPAND_REPO_CATEGORY":
    return {
      ...state,
      repoList:  state.repoList.map((repo) => {
        if (repo.name === action.repoToExpand) {
          repo.expanded = true;
        }
        return repo;
      }),
      repoName: action.repoToExpand
     
    }
    case "COLLAPSE_REPO_CATEGORY":
    return {
      ...state,
      repoList:  state.repoList.map((repo) => {
        if (repo.name === action.repoToCollapse) repo.expanded = false;
        return repo;
      }), 
      repoName: ''
  
    }
    case 'SET_NEXT_DIAGRAM':
    return {
      ...state,
      nextDiagrams: setNext(state.nextDiagrams,action.nextDiagram, action.screenId)
    }


    case 'GET_CHART_ARRAY_PENDING':
    return {
      ...state,
       repoList: state.repoList.map((repo) => {
        if(repo.name === action.repo) repo.loading = true;
        return repo;
      }),
      forceSidebar: true
    }
    case 'SET_CHART_ARRAY':
    return {
      ...state,
      chartArray: action.payload,
      forceSidebar: false,
      repoList: state.repoList.map((repo) => {
        if(repo.name.trim() === action.repo.trim()) {
          repo.loading = false;
          repo.loaded = true;
        }
        return repo;
      }),
      repoLoaded:true,
      repoName: action.repo
    }
    case 'SET_REL_CHART_ARRAY':
  
    return {
      ...state,
      relChartArray: action.relChartArray
    }
    
    default:
      return state;
  }

}  

export default mainWindow;


