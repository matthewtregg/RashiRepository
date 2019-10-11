
export const setNextZoomLevel = (zoomLevels, zoomLevel, screenId) => {
  if (zoomLevels.length > 0) {
  const currentZoomLevel = zoomLevels.filter((item)=> item.screenId === screenId)
  if (currentZoomLevel.length > 0 ){
    return zoomLevels.map((item)=> {
      if (item.screenId === screenId) item.zoomLevel = zoomLevel;
      return item;
    })
    }
  } 
  return zoomLevels = [...zoomLevels, {screenId:screenId, zoomLevel:zoomLevel }]

}

export const setNextCentre = (chartCentres, centre, screenId) => {
  if (chartCentres.length > 0) {
  const currentCentre = chartCentres.filter((item)=> item.screenId === screenId)
  if (currentCentre.length > 0 ){
    return chartCentres.map((item)=> {
      if (item.screenId === screenId) item.centre = centre;
      return item;
    })
    }
  } 
  return chartCentres = [...chartCentres, {screenId:screenId, centre:centre }]

}


export const setNextLoadedStatus = (loadedCharts, loaded, screenId) => {
  if (loadedCharts.length > 0) {
  const currentLoaded = loadedCharts.filter((item)=> item.screenId === screenId)
  if (currentLoaded.length > 0 ){
    return loadedCharts.map((item)=> {
      if (item.screenId === screenId) item.loaded = loaded;
      return item;
    })
    }
  } 
  return loadedCharts = [...loadedCharts, {screenId:screenId, loaded:loaded }]

}

export const setNext = (nextDiagrams, pgm, screenId) => {
  if (nextDiagrams.length > 0) {
  const currentDiag = nextDiagrams.filter((nextDiagram)=> nextDiagram.screenId === screenId)
  if (currentDiag.length > 0 ){
    return nextDiagrams.map((nextDiagram)=> {
      if (nextDiagram.screenId === screenId) nextDiagram.nextDiagram = pgm
      return nextDiagram
    })
    }
  } 
  return nextDiagrams = [...nextDiagrams, {screenId:screenId, nextDiagram:pgm }]

}
export const setHighlightPgms = (HighlightPgms, HighlightedPgm, screenId) => {
  if (HighlightPgms.length > 0) {
  const currentHighlightedPgm = HighlightPgms.filter((item)=> item.screenId === screenId)
  if (currentHighlightedPgm.length > 0 ){
    return HighlightPgms.map((item)=> {
      if (item.screenId === screenId) item.HighlightedPgm = HighlightedPgm;
      return item;
    })
    }
  } 
  return HighlightPgms = [...HighlightPgms, {screenId:screenId, HighlightedPgm:HighlightedPgm }]

}


export const setNextStrChartMode = (chartModes, chartMode, screenId) => {
  if (chartModes.length > 0) {
  const currentChartMode = chartModes.filter((item)=> item.screenId === screenId)
  if (currentChartMode.length > 0 ){
    return chartModes.map((item)=> {
      if (item.screenId === screenId) item.chartMode = chartMode;
      return item;
    })
    }
  } 
  return [...chartModes, {screenId:screenId, chartMode:chartMode }]

}


export const setNextDiagData = (DiagsData, DiagData, screenId) => {
  if (DiagsData.length > 0) {
  const currentDiagData = DiagsData.filter((item)=> item.screenId === screenId)
  if (currentDiagData.length > 0 ){
    return DiagsData.map((item)=> {
      if (item.screenId === screenId) item.DiagData = DiagData;
      return item;
    })
    }
  } 
  return [...DiagsData, {screenId:screenId, DiagData:DiagData }]

}