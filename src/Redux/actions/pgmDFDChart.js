
export const setDFDChartMode = (mode, screenId) => ({
  type: 'SET_DFD_PGM_STR_MODE',
  screenId,
  mode
})

export const setNextDFDType = (DFDChartType) => ({
  type: 'SET_DFD_TYPE',
  DFDChartType
})

export const setDFDPgmDiagramData= (pgm, screenId, repo) =>({
  type: 'GET_DFD_DIAGRAM_DATA',
  url:`http://195.224.116.34:5000/PgmDFDCentral/${pgm}/${repo}`,
  screenId,
  pgm,
  repo
  })

export const setDFDFileDiagramData= (ent,view, screenId, repo) =>({
    type: 'GET_FILE_DFD_DIAGRAM_DATA',
    url:`http://195.224.116.34:5000/FileDFDCentral/${ent}/${repo}`,
    screenId,
    ent,
    repo
})
  

  
