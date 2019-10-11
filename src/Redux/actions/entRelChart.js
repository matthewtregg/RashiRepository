
export const setEntRelChartData = (relChartArray,ent,screenId,otherRelData) => 
({
  type: 'GET_ENT_DIAGRAM_DATA',
  screenId,
  ent,
  relChartArray,
  otherRelData
})

export const getRelChartArray = (ent, screenId) => 
({
  type: 'GET_REL_CHART_ARRAY',
  ent,
  screenId,
  url: `http://195.224.116.34:5000/getEntRelParent/${ent}`
})

export const addParRelChartArray = (ent, screenId) => 
{
  return ({
  type: 'ADD_PAR_TO_REL_CHART_ARRAY',
  ent,
  screenId,
  url: `http://195.224.116.34:5000/getEntRelParent/${ent}`
})}

export const addChldRelChartArray = (ent, screenId) => 
{
  return ({
  type: 'ADD_CHLD_TO_REL_CHART_ARRAY',
  ent,
  screenId,
  url: `http://195.224.116.34:5000/getEntRelChild/${ent}`
})}

export const setParButtonPressed = (ent,screenId) => ({
  type:'SET_PAR_BUTTON_PRESSED',
  ent,
  screenId
})

export const setChldButtonPressed = (ent, screenId) =>{
  return ({
    type:'SET_CHLD_BUTTON_PRESSED',
    ent,
    screenId
  })
}

export const remParRelChartArray = (ent, screenId) => {
  return ({
    type:'REM_PAR_REL_CHART_ARRAY',
    ent,
    screenId
  })
}

export const remChldRelChartArray = (ent, screenId) => {
  return ({
    type:'REM_CHILD_REL_CHART_ARRAY',
    ent, 
    screenId
  })
}

  

