import React, { useEffect, useState } from 'react'
import {Line} from 'react-chartjs-2';


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
  maintainAspectRatio: false
}

const Plot = ({data}) =>
{

  const [dataState, setDataState] = useState()

  useEffect(()=>{
    console.log(data)
    const datatoplot = []
    const labels = []
    data.forEach(element => {
      datatoplot.push(element.measurmentValue)
      labels.push(element.measurmentTime)
    });

  console.log(datatoplot)
setDataState(
    {
      labels: labels,
      datasets: [
        {
          label: '# of Votes',
          data: datatoplot,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    }
)


  },[])



  return(<Line  height={null} width={null} data={dataState} options={options} />)
 
}

export default Plot