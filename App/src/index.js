import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './resources/scss/index.scss';

import Data from "./data/data"
import Plot from "./components/Plot"
import Table from "./components/Table"
import DataBox from "./components/DataBox"

const breackpoints = [20, 50, 90]
let zmienna =false;
const App= () => {


  const [breakPoints, setbreakPoints] = useState({"first":false, "secound":false, "third":false})
  const firstScan = [false,false,false]
  
  const handleScroll = () =>{
    let h = document.documentElement, 
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';
    let percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;

    if(percent > breackpoints[0] && !firstScan[0] )
    {
        setbreakPoints(prev => ({ ...prev, "first": true}))
        firstScan[0] = true;
    }
    else if(percent > breackpoints[1] && !firstScan[1] )
    {
      setbreakPoints(prev => ({ ...prev, "secound": true}))
      firstScan[1] = true;
    }
    else if(percent > breackpoints[2] && !firstScan[2] )
    {
      setbreakPoints(prev => ({ ...prev, "third": true}))
        firstScan[2] = true;
    }

  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
  },[])

  useEffect(()=>{
    console.log(breakPoints)
  },[breakPoints])

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
        
        <>
        <div id="boxes" className="content-box-container-second dataBox-box-container" > 
        <DataBox init= {breakPoints.first}  id = {1} title="temperature" value ="23 °C" imgPath= "/src/resources/img/temperature.png"/>
        <DataBox init= {breakPoints.first}  id = {2} title="pressure" value ="1200 hPa" imgPath= "/src/resources/img/pressure.png"/>
        <DataBox init= {breakPoints.first}  id = {3} title="humidity" value ="60 %" imgPath= "/src/resources/img/humidity.png"/>
        <DataBox init= {breakPoints.first}  id = {4} title="insolation" value ="800 lux" imgPath= "/src/resources/img/sun.png"/>
        }
        </div>

        <div id = "line-plot" className="content-box-container-third" > 
        {(breakPoints.secound)? <Plot data={Data.GetData("temperature")}/>:null }
        </div>

        <div id = "table" className="content-box-container-fourth table-box-container" > 
        <Table data={Data.allData}/>
        </div>
        </>
      }
      </>

   );
  }



ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));