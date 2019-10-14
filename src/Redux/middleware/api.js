
import {getPgmStructureChartData, getDFDPgmData} from '../../Diagrams/Index';
import {buildEntData} from '../../EntRelDiagrams/index';
import {filterChildren, filterParents} from './apiUtil';
import axios from 'axios';


export const api = ({ dispatch, getState }) => (next => (action) => {
  
  let currentState = {};
  if (action.url ==="GET_CHART_ARRAY") {
    currentState = getState();
  // prevents multiple api calls
    if (currentState.mainWindow.forceSidebar) {
      dispatch ({ type:'DO_NOTHING'})   
    }
  }

   // sets pending action while loading from API
  console.log(action);

  next({
    type: `${action.type}_PENDING`,
    repo:action.repoToExpand
  });

  if (!action.url && action.type!== "GET_STRUCTURE_DIAGRAM_DATA" && action.type!=="GET_ENT_DIAGRAM_DATA" && action.type!=="GET_DFD_DIAGRAM_DATA") return next(action);

  if (action.type ==="GET_ENT_DIAGRAM_DATA") {
    const payload  = buildEntData(action.ent, action.relChartArray, action.otherRelData)  
    dispatch({
      type: "SET_ENT_DIAGRAM_DATA",
      payload: payload,
      screenId: action.screenId
    });
  }
  if (action.type === "GET_STRUCTURE_DIAGRAM_DATA") {
    getPgmStructureChartData(action.pgm, action.chartArray)
    .then(data => {
      const payload = data.data
      dispatch({
       type: "SET_STR_DIAGRAM_DATA",
       payload: payload,
       screenId: action.screenId
     });
    }) 
  }

  if (action.type === "GET_DFD_DIAGRAM_DATA") {
    console.log(action.pgm);
    console.log(action.pgmChartArray);
    getDFDPgmData(action.pgm, action.pgmChartArray)
    .then(data => {
      console.log(data);
      dispatch({
      type: "SET_DFD_DIAGRAM_DATA",
      screenId: action.screenId,
      payload: {"DFDPgmInfo": data,"DFDFileInfo":action.fileData, "centralSchema":[]}   
    })
    })
  }
    

  

  else { 
    fetch(action.url)
    .then(response => response.json()) 
    .then(data => {
      dispatchBasedOnActionType(action.type, data);
    });


    }

    


    // remove pgmCalls api call for diagram
    // clicked to produce schema 
    const dispatchBasedOnActionType = (type, data) => {
      switch (type){
        case 'GET_REL_CHART_ARRAY':
        dispatch({
          type: "GET_REL_CHART_ARRAY_CHILDREN",
          screenId: action.screenId,
          parents: filterParents(data.data),
          url: `http://195.224.116.34:5000/getEntRelChild/${action.ent}`,
          ent: action.ent
        })
        break;
        case 'GET_REL_CHART_ARRAY_CHILDREN':
        dispatch({
          type: "GET_REL_CHART_ARRAY",
          screenId: action.screenId,
          payload: [...filterChildren(data.data),...action.parents],
          ent: action.ent
        })
        break;
        case "GET_DFD_DIAGRAM_DATA_ENT":
        dispatch({
          fileData: data.data,
          type: "GET_DFD_DIAGRAM_DATA",
          screenId: action.screenId,
          pgm: action.pgm,
          pgmChartArray: action.pgmChartArray,
        })
        break;
        case "GET_FILE_DFD_DIAGRAM_DATA":
        dispatch({
          type: "GET_FILE_DFD_DIAGRAM_DATA_PGM",
          url: `http://195.224.116.34:5000/FileDFDPgm/${action.ent}/${action.repo}`,
          screenId: action.screenId,
          centralSchema: data.data,
          ent: action.ent,
          repo: action.repo
        });
        break;
        case "GET_FILE_DFD_DIAGRAM_DATA_PGM":
        dispatch({
          type: "GET_FILE_DFD_DIAGRAM_DATA_ENT",
          url: `http://195.224.116.34:5000/FileDFDEnt/${action.ent}/${action.repo}`,
          screenId: action.screenId,
          centralSchema: action.centralSchema,
          pgmData: data.data,
          ent: action.ent,
          repo: action.repo
        });
        break;
        case "GET_FILE_DFD_DIAGRAM_DATA_ENT":
        dispatch({
          type: "SET_FILE_DFD_DIAGRAM_DATA",
          screenId: action.screenId,
          payload: {"DFDPgmInfo": action.pgmData,"DFDFileInfo":data, "centralSchema":action.centralSchema}
        })
        break;
        case "GET_PGM_WHERE_USED":
        dispatch({
          type: "SET_PGM_WHERE_USED",
          payload: data,
          screenId: action.screenId,
          pgm: action.pgm
        });
        break;
        case "GET_FILE_WHERE_USED":
        dispatch({
          type: "SET_FILE_WHERE_USED",
          payload: data,
          screenId: action.screenId,
          file: action.file
        })
        break;
        case "GET_VARIABLE_WHERE_USED":
        dispatch({
          type: "SET_VARIABLE_WHERE_USED",
          payload: data,
          screenId: action.screenId,
          var: action.var
        });
        break;
        case "GET_FIELD_WHERE_USED":
        dispatch({
          type: "SET_FIELD_WHERE_USED",
          payload: data,
          screenId: action.screenId,
          field: action.field
        });
        break;
        case "GET_PGM_SOURCE":
        dispatch({
          type: type,
          payload: data.sourceData,
          screenId: action.screenId
        });
        break; 
        case "GET_REL_CHART_ARRAY":
        dispatch({
          type: type,
          payload: data.data,
          screenId: action.screenId
        })
        break;
        case "ADD_PAR_TO_REL_CHART_ARRAY":
        dispatch({
          type: type,
          payload: data.data,
          screenId: action.screenId
        })
        break;
        case "ADD_CHLD_TO_REL_CHART_ARRAY":
        dispatch({
          type: type,
          payload: data.data,
          screenId: action.screenId
        })
        break;
        case "GET_CHART_ARRAY":
        dispatch({
          type: 'GET_PGM_LIST',
          url: `http://195.224.116.34:5000/ProgramList/${action.repo}`,
          programs: data.progams,
          repo: action.repo,
        })
        break;
        case "GET_PGM_LIST":
        dispatch({
          type: 'GET_ENT_LIST',
          url: `http://195.224.116.34:5000/getEntList/${action.repo}`,
          programs: action.programs,
          pgmList: data,
          screenId: action.screenId,
          repo: action.repo,
        })
        break;
        case "GET_ENT_LIST":
        dispatch({
          type: "SET_CHART_ARRAY",
          payload: action.programs,
          pgmList: action.pgmList,
          entList: data,
          screenId: action.screenId,
          repo: action.repo,
        })
        break;
        default: 
        dispatch({
          type: type,
          payload: data,
          screenId: action.screenId
        })
      }
    }


  })
  
  


