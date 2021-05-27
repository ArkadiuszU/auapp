import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./resources/scss/index.scss";

import Plot from "./components/Plot";
import Table from "./components/Table";
import DataBox from "./components/DataBox";

const breackpoints = [20, 50, 90];
const colorsForPlot = ["rgb(255, 99, 132)", "rgb(23, 21, 151)", "rgb(157, 160, 16)", "rgb(29, 83, 34)"  ];
const colorsForPlotBorder = ["rgba(255, 99, 132, 0.2)", "rgb(81, 178, 236)", "rgb(236, 240, 23)", "rgb(73, 180, 82)"];
const sides = 4;
let wait = false;
const App = () => {
  const firstScan = [false, false, false];
  const idLists = ["intro", "boxes", "line-plot", "table"];
  const [animateTriger, setAnimateTriger] = useState(0);
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
  const [dataForPlot, setdataForPlot] = useState({ data: { datasets:[], labels:[] } });

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
      setTimeout(function () {
        RefreshPlot();
      }, 500);
      firstScan[1] = true;
    } else if (percent > breackpoints[2] && !firstScan[2]) {
      setTimeout(function () {
        RefreshTable();
      }, 500);
      firstScan[2] = true;
    }
  };

  const NextSide = (e) => {
    location.href = "#";
    location.href = `#${
      idLists[idLists.indexOf(e.target.parentElement.parentElement.id) + 1]
    }`;
  };

  const PrevSide = (e) => {
    location.href = "#";
    location.href = `#${
      idLists[idLists.indexOf(e.target.parentElement.parentElement.id) - 1]
    }`;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const RefreshBoxes = () => {
    setAnimateTriger(0);

    fetch("http://silgy.org:3030/api/measurements")
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data.measurements[data.measurements.length - 1]);
        setCurrentData(data.measurements[data.measurements.length - 1]);

        setAnimateTriger(1);
        setTimeout(function () {
          setAnimateTriger(2);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const RefreshTable = () => {
    setAllData([]);
    fetch("http://silgy.org:3030/api/measurements")
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

  const RefreshPlot = () => {
    setdataForPlot({ data: { datasets:[], labels:[] } });
    fetch(`http://silgy.org:3030/api/measurements?temponly=1`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const d = data[Object.keys(data)[1]];
        const labels = [];
        data.temperature.forEach((el) => {
          labels.push("");
        });

        setdataForPlot({
          labels: labels,
          datasets: [
            {
              label: "temperature",
              data: d,
              fill: false,
              backgroundColor: colorsForPlot[0],
              borderColor: colorsForPlotBorder[0],
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const RefreshPlotByForm = (value, name, id) => {
    setdataForPlot({ data: { datasets:[], labels:[] } });
    fetch(`http://silgy.org:3030/api/measurements?${value}=1`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const d = data[Object.keys(data)[1]];
        const labels = [];
        d.forEach((el) => {
          labels.push("");
        });

        setdataForPlot({
          labels: labels,
          datasets: [
            {
              label: name,
              data: d,
              fill: false,
              backgroundColor: colorsForPlot[id],
              borderColor: colorsForPlotBorder[id],
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
        </div>
      </div>

      <div
        id="boxes"
        className="content-box-container-second dataBox-box-container"
      >
        <div className="top-box">
          <img
            className="prevButton"
            onClick={PrevSide}
            src="/src/resources/img/arrow.svg"
          />
        </div>
        <DataBox
          animateTriger={animateTriger}
          id={1}
          title="temperature"
          value={`${Math.round(currentData.temperature * 100) / 100} °C`}
          imgPath="/src/resources/img/temperature.png"
        />
        <DataBox
          animateTriger={animateTriger}
          id={2}
          title="pressure"
          value={`${currentData.pressure} hPa`}
          imgPath="/src/resources/img/pressure.png"
        />
        <DataBox
          animateTriger={animateTriger}
          id={3}
          title="humidity"
          value={`${currentData.humidity} %`}
          imgPath="/src/resources/img/humidity.png"
        />
        <DataBox
          animateTriger={animateTriger}
          id={4}
          title="insolation"
          value={`${currentData.insolation} lux`}
          imgPath="/src/resources/img/sun.png"
        />

        <div className="bottom-box">
          <img
            className="nextButton"
            onClick={NextSide}
            src="/src/resources/img/arrow.svg"
          />
        </div>
        <button onClick={RefreshBoxes}> Refresh </button>
      </div>

      <div id="line-plot" className="content-box-container-third">
        <div className="top-box">
          <img
            className="prevButton"
            onClick={PrevSide}
            src="/src/resources/img/arrow.svg"
          />
        </div>
        <Plot data={dataForPlot} change = {RefreshPlotByForm}/>
        <div className="bottom-box">
          <img
            className="nextButton"
            onClick={NextSide}
            src="/src/resources/img/arrow.svg"
          />
        </div>
        <button onClick={RefreshPlot}> Refresh </button>
      </div>

      <div
        id="table"
        className="content-box-container-fourth table-box-container"
      >
        <div className="top-box">
          <img
            className="prevButton"
            onClick={PrevSide}
            src="/src/resources/img/arrow.svg"
          />
        </div>
        <Table data={allData} />

        <button onClick={RefreshTable}> Refresh </button>
      </div>
    </>
  );
};

ReactDOM.render(<App name="Your name" />, document.getElementById("app"));
