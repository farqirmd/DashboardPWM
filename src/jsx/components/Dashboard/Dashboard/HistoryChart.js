import React from "react";
import ReactApexChart from "react-apexcharts";


class HistoryChart extends React.Component {
	voltage = [];
	current = [];
	power = [];
	freq = [];
	time = [];

	constructor(props) {
		super(props);
		// console.log(props.value);
		props.value.map((sensor, index) => {
			console.log(sensor)
			if (sensor._field === "V"){
				this.voltage = this.voltage.concat([sensor._value / 100])
			} else if (sensor._field === "I"){
				this.current = this.current.concat([sensor._value / 100])
			} else if (sensor._field === "P"){
				this.power = this.power.concat([sensor._value / 1000])
			} else {
				this.freq = this.freq.concat([sensor._value])
				// console.log(this.freq)
			}
			this.time = this.time.concat([sensor._time.slice(11, 19)]);
		});
		this.time = [...new Set(this.time)];

		this.state = {
			series: [{
			  name: 'voltage',
			  data: this.voltage
			}, {
			  name: 'current',
			  data: this.current
			}, {
				name: 'power',
				data: this.power
			}, {
				name: 'freq',
				data: this.freq
			}],
			options: {
				chart: {
					height: 400,
					type:'area',
					toolbar:{
						show:false
					}
				},
				colors:["#FF8849","#3DB7E4","#69BE28","#6d346a",],
				dataLabels: {
				  enabled: false
				},
				stroke: {
					width:6,
					curve: 'smooth',
				},
				legend:{
					show:false
				},
				grid:{
					borderColor: '#EBEBEB',
					strokeDashArray: 6,
				},
				markers:{
					strokeWidth: 6,
					 hover: {
					  size: 15,
					}
				},
				yaxis: {
					labels: {
						offsetX:-12,
						style: {
							colors: '#787878',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 400
							
						}
					},
				},
				xaxis: {
					categories: this.time,
					labels:{
						style: {
							colors: '#787878',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 400
						
						},
					}
				},
				fill:{
					type:"solid",
					opacity:0.1
				},
				tooltip: {
				  x: {
					format: 'dd/MM/yy HH:mm'
				  },
				},
			},
		};
	}
	render() {
		return (
			<div id="chart" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="area"
				  height={400}
				/>
			</div>
		);
	}
}

export default HistoryChart;