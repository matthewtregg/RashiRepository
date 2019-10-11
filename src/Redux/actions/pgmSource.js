
export const setPgmSource = (pgmSource,screenId) => ({
  type: 'SET_PGM_SOURCE',
  screenId,
  pgmSource
}) 

export const changePgmSource = (screenId,pgm) =>({
  type: 'GET_PGM_SOURCE',
  url:`http://195.224.116.34:5000/SourceBrowser/PgmCodeData/${pgm}`,
  screenId,
  pgm
})
   
export const setWhereUsed = (whereUsed,screenId) => ({
  type: 'SET_SOURCE_WHERE_USED',
  screenId,
  whereUsed
}) 
  


