export const setNextPgmSource = (pgmSourceList, pgmSource, screenId) => {
  if (pgmSourceList.length > 0) {
  const currentPgmSource = pgmSourceList.filter((item)=> item.screenId === screenId)
  if (currentPgmSource.length > 0 ){
    return pgmSourceList.map((item)=> {
      if (item.screenId === screenId) item.pgmSource = pgmSource;
      return item;
    })
    }
  } 
  return [...pgmSourceList, {screenId:screenId, pgmSource:pgmSource }]
}


export const setWhereUsed = (pgmSourceList, whereUsed, screenId) => {

    let finalWhereUsed = []
    if (pgmSourceList.length > 0) {
    const currentPgmSource = pgmSourceList.filter((item)=> item.screenId === screenId)
    if (currentPgmSource.length > 0 ){
       const pgmWhereUsed = currentPgmSource[0].pgmSource.filter((item)=> {
       return item.MVAR === whereUsed || item.MVARDB === whereUsed || item.SVAR1 === whereUsed ||
       item.SVAR1DB === whereUsed || item.SVAR2 === whereUsed || item.SVAR2DB === whereUsed ||
       item.SVAR3 === whereUsed || item.SVAR3DB === whereUsed || item.SVAR4 === whereUsed ||
       item.SVAR4DB === whereUsed}
       )
       finalWhereUsed = pgmWhereUsed;
      }
    } 
     return finalWhereUsed
}
 

