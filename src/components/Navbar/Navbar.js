import React from 'react';
import './Navbar.css';

export const Navbar= ({setShowSideBar}) => {

// TO COMPLETE (only has the sidebar for document) 
return(
 <div className="Navbar">
  <ul>
    <div className="Modes">
      <li><a onClick={setShowSideBar}>Document</a></li>
      <li ><a href="news.asp">Overview</a></li>
      <li><a href="contact.asp">Recent Diagrams </a></li>
      <li><a href="contact.asp">Settings</a></li>
      <li><a href="about.asp">Help</a></li>
    </div>
  </ul>

 </div>
);



};