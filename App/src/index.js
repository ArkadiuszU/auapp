import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './resources/scss/index.scss';

import Data from "./data/data"
import Plot from "./components/Plot"
import Table from "./components/Table"
import DataBox from "./components/DataBox"

const App= () => {

    return (
      <>
        <div className="content-box-container-first" > 
       
          <div className="intro-box-1"></div>
          <div className="intro-box-2"></div>
          <div className="intro-box-3">
            <div >
              <a href="#boxes">Boxes</a>
            </div>
            <div  >
            <a href="#line-plot">Line Plot</a>
            </div>
            <div  >
            <a href="#table">Table</a>
            </div>
          </div>

        </div>
      {
        (true)?
        <>
        <div id="boxes" className="content-box-container-second dataBox-box-container" > 
        <DataBox id = {1} title="temperature" value ="23 °C" imgPath= "/src/resources/img/temperature.png"/>
        <DataBox  id = {2} title="pressure" value ="1200 hPa" imgPath= "/src/resources/img/pressure.png"/>
        <DataBox id = {3} title="humidity" value ="60 %" imgPath= "/src/resources/img/humidity.png"/>
        <DataBox id = {4} title="insolation" value ="800 lux" imgPath= "/src/resources/img/sun.png"/>
        </div>

        <div id = "line-plot" className="content-box-container-third" > 
        <Plot data={Data.GetData("temperature")}/>
        </div>

        <div id = "table" className="content-box-container-fourth" > 
        <Table data={Data.allData}/>
        </div>
        </>:null
      }
      </>

   );
  }



ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));