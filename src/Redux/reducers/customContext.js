
import {setNextMenuOption,HoverMouseOver,setChangeContextState} from './customContextUtils';

const initialState = {
  menuOptions: [],
}


// CREATE CUSTOM CONTEXT MENU STATE
// RIGHT CLICK MENU STATE
const InitialContextState = {
  visible: false,
  x: 0,
  y: 0,
  object: ''}

const customContext = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MENU_OPTIONS":
      return {
        ...state,
        menuOptions: setNextMenuOption(state.menuOptions,action.menuOptions, action.contextId ,InitialContextState)
      }
    case "HOVER_MOUSEOVER":
      return {
        ...state,
        menuOptions: HoverMouseOver(state.menuOptions, action.menuOptionId, action.contextId)
      }
    case "SET_CONTEXT_MENU":
      return {
        ...state,
        menuOptions: setChangeContextState(state.menuOptions, action.contextState, action.contextId, InitialContextState)
      }
    default:
      return state;
    
  }

} 

export default customContext;