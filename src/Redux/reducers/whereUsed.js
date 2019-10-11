import {setWhereUsed } from "./whereUsedUtils";


const initialState = {
  pgmSourceList: [],
  whereUsedList: [],
  whereUsedType: 'Pgm',
  whereUsed: '',
}

const whereUsed = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VARIABLE_WHERE_USED':
      return {
        ...state,
        whereUsedList: setWhereUsed(state.whereUsedList, action.payload, action.screenId),
        whereUsed: action.var,
        whereUsedType: 'Variable'
      }
    case 'SET_FILE_WHERE_USED':
        return {
          ...state,
          whereUsedList: setWhereUsed(state.whereUsedList, action.payload, action.screenId),
          whereUsed: action.file,
          whereUsedType: 'File'
        }
    case 'SET_PGM_WHERE_USED':
        return {
          ...state,
          whereUsedList: setWhereUsed(state.whereUsedList, action.payload, action.screenId),
          whereUsed: action.pgm,
          whereUsedType: 'Pgm',
          windowMode:'ListAndWhereUsed'
        }    
    case 'SET_FIELD_WHERE_USED':
        return {
          ...state,
          whereUsedList: setWhereUsed(state.whereUsedList, action.payload, action.screenId),
          whereUsed: action.field,
          whereUsedType: 'Field'
      }  

    case 'SET_WHERE_USED_TYPE':
        return {
          ...state,
          whereUsedType: action.whereUsedType
        }

      default:
        return state;
  }
}
 


export default whereUsed;