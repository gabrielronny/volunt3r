import React from 'react';
import { Line } from 'react-chartjs-2';

const LineAcompanhamentoEventoTempo = () => {

  const state = {
    labels: ['FANTASMA', 'TIMIDO', 'AMADOR',
      'CASUAL', 'ATIVO', 'ENGAJADO'],
    datasets: [
      {
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        data: [102, 89, 157, 248, 184, 397]
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    }
  }

  return (

    <Line
      data={state}
      options={options}
    />

  );

}

export default LineAcompanhamentoEventoTempo;