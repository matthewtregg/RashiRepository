export const setEntListWindowMode = (entListWindowMode) => ({
  type: 'SET_ENTLIST_WINDOW_MODE',
  entListWindowMode 
})


export const setEntList = (repoName) => ({
  type: 'GET_ENT_LIST',
  url: `http://195.224.116.34:5000/getEntList/${repoName}`
})


export const setCurrentEntListEnt = (currentEnt) => ({
  type: 'SET_CURRENT_ENT',
  currentEnt
})

export const setChartLinkedEnt = (chartLinkedEnt, screenId) => ({
  type: 'SET_CHART_LINKED_ENT',
  chartLinkedEnt,
  screenId
})