import React, {useEffect} from 'react';
import SidebarComponent from './SidebarComponent/SidebarComponent';
import './MainWindow.css';
import ProgramListWindowContainer from "../../containers/ProgramListWindowContainer";
import FileListWindowContainer from "../../containers/FileListWindowContainer";

export const MainWindow = ({
  // expand Repo within sidebar
    expandRepo,
  // collapse Repo within sidebar
    collapseRepo,
  // repository list
    repoList,
  // main window mode 
    windowMode,
  // change the main window mode
    setNewWindowMode,
  // change the sidebar show
    setShowSideBar,
  // whether the sidebar is shown 
    showSideBar,
  // repo name for the main window 
    repoName,
  // get pgm str chart array at load up   
    getChartArray,
  // force side bar state to be frozen 
    forceSideBarState,
  // state for whether the repo is loaded or not
    repoLoaded,
  // get the pgm list from the API
    getPgmList,
  // state for whether the pgm list is loading
    pgmListLoading,
  // get the ent list from the API
    getEntList,
    // state for whether the ent list is loading
    entListLoading,
  }) => {



// I just need these to force the update of the sidepanel panel 
useEffect (() =>{
 if (repoName) {
expandRepo(repoName)}
},[repoLoaded,pgmListLoading,entListLoading])

const getDiagWindow = (windowMode) => {
  switch (windowMode) {
    case 'pgmList':
    // program List window
    return <ProgramListWindowContainer  repoName={repoName}/>
    case 'entList':
    // entity List window 
    return <FileListWindowContainer  repoName={repoName}/>
    default:
    return <div></div>;
  }
};

// the mainwindow for the file or for pgms 
const DiagWindow = getDiagWindow(windowMode) ;

return (
<div className="MainWindow">
   <SidebarComponent 
   // repo List
   repoInfo={repoList} 
   // expand repo
   expandRepo={expandRepo} 
   // collapse repo
   collapseRepo={collapseRepo} 
   // change the main window mode
   setNewWindowMode={setNewWindowMode} 
   // change the sidebar
   setShowSideBar={setShowSideBar} 
   // the side state open/closed
   showSideBar = {showSideBar}
   // get the loadup chart array
   getChartArray={getChartArray} 
   // freeze sidebar
   forceSideBarState={forceSideBarState} 
   // the repo currently on
   repoName={repoName} 
   // get the program list
   getPgmList={getPgmList} 
   // state for program list loading
   pgmListLoading={pgmListLoading}
   // get the entity list 
   getEntList={getEntList} 
   // state for entity list loading
   entListLoading={entListLoading} 
   />   
   {DiagWindow}
</div>);
}

