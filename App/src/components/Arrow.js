import React, { useEffect, useState } from "react";

const Arrow = ({onClickHendle, style, parent}) => {

  useEffect(()=>{



  },[])

  const ClickHendle = (e) =>
  {
    onClickHendle(parent)
  }

  return (

    <div className = {(style=="top")?"top-box":(style=="bottom")?"bottom-box":""}>

    <div className= {(style=="top")?"prevButton":(style=="bottom")?"nextButton":""} onClick= {ClickHendle}>
      <svg
        version="1.1"
        id="arrow"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="-8 -8 517 517"
      >
        <g>
          <g>
          <circle id="Ellipse 1" cx="250" cy="250" r="250" fill="#C4C4C4" id="path-for-animate"/>
          </g>
        </g>
        <g>
          <g>
            <path
              d="M369.227,283.365l-99.148-99.148c-7.734-7.694-20.226-7.694-27.96,0l-99.148,99.148c-6.365,7.416-6.365,18.382,0,25.798
           c7.119,8.309,19.651,9.28,27.96,2.161L256,226.256l85.267,85.069c7.734,7.694,20.226,7.694,27.96,0
           C376.921,303.591,376.921,291.098,369.227,283.365z"
            />
          </g>
        </g>
      </svg>
    </div>
    </div>
  );
};

export default Arrow;
