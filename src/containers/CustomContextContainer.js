
import React, {useEffect} from 'react';
import CustomContext from '../components/MainWindowLists/customContext/customContext'
import {connect} from 'react-redux';
import {addMenuOptions,hoverMouseOver, setContextMenuState} from '../Redux/actions/CustomContext';

const mapStateToProps = (state) => {
  return {
   menuOptions: state.customContext.menuOptions,
  }
}

 
const mapDispatchToProps = (dispatch) => {
  return {
    addMenuOptions : (menuOptions,contextId) => dispatch(addMenuOptions(menuOptions, contextId)),
    hoverMouseOver: (menuOptionId,contextId) => dispatch((hoverMouseOver(menuOptionId, contextId))),   
    setContextMenuState: (visible,x,y,object, contextId) => dispatch((setContextMenuState(visible,x,y,object, contextId)))
  }
}


function CustomContextContainer({
addMenuOptions,
hoverMouseOver,
List,
menuOptions,
displaySelectedPgm,
screenId, 
setContextMenuState,
goToSourceView,
menu,
contextClass,
contextId,
}) {

  useEffect (() => {
  addMenuOptions(menu, contextId);
},[])


  let customContext = "";
  if (menuOptions) {
  if (menuOptions.length > 0) {
    const menuOptionObj = menuOptions.filter((menuOpt) => menuOpt.contextId === contextId)[0];
    if (menuOptionObj) {
    const contextState = menuOptionObj ? menuOptionObj.contextState : null;
    const finalMenuOptions = menuOptionObj ? menuOptionObj.menuOption : null;

    customContext = < CustomContext
    
    List = {
      List
    }
    items = {
      finalMenuOptions
    }
    displaySelectedPgm = {
      displaySelectedPgm
    }
    goToSourceView = {
      goToSourceView
    }
    setState = {
      setContextMenuState
    }
    state = {
      contextState
    }

    contextId = {
      contextId
    }
    screenId = {
      screenId
    }
    hoverMouseOver = {
      hoverMouseOver
    }

    contextClass = {
        contextClass
      } >
      </CustomContext>;
    }   
  } else {
    customContext = null;

  } 

  return (
      customContext
  );
}
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomContextContainer);


