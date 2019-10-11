
export const addMenuOptions = (menuOptions, contextId) => ({
  type: 'ADD_MENU_OPTIONS',
  menuOptions,
  contextId
})

export const hoverMouseOver = (menuOptionId, contextId) => ({
  type: 'HOVER_MOUSEOVER',
  menuOptionId,
  contextId
})

export const setContextMenuState = (visible, x, y, object, contextId) => {
  return ({
    type: 'SET_CONTEXT_MENU',
    contextState: {
      visible,
      x,
      y,
      object
    },
    contextId
  })
}

