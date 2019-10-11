import React from 'react';
import './EntityDiagList.css';
import EntDiagList from './ch_callers.gif';

export const EntityDiagList= ({setNewWindowMode, repoName, entListLoading, getEntList}) => {

const getEntButton = (entListLoading) => {
  // change the repository list depending on whether the ent list is loading
  switch(entListLoading){
    case "Loading":
    return <ul>
    <div className="Programs" > 
    <li onClick={()=>{
      }}>
    <span><img src={EntDiagList} alt="assets"></img> Loading</span></li>
    </div>
    </ul>;
    case "Loaded":
    return <ul >
    <div className="Programs" > 
    <li onClick={()=>{
      // change the MainWindow Mode to entlist
       setNewWindowMode('entList')
      }}>
    <span><img src={EntDiagList} alt="assets"></img> Files</span></li>
    </div>
    </ul>
    default:
    return <ul>
    <div className="Programs" > 
    <li onClick={()=>{
      // get the entity list for the given repo
      getEntList(repoName);
    }}>
    <span><img src={EntDiagList} alt="assets"></img> Files</span></li>
    </div>
    </ul>;
      }
  }

const EntListButton = getEntButton(entListLoading) 


return (
  EntListButton
)



}