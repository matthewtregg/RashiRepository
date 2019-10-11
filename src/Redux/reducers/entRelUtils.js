export const setParButtonPressed = (relChartArray, ent, screenId) => {
  if (ent!=='') {
    const currentRelChartArray = relChartArray.filter((item)=> item.screenId === screenId)
    if (currentRelChartArray.length > 0 ){
      return relChartArray.map((item)=> {
        if (item.screenId === screenId) {
          item.entRelDataChart= item.entRelDataChart.map((data) => {
            if (data.PAR === ent) data.ButtonPressed = !data.ButtonPressed;  
            return data;
          })       
        } 
        return item;
      })
      }
  }

}

export const setChldButtonPressed = (relChartArray, ent, screenId) => {
  if (ent!=='') {
    const currentRelChartArray = relChartArray.filter((item)=> item.screenId === screenId)
    if (currentRelChartArray.length > 0 ){
      return relChartArray.map((item)=> {
        if (item.screenId === screenId) {
          item.entRelDataChart= item.entRelDataChart.map((data) => {
            if (data.CHLD === ent) data.ButtonPressed = !data.ButtonPressed;  
            return data;
          }) 
        } 
        return item;
      })
      }
  }

}

export const remParRelChartArray = (relChartArray, par, screenId) => {
  if (par!=='') {
    const currentRelChartArray = relChartArray.filter((item)=> item.screenId === screenId)
    if (currentRelChartArray.length > 0 ){
      return relChartArray.map((item)=> {
        if (item.screenId === screenId) {
          item.entRelDataChart= item.entRelDataChart.filter(data =>{
            return data.CHLD!==par})   
        } 
        return item;
      })
      }
  }

}


export const remChldRelChartArray = (relChartArray, child, screenId) => {
  if (child!=='') {
    const currentRelChartArray = relChartArray.filter((item)=> item.screenId === screenId)
    if (currentRelChartArray.length > 0 ){
      return relChartArray.map((item)=> {
        if (item.screenId === screenId) {
          item.entRelDataChart= item.entRelDataChart.filter(data =>{
            return data.PAR!==child})   
        } 
        return item;
      })
      }
  }

}

export const setNewRelChartArray = (relChartArray, newChartData, screenId) => {
    const adjNewChartData = newChartData.map((rel)=> {
      rel.ButtonPressed = false;
      rel.lastParent = rel.LASTPARENT ? true : false;
      rel.lastChild = rel.LASTCHILD ? true: false;
      return rel;
    })
  
  
  
  if (newChartData.length > 0) {
    const currentRelChartArray = relChartArray.filter((item)=> item.screenId === screenId)
    if (currentRelChartArray.length > 0 ){
      return relChartArray.map((item)=> {
        if (item.screenId === screenId) {
          item.entRelDataChart = adjNewChartData;
        }
        return item;
      })
      }
    } 
    return [...relChartArray, {screenId:screenId, entRelDataChart:adjNewChartData}];

}

export const addToRelChartArray = (relChartArray, newChartData, screenId) => {
  const adjNewChartData = newChartData.map((rel)=> {
    rel.ButtonPressed = false;
    rel.lastParent = rel.LASTPARENT ? true : false;
    rel.lastChild = rel.LASTCHILD ? true: false;
    return rel;
  })

  if (relChartArray.length > 0) {
     const currentRelChartArray = relChartArray.filter((item)=> item.screenId === screenId)
     if (currentRelChartArray.length > 0) {
     return relChartArray.map((item) => {
       if (item.screenId === screenId) {
          item.entRelDataChart = item.entRelDataChart.concat(adjNewChartData);
        }
        return item
     })
   }
  }
   return [...relChartArray, {screenId:screenId, entRelDataChart:adjNewChartData }]
}


export const setNextEntRelData = (entRelData, entRelDataChart, screenId) => {
  if (entRelData.length > 0) {
  const currentEntRelData = entRelData.filter((item)=> item.screenId === screenId)
  if (currentEntRelData.length > 0 ){
    return entRelData.map((item)=> {
      if (item.screenId === screenId) item.entRelDataChart = entRelDataChart;
      return item;
    })
    }
  } 
  return [...entRelData, {screenId:screenId, entRelDataChart:entRelDataChart}];

}

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