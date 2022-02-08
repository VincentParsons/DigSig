import React from "react";
import "./LeftSignBar.css";
import * as FaIcons from "react-icons/fa";

const LeftSignBar = () => {
    return (
      <div className="left-sign-bar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars/>

        </Link>
      </div>
    );
  };
  

export default LeftSignBar;