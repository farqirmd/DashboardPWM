import React from "react";
import ReactApexChart from "react-apexcharts";

class RadialDount extends React.Component {
	constructor(props) {
		super(props);
		let nilaiChart = props.value;
		if (nilaiChart >= 10000){
			nilaiChart = nilaiChart / 1000;
		}
		else if (nilaiChart >= 1000){
			nilaiChart = nilaiChart / 100;
		}
		else if (nilaiChart >= 100){
			nilaiChart = nilaiChart / 10;
		}
		console.log(props)

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