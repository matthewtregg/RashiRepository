import React from 'react';
import './ProgramDiagList.css';
import PgmDiagList from './class_hi.gif';



export const ProgramDiagList= ({setNewWindowMode, repoName, pgmListLoading, getPgmList }) => {

const getPgmButton = (pgmListLoading) => {
  switch(pgmListLoading){
    case "Loading":
    return <ul>
    <div className="Programs" > 
    <li onClick={()=>{
      }}>
    <span><img src={PgmDiagList} alt="assets"></img> Loading</span></li>
    </div>
    </ul>;
    case "Loaded":
    return <ul >
    <div className="Programs" > 
    <li onClick={()=>{
       setNewWindowMode('pgmList')
      }}>
    <span><img src={PgmDiagList} alt="assets"></img> Programs</span></li>
    </div>
    </ul>
    default:
    return <ul>
    <div className="Programs" > 
    <li onClick={()=>{
      getPgmList(repoName);
    }}>
    <span><img src={PgmDiagList} alt="assets"></img> Programs</span></li>
    </div>
    </ul>;
      }
  }

const ProgramListButton = getPgmButton(pgmListLoading) 

 




return (
  ProgramListButton
)



}

   
  // <ul>
  // <div className="Programs" > 
  // <li onClick={()=>{
  //   console.log(repoName);
  // }}>
  // <span><img src={PgmDiagList} alt="assets"></img> Programs</span></li>
  // </div>
  // </ul> 