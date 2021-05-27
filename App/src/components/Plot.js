import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  legend: {
    onClick: function (e) {
      e.stopPropagation();
    },
  },
  maintainAspectRatio: false,
};


const Plot = ({ data, change }) => {

  const [measurements, setMeasurements] = useState(1)
  const format = [  {"name": "temperature", "value" : "temponly"},
                    {"name": "humidity", "value" : "humonly"},
                    {"name": "insolation", "value" : "insonly"},
                    {"name": "pressure", "value" : "pressonly"}, ]
  useEffect(()=>{

    change(format[measurements].value, format[measurements].name , measurements)
  }, [measurements])

  return (
    <>
      <div className="form-back">
        <div>
          <label htmlFor="measurements">Choose a data to plot:</label>
          <select id="measurements" value = {measurements} onChange = {e => setMeasurements(e.target.value)} >
            <option value={0}> temperature</option>
            <option value={1}> humidity</option>
            <option value={2}> insolation</option>
            <option value={3}> pressure</option>
          </select>
        </div>
      </div>
      <div className="line-back">
        <Line height={null} width={null} data={(data==undefined)?{ data: { datasets:[], labels:[] } }:data} options={options} />
      </div>
    </>
  );
};

export default Plot;
