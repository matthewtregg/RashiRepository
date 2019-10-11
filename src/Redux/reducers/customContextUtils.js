export const setNextMenuOption = (menuOptions, menuOption, contextId, contextState) => {
  if (menuOptions.length > 0) {
  const currentMenuOptions = menuOptions.filter((item)=> item.contextId === contextId)
  if (currentMenuOptions.length > 0 ){
    return menuOptions.map((item)=> {
      if (item.contextId === contextId) item.menuOption = menuOption;
      return item;
    })
    }
  } 
  return menuOptions = [...menuOptions, {contextId:contextId, menuOption:menuOption, contextState }]

}

export const changeContextMenu = (menuOptions, contextState, contextId ) => {
  if (menuOptions.length > 0) {
    const currentMenuOptions = menuOptions.filter((item)=> item.contextId === contextId)
    if (currentMenuOptions.length > 0 ){
      return menuOptions.map((item)=> {
        if (item.contextId === contextId) item.contextState = contextState;
        return item;
      })
      }
  }
}


export const HoverMouseOver = (menuOptions, menuOptionId, contextId) => {
  if (menuOptions.length > 0) {
  const currentMenuOptions = menuOptions.filter((item)=> item.contextId === contextId)
  const currentMenuOption = currentMenuOptions[0];
  const newMenuOptions =  menuOptions.filter((item)=> item.contextId !== contextId)
  if (currentMenuOptions.length > 0 ) {
    const newMenuOption = currentMenuOption.menuOption.map((option)=>{
      if (menuOptionId === option.id ) option.hover=true;
      else option.hover = false;
      return option
    })
    return [...newMenuOptions, {...currentMenuOption, menuOption: newMenuOption}]

  } 
}
}

export const setChangeContextState = (menuOptions, contextState, contextId, initialState) => {
  if (menuOptions.length > 0) {
  const currentContextMenu = menuOptions.filter((item)=> item.contextId === contextId)
  if (currentContextMenu.length > 0 ){
    return menuOptions.map((item)=> {
      if (item.contextId === contextId) item.contextState= contextState;
      return item;
    })
    }
  } 
  return [...menuOptions, {contextId: contextId, contextState:contextState }]
}