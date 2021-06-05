import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
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
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = ({m}) => {
  return(
  <>
    <Doughnut data={(m == 0)?data:m} height={0} width={0} options={{events: []}}/>
  </>
  )
  };

export default DoughnutChart;