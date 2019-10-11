export const setInitialZoom = (screenId) => ({
  type: 'SET_INITIAL_ZOOM',
  screenId
});

export const setInitialCentre = (centre, screenId) => ({
  type: 'SET_INITIAL_CENTRE',
  screenId,
  centre
})

export const setChartCentre = (centre, screenId) => ({
  type: 'CENTRE',
  screenId,
  centre
})


export const zoomIn = (screenId) => ({
  type: 'ZOOM_IN',
  screenId,
  zoomLevel: 0.25
});

export const setInitialLoadedStatus = (screenId) => ({
  type: 'SET_INITIAL_LOADED_STATUS',
  screenId,
  loaded: false
})

export const zoomOut = (screenId) => ({
  type: 'ZOOM_OUT',
  screenId
})

export const changeLoadedStatus = (screenId) => ({
  type: 'LOADED',
  screenId
})

// links chart to source
export const setChartLinkedPgm = (chartLinkedPgm, screenId) => ({
  type: 'SET_CHART_LINKED_PGM',
  chartLinkedPgm,
  screenId
})
