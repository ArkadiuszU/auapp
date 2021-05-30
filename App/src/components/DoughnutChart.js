import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Komfort'],
  datasets: [
    {
      label: '# of Votes',
      data: [80,20],
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

const DoughnutChart = () => (
  <>
    <Doughnut data={data} height={0} width={0} options={{events: []}}/>
  </>
);

export default DoughnutChart;