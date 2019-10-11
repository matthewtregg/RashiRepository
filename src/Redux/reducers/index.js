// import all reducers
import { combineReducers } from 'redux';
import mainWindow from './mainWindow';
import pgmList from './pgmList';
import pgmStrChart from './pgmStrChart';
import customContext from './customContext';
import pgmSource from './pgmSource';
import pgmDFDChart from './pgmDFDChart';
import entRelChart from './entRelChart';
import whereUsed from './whereUsed';
import entList from './entList';
import diagrams from './diagrams';
const allReducers = combineReducers({
  mainWindow,
  pgmList,
  pgmStrChart,
  customContext,
  pgmSource,
  pgmDFDChart,
  entRelChart,
  whereUsed,
  entList,
  diagrams
})

export default allReducers;