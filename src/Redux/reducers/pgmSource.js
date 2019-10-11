import { setNextPgmSource, setWhereUsed } from "./pgmSourceUtils";


const initialState = {
  pgmSourceList: [],
  whereUsedSource: [],
}

const pgmSource = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PGM_SOURCE':
      return {
        ...state,
        pgmSourceList: setNextPgmSource(state.pgmSourceList, action.pgmSource, action.screenId)
      }

      case 'GET_PGM_SOURCE':
        return {
          ...state,
          pgmSourceList: setNextPgmSource(state.pgmSourceList, action.payload, action.screenId)
        }

      case 'SET_SOURCE_WHERE_USED':
        return {
          ...state,
          whereUsedSource: setWhereUsed(state.pgmSourceList, action.whereUsed, action.screenId)
        }    


        default:
          return state;
  }
}
 


export default pgmSource;