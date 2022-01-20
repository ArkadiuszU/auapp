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

const format = [  {"name": "temperature", "value" : "temponly", id:0},
                    {"name": "humidity", "value" : "humonly" , id:1},
                    {"name": "insolation", "value" : "insonly" , id:2},
                    {"name": "pressure", "value" : "pressonly" , id:3},
                    {"name": "temp_out", "value" : "temp_outonly" , id:4} ]

const Plot = ({ data, change, triger }) => {

  const [measurements, setMeasurements] = useState(0)
  const [created, setCreated] = useState({from:"", to:""})
  const [plotCreated, SetPlotCreated] = useState({from:"", to:""})
  const [mounted, SetMounted] = useState(false)
  

  useEffect(()=>{

    fetch("http://silgy.org:3030/api/measurements?od=created&firstonly=1", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache'})
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      const c_to = data.measurements[0].created.replace(" ", "T").slice(0,-3);
      setCreated(prev => { return {...prev , to: c_to }});
      SetPlotCreated(prev => { return {...prev , to: c_to }});
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    
    fetch("http://silgy.org:3030/api/measurements?o=created&firstonly=1", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache'})
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      const c_from = data.measurements[0].created.replace(" ", "T").slice(0,-3);
      setCreated(prev => { return {...prev , from: c_from }});
      SetPlotCreated((prev => { return {...prev , from: c_from }}));
    })
    .catch((error) => {
      console.error("Error:", error);
    }); 


  }, [])


  useEffect(()=>{

    if(!(plotCreated.from==""||plotCreated.to=="" ))
    {
      change({...format[measurements], created: plotCreated})
    }

  }, [measurements])

  useEffect(()=>{

    if(!(plotCreated.from=="" || plotCreated.to=="" || mounted) )
    {
      change({...format[measurements], created: plotCreated})
      SetMounted(true);
    }

  }, [plotCreated])

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
            <option value={4}> temperature_out</option>
          </select>

          <label htmlFor="start-time">Choose a time for start:</label>
          <input type="datetime-local"
              name="start-time" value={plotCreated.from}
              min={created.from} max={plotCreated.to}
              onChange = {e =>  {e.persist(); SetPlotCreated(prev => { return {...prev , from: e.target.value }})}}
              onBlur={e => {
                const date = new Date(e.target.value)
                const dateMax = new Date(plotCreated.to)
                if(date>dateMax)
                {
                  e.target.value = plotCreated.to
                }
                change({...format[measurements], created: plotCreated})
                }}/>
            

          <label htmlFor="end-time">and end of measurement:</label>
          <input type="datetime-local"
              name="end-time" value={plotCreated.to}
              min={plotCreated.from} max={created.to}
              onChange = {e =>  {e.persist(); SetPlotCreated(prev => { return {...prev , to: e.target.value }})}}
              onBlur={e => {
                            const date = new Date(e.target.value)
                            const dateMin = new Date(plotCreated.from)
                            if(date<dateMin)
                            {
                              e.target.value = plotCreated.from
                            }
                            change({...format[measurements], created: plotCreated})
                            }}/>


        </div>
      </div>
      <div className="line-back">
        <Line height={null} width={null} data={(data==undefined)?{ data: { datasets:[], labels:[] } }:data} options={options} />
      </div>
    </>
  );
};

export default Plot;
