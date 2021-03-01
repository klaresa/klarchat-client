import React from 'react';
import './InfoBar.css';

const InfoBar = ({room}) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img
          className="onlineIcon"
          src="https://s2.svgbox.net/octicons.svg?ic=dot-fill&color=fff"
          width="20" height="20"
          alt="online"
        />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img
            src="https://s2.svgbox.net/materialui.svg?ic=close&color=fff"
            width="25" height="25"
            alt="leave"
          />
        </a>
      </div>
    </div>
  );
}

export default InfoBar;
