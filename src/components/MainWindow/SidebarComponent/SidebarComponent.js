import React from 'react';
import './SidebarComponent.css';
import Sidebar from './Sidebar/Sidebar';
import {EntityDiagList} from '../SidebarLists/EntityDiagList/EntityDiagList';
import {ProgramDiagList} from '../SidebarLists/ProgramDiagList/ProgramDiagList';
import {TransactionHistoryList} from '../SidebarLists/TransactionHistoryList/TransactionHistoryList';
import RepoIcon from './module_view.gif';
class SidebarComponent extends React.Component {
  
  render() {
    let repoList = "";
    if (this.props.repoInfo) {
        repoList = this.props.repoInfo.map((repo, index) => {
        if (repo.expanded) {
        return <div key={index} ><h1>
                <img src={RepoIcon} alt="assets" onClick={()=>{
                this.props.collapseRepo(repo.name)
                }}></img>
                <span className="caret-down" >{" "+ repo.name}</span></h1>
                <ProgramDiagList  getPgmList={this.props.getPgmList} 
                setNewWindowMode={this.props.setNewWindowMode}
                repoName={this.props.repoName}
                pgmListLoading={this.props.pgmListLoading}
                />
                <EntityDiagList
                getEntList = {this.props.getEntList}
                setNewWindowMode={this.props.setNewWindowMode}
                entListLoading = {this.props.entListLoading}
                repoName={this.props.repoName}
                />
                <TransactionHistoryList/>
             </div> ; 
        } 
        else {
        if (repo.loading) {
          return <div key={index}>
        <h1><img src={RepoIcon} alt="assets" onClick={()=>{
                }}></img>
        <span className="caret" >loading</span></h1>
        </div>;
        }
    
        if (repo.loaded){
          return<div key={index}>
        <h1><img src={RepoIcon} alt="assets" onClick={()=>{
          this.props.expandRepo(repo.name)}}></img> 
        <span className="caret" >{" " + repo.name}</span></h1>
        </div>;
        }
         
        else {
          return <div key={index}>
        <h1><img src={RepoIcon} alt="assets" onClick={()=>{
                this.props.getChartArray(repo.name);
                }}></img>
        <span className="caret" >{" " + repo.name+ "unloaded "}</span></h1>
        </div>;
        }
          }    
        });
      }
      else {
      repoList = <div><h1>loading</h1></div>;
      }
  
    return (
      <div className="RepoList">
      {repoList}
      </div>
    )
  }
}

export default SidebarComponent;



