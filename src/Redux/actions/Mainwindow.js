export const setNewWindowMode = (windowMode) => ({
  type: 'SET_NEW_WINDOW_MODE',
  windowMode
});

export const showSideBar = (open) => ({
  type: 'SHOW_SIDEBAR',
  open
})

export const getChartArray = (dbName) => 
({
  type: 'GET_CHART_ARRAY',
  url: `http://195.224.116.34:5000/ProgramStructureChart/${dbName}`,
  repoToExpand: dbName,
  repo: dbName,
})

export const getRepositoryList = () =>
({
  type: 'GET_REPOSITORY_LIST',
  url: 'http://195.224.116.34:5000/getrep/'
})

export const addCurrentChart = (currentChart) => ({
  type: 'ADD_CURRENT_CHART',
  currentChart
});


export const expandRepo = (repoToExpand) => {
  return({
  type: 'EXPAND_REPO_CATEGORY',
  repoToExpand
})
}


export const collapseRepo = (repoToCollapse) => ({
  type: 'COLLAPSE_REPO_CATEGORY',
  repoToCollapse
});

export const setNextDiagram = (nextDiagram, screenId) => ({
  type: 'SET_NEXT_DIAGRAM',
  nextDiagram,
  screenId
})



