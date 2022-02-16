import React from "react";
import ReactApexChart from "react-apexcharts";

class RadialDount extends React.Component {
	constructor(props) {
		super(props);
		let nilaiChart = props.value;
		if (props.jenis === 'V'){
			nilaiChart = (nilaiChart / 1000) * 100;
		}
		else if (props.jenis === 'I'){
			nilaiChart = (nilaiChart / 200) * 100;
		}
		else if (props.jenis === 'P'){
			nilaiChart = (nilaiChart / 20000) * 100;
		} 
		else{
			nilaiChart = (nilaiChart / 50) * 100;
		}

		this.state = {
			series: [nilaiChart],
			options: {
				chart: {
					type: 'radialBar',
					height: 150,
					sparkline: {
						enabled: true
					}
				},
				
				colors:['var(--primary)'],
				plotOptions: {
					radialBar: {
						hollow: {
							size: '35%',
						},
						dataLabels: {
							show: false,
						}
					},
				},
				labels: [''],
			
			},
		};
	}
	render() {
		return (
			<div id="chart" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="radialBar"
				  height={150}
				/>
			</div>
		);
	}
}

export default RadialDount;