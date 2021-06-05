import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./resources/scss/index.scss";
import _ from 'lodash';
import Plot from "./components/Plot";
import Table from "./components/Table";
import DataBox from "./components/DataBox";
import Arrow from "./components/Arrow";
import DoughnutChart from "./components/DoughnutChart";
import About from "./components/About";

const breackpoints = [20, 40, 70, 90];
const colorsForPlot = [
  "rgb(255, 99, 132)",
  "rgb(23, 21, 151)",
  "rgb(157, 160, 16)",
  "rgb(29, 83, 34)",
];
const colorsForPlotBorder = [
  "rgba(255, 99, 132, 0.2)",
  "rgb(81, 178, 236)",
  "rgb(236, 240, 23)",
  "rgb(73, 180, 82)",
];

const measurementsNames = [  {"name": "temperature", "value" : "temponly"},
                              {"name": "humidity", "value" : "humonly"},
                              {"name": "insolation", "value" : "insonly"},
                              {"name": "pressure", "value" : "pressonly"}, ]

const baseComfort = {
  labels: ['Komfort'],
  datasets: [
    {
      data: [0,0],
      backgroundColor: [
        'rgba(224, 224, 224, 0.5)',
        'rgba(255, 255, 255)',
      ],
      borderColor: [
        'rgba(200, 200, 200, 1)',
        'rgba(255, 255, 255)',
      ],
      borderWidth: 1
    }
  ]
}

const App = () => {
  const firstScan = [false, false, false];
  const idLists = ["intro", "boxes", "line-plot", "table", "about"];
  const [animateTriger, setAnimateTriger] = useState(0);
  const [animateTrigerAbout, setAnimateTrigerAbout] = useState(false);
  const [plotTriger, setPlotTriger] = useState(false);
  const [sortMethod, setSortMethod] = useState(false);
  const [sortBy, setSortBy] = useState("created");
  const [currentDataComfort, setCurrentDataComfort] = useState(baseComfort);
  const [comfortValueInDonat, setComfortValueInDonat] = useState(0);
  const [statistic, setStatistic] = useState([])
  const [currentData, setCurrentData] = useState({
    comfort: 0,
    created: "2021-05-25 18:19:35",
    humidity: 0,
    id: 0,
    insolation: 0,
    pressure: 0,
    temperature: 0,
  });

  const [allData, setAllData] = useState([]);
  const [dataForPlot, setdataForPlot] = useState({
    data: { datasets: [], labels: [] },
  });

  const handleScroll = () => {
    let h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight";
    let percent =
      ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    if (percent > breackpoints[0] && !firstScan[0]) {
      setTimeout(function () {
        RefreshBoxes();
      }, 500);
      firstScan[0] = true;
    } else if (percent > breackpoints[1] && !firstScan[1]) {
      setPlotTriger(true);
      firstScan[1] = true;
    } else if (percent > breackpoints[2] && !firstScan[2]) {
      setTimeout(function () {
        RefreshTable();
      }, 500);
      firstScan[2] = true;
    }
    
    if (percent > 90)
    {
      setTimeout(function () {
        setAnimateTrigerAbout(true)
      }, 800);
    }
    else{
      setAnimateTrigerAbout(false)
    }

  };

  const NextSide = (side) => {
    location.href = "#";
    location.href = `#${idLists[idLists.indexOf(side) + 1]}`;
  };

  const PrevSide = (side) => {
    location.href = "#";
    location.href = `#${idLists[idLists.indexOf(side) - 1]}`;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
   RefreshTable();
  }, [sortMethod , sortBy]);

  const RefreshBoxes = () => {
    setAnimateTriger(0);
    setCurrentDataComfort(0);
    setComfortValueInDonat(0);

    fetch("http://silgy.org:3030/api/measurements" , {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache'})
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setCurrentData(data.measurements[data.measurements.length - 1]);
        setAnimateTriger(1);
        let comfort =  data.measurements[data.measurements.length - 1].comfort
        setTimeout(function () {
          setAnimateTriger(2);
          baseComfort.datasets[0].data = [comfort,100-comfort]
          setCurrentDataComfort(baseComfort)
          let intervalCounter = 0
          const interval = setInterval(function () {
            setComfortValueInDonat(intervalCounter)
            intervalCounter++;
            if(intervalCounter>comfort)
            {
              clearInterval(interval);
            }
            }, 10)
        }, 1500);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      //Statistic
      setStatistic([])
      measurementsNames.forEach(element => {
        fetch(`http://silgy.org:3030/api/measurements/?${element.value}=1` , {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          cache: 'no-cache'})
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let array = data[Object.keys(data)[1]];
            let sum = array.reduce(function(previousValue, currentValue, index, array) {
              return previousValue + currentValue;
            }, 0);
            setStatistic(prev=> {return  [...prev, {name:element.name, message: `min: ${Math.round(Math.min.apply(null, array)  * 100) / 100}  max: ${Math.round(Math.max.apply(null, array)  * 100) / 100}  avg: ${Math.round(sum/array.length)}` }] })
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });

  };

  const RefreshTable = () => {
    setAllData([]);
    fetch(`http://silgy.org:3030/api/measurements?${(sortMethod)?"od":"o"}=${sortBy}` , {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache'})
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setAllData(data.measurements);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const RefreshPlot = (m) => {
    setdataForPlot({ data: { datasets: [], labels: [] } });

    fetch(
      `http://silgy.org:3030/api/measurements?created_btw=${m.created.from
        .replace("T", "+")
        .concat(":00")},${m.created.to.replace("T", "+").concat(":00")}`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          cache: 'no-cache'}
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {

        const d = data[Object.keys(data)[1]];
        const labels = [];
        const signal = [];
        d.forEach((el) => {
          signal.push(el[m.name])
          labels.push(el.created);
        });

        setdataForPlot({
          labels: labels,
          datasets: [
            {
              label: m.name,
              data: signal,
              fill: false,
              backgroundColor: colorsForPlot[m.id],
              borderColor: colorsForPlotBorder[m.id],
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div id="intro" className="content-box-container-first">
        <div className="intro-box-1"></div>
        <div className="intro-box-2"></div>
        <div className="intro-box-3">
          <div>
            <a href="#boxes">Boxes</a>
          </div>
          <div>
            <a href="#line-plot">Line Plot</a>
          </div>
          <div>
            <a href="#table">Table</a>
          </div>
          <div>
            <a href="#about">About</a>
          </div>
        </div>
        <div className="intro-box-4"> 
            <h1>Projekt zaliczeniowy</h1> 
            <h1>Inteligentne domy i budynki oraz Monitorowanie i wizualizacja procesów </h1> 
        </div>
      </div>

      <div
        id="boxes"
        className="content-box-container-second dataBox-box-container"
      >
        <Arrow onClickHendle={PrevSide} style={"top"} parent={"boxes"} />

        <DataBox
          animateTriger={animateTriger}
          id={1}
          title="temperature"
          statistic = {statistic}
          value={`${Math.round(currentData.temperature * 100) / 100} °C`}
          imgPath="/src/resources/img/temperature.png"
        />
        <DataBox
          animateTriger={animateTriger}
          id={2}
          title="pressure"
          statistic = {statistic}
          value={`${currentData.pressure} hPa`}
          imgPath="/src/resources/img/pressure.png"
        />
        <DataBox
          animateTriger={animateTriger}
          id={3}
          title="humidity"
          statistic = {statistic}
          value={`${currentData.humidity} %`}
          imgPath="/src/resources/img/humidity.png"
        />
        <DataBox
          animateTriger={animateTriger}
          id={4}
          title="insolation"
          statistic = {statistic}
          value={`${currentData.insolation} lux`}
          imgPath="/src/resources/img/sun.png"
        />

        <div className="box-bottom">
          <div className="empty-space">
            <div>
            <img src= "/src/resources/img/info.png"/>
            <p>Prezentowane dane zostały zgromadzone: <span>{currentData.created}</span></p> 
            <p>Komfort został wyznaczony dla nastęlujących wartości oczekiwanych: </p>  
            <ul>
              <h1>dzień</h1>
              <li>temperatura: 20 °C</li>
              <li>wilgotność: 50 %</li>
              <li>ciśnienie: 1013 hPa</li>
            </ul>
            <ul>
            <h1>noc</h1>
              <li>temperatura: 18 °C</li>
              <li>wilgotność: 60 %</li>
              <li>ciśnienie: 1013 hPa</li>
            </ul>
            </div>
          </div>
          <div>
          <p>{(comfortValueInDonat == 0)?"": `${comfortValueInDonat}%`}</p>
          <DoughnutChart m={currentDataComfort}/>
          </div>
        
        </div>

        <Arrow onClickHendle={NextSide} style={"bottom"} parent={"boxes"} />

        <button onClick={RefreshBoxes}> Refresh </button>
      </div>

      <div id="line-plot" className="content-box-container-third">
        <Arrow onClickHendle={PrevSide} style={"top"} parent={"line-plot"} />

        <Plot data={dataForPlot} change={RefreshPlot} triger={plotTriger} />

        <Arrow onClickHendle={NextSide} style={"bottom"} parent={"line-plot"} />
      </div>

      <div
        id="table"
        className="content-box-container-fourth table-box-container"
      >
        <div className="filtration-table">
        <div> 
          <label>Select a method to sort:</label>
            <input type="radio" id="ascending" checked={!sortMethod} onChange = {e =>  setSortMethod(false)} />
            <label htmlFor="ascending">ascending</label>
            
            <input type="radio" id="descending"  checked={sortMethod} onChange = {e => setSortMethod(true)}/>
            <label htmlFor="descending">descending</label>
            </div>

            <div>
            <label htmlFor="sortBy">and sort by:</label>
            <select id="sortBy" value = {sortBy} onChange = {e => setSortBy(e.target.value)} >
            <option value="created"> created</option>
            <option value="temperature"> temperature</option>
            <option value="humidity"> humidity</option>
            <option value="insolation"> insolation</option>
            <option value="pressure"> pressure</option>
            <option value="comfort"> comfort</option>
          </select>
          </div>
        </div>
        <Arrow onClickHendle={PrevSide} style={"top"} parent={"table"} />
        <Table data={allData} />
        <Arrow onClickHendle={NextSide} style={"bottom"} parent={"table"} />
      </div>
      <div
        id="about"
        className="content-box-container-about"
      >
       <Arrow onClickHendle={PrevSide} style={"top"} parent={"about"} /> 

        <About animateTriger={animateTrigerAbout}/>

        </div>

    </>
  );
};

ReactDOM.render(<App name="Your name" />, document.getElementById("app"));
