import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutDivisaoEngajamento = (props) => {

	const state = {
		chartData: {
			labels: props.labels,
			datasets: [{
				data: props.data,
				backgroundColor: [
					'rgb(255, 99, 86)',
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)',
					'rgb(54, 205, 86)',
				]
			}],
		}
	}

	const options = {
		plugins: {
			datalabels: {
				display: true,
				align: 'bottom',
				backgroundColor: '#ccc',
				borderRadius: 3,
				font: {
				  size: 18,
				}
			},
			legend: {
				display: true,
			},
		}
	}

	return (
		<Doughnut data={state.chartData} options={options} />
	);
}

export default DoughnutDivisaoEngajamento;