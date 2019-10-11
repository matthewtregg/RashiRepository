
import React, {useEffect} from 'react';
import {Navbar} from '../components/Navbar/Navbar';
import {MainWindow} from '../components/MainWindow/MainWindow';
import {connect} from 'react-redux';
import {showSideBar,setNewWindowMode,getRepositoryList, collapseRepo,getChartArray, expandRepo} from '../Redux/actions/Mainwindow';
import{setPgmList} from '../Redux/actions/pgmList';
import{setEntList} from '../Redux/actions/entList';

// FINE
const mapStateToProps = (state) => {
    console.log(state);
  return {
    // windowMode can be file window// blank// pgmWindow
    windowMode: state.mainWindow.windowMode,
    // list of repos for the sidePanel
    repoList: state.mainWindow.repoList,
    // To fill - navigation history
    navigationHistory: state.mainWindow.navigationHistory,
    // state for whether the mainwindow sidebar is show
    showSideBar: state.mainWindow.showSideBar,
    // name of the repo currently selected
    repoName: state.mainWindow.repoName,
    // state for whether the repo is loaded
    repoLoaded: state.mainWindow.repoLoaded,
    // state for where the sidebar is frozen while repository loading
    forceSideBarState: state.mainWindow.forceSidebar,
    // state for whether the program list is loading
    pgmListLoading: state.pgmList.pgmListLoading,
    // state for whether the entity list is loading
    entListLoading: state.entList.entListLoading
  }
}

 
const mapDispatchToProps = (dispatch) => {
  return {
    // change the window mode for the main indow
    setNewWindowMode: (windowMode) => dispatch(setNewWindowMode(windowMode)),
    // change the repository list for the main window
    getRepositoryList: () => dispatch(getRepositoryList()),
    // collapse a repo for the sidebar
    collapseRepo: (repoToCollapse) => dispatch((collapseRepo(repoToCollapse))),
    // expand a repo for the sidebase 
    expandRepo: (repoToExpand) => dispatch((expandRepo(repoToExpand))), 
    // change where sidebar is show or not
    setShowSideBar: (open) => {(dispatch(showSideBar(open)))},
    // get initial pgm chart array 
    getChartArray: (repoName)=> {(dispatch(getChartArray(repoName)))}, 
    // get the list of pgms for the program list window
    getPgmList: (repoName) => dispatch(setPgmList(repoName)),
    // get the list of ents for the entity list window 
    getEntList: (repoName) => {dispatch(setEntList(repoName))}
  }
}

const MainWindowContainer = ({
  // navigation history of past diagrams (to complete)
  navigationHistory,
  // change the window mode for the main window
  setNewWindowMode,
  // expand the repo for the sidebar
  expandRepo,
  // collapse repo for the sidebar
  collapseRepo,
  // window mode for the main window
  windowMode,
  // list of repositories 
  repoList,
  // get repository list from api
  getRepositoryList,
  // change state to show sidebar
  setShowSideBar,
  // state for where sidebar is shown 
  showSideBar,
  // name for the current repo
  repoName,
  // get the pgm structure chart array
  getChartArray,
  // force side bar to stay open 
  forceSideBarState,
  // state for whether the repo is loaded 
  repoLoaded,
  // get the pgm list data from API
  getPgmList,
  // state for when the pgm List is loading
  pgmListLoading,
  // get the ent list data from API
  getEntList,
  // state for when the ent/file list is loading 
  entListLoading
}) => {
  
  useEffect(()=> {
    // on loadup get the list of repositories
    getRepositoryList();
  
  },[])



  return (
    <div > 
       <Navbar navigationHistory={navigationHistory} 
       // show the sidebar when you click on document in the navbar
       setShowSideBar={setShowSideBar}/>
       <MainWindow 

       // list of repositories to load
       repoList = {
         repoList
       }

       // expand an individual repo 
       expandRepo = {
         expandRepo
       }
      
       // collapse an individual repo
       collapseRepo = {
         collapseRepo
       }
       
       // freeze sidebar when loading
       forceSideBarState = {
         forceSideBarState
       }

       // get pgm structure chart Array 
       getChartArray = {
        getChartArray
       }
   
       // get name of current Repo
       repoName = {
         repoName
       }
 
       // repo loaded state
       repoLoaded = {
         repoLoaded
       }

       // main window mode
       windowMode = {
         windowMode
       }

       // change main window
       setNewWindowMode = {
         setNewWindowMode
       }

       // change side bar
       setShowSideBar ={
         setShowSideBar
       }

       // side bar state
       showSideBar ={
        showSideBar
       }

      // get pgm list from api 
       getPgmList = {
         getPgmList
       }


      // state for when pgm list is loading
      pgmListLoading = {
        pgmListLoading 
       }


      // get the list of files/entities
      getEntList = {
        getEntList
      }

      // state for when entity list is loading
      entListLoading = {
       entListLoading 
      }

       />
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(MainWindowContainer);





