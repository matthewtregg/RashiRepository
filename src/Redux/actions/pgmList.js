
export const setPgmListWindowMode = (pgmListWindowMode) => ({
  type: 'SET_PGMLIST_WINDOW_MODE',
  pgmListWindowMode 
})


export const setPgmList = (repoName) => ({
  type: 'GET_PGM_LIST',
  url: `http://195.224.116.34:5000/ProgramList/${repoName}`
})


export const setCurrentPgmListPgm = (currentPgm) => ({
  type: 'SET_CURRENT_PGM',
  currentPgm
})




