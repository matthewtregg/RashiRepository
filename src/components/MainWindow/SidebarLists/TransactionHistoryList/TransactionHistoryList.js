import React from 'react';
import './TransactionHistoryList.css';
import TransHistList from './history_working_set_obj.gif';



export const TransactionHistoryList= () => {


return (
  <ul>
  <div className="TransactionHistory"> 
  <li><span><img src={TransHistList} alt="assets"></img> Transaction History</span></li>
  </div>
</ul>
  

)




}