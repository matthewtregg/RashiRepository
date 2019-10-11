
export const setHighlightPgm = (pgm, screenId) => ({
  type: 'HIGHLIGHT_PGM',
  screenId,
  HighlightedPgm: pgm
})

export const setPgmStrChartMode = (mode, screenId) => ({
  type: 'SET_PGM_STR_MODE',
  screenId,
  mode
})

export const setDiagramData = (chartArray, pgm,screenId) => ({
  type: 'GET_STRUCTURE_DIAGRAM_DATA',
  screenId,
  pgm,
  chartArray
})



