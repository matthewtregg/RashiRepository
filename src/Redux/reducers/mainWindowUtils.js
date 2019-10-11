

export const getSidebar = (sideBarState, forceSidebarState) => {
  if(forceSidebarState) return true;
  else return !sideBarState;
  
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

