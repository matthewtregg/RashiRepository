export const setWhereUsed = (whereUsedList, whereUsed, screenId) => {
  if (whereUsedList.length > 0) {
    const currentWhereUsed = whereUsedList.filter((item)=> item.screenId === screenId)
    if (currentWhereUsed.length > 0 ){
      return whereUsedList.map((item)=> {
        if (item.screenId === screenId) item.whereUsed = whereUsed;
        return item;
      })
      }
    } 
    return [...whereUsedList, {screenId:screenId, whereUsed:whereUsed }]
  
  }
