import React from "react";
import ReactApexChart from "react-apexcharts";


class HistoryChart extends React.Component {
	voltage = [];
	current = [];
	power = [];
	freq = [];
	time = [];
	filterData = [];
	filterWarna = '';
	temp = '';

	constructor(props) {
		super(props);
		console.log(props.value)
		props.value.map((sensor, index) => {
			if (sensor._field === "V"){
				this.voltage = this.voltage.concat([sensor._value.toFixed(2)])
			} else if (sensor._field === "I"){
				this.current = this.current.concat([sensor._value.toFixed(2)])
			} else if (sensor._field === "P"){
				this.power = this.power.concat([sensor._value.toFixed(2)])
			} else {
				this.freq = this.freq.concat([sensor._value.toFixed(2)])
			}
			// console.log(sensor._time)
			this.temp = new Date(sensor._time).toLocaleString();
			console.log(this.temp)
			// console.log(this.temp)
			// sensor._time = this.temp.toLocaleTimeString()
			this.time = this.time.concat(this.temp);
			// this.time = this.time.concat([this.temp]);
		});
		this.time = [...new Set(this.time)];
		// console.log(this.time)

		if (props.filter === 'Tegangan'){
			this.filterData = this.voltage
			this.filterWarna = "#FF8849"
		}
		else if (props.filter === 'Arus'){
			this.filterData = this.current
			this.filterWarna = "#3DB7E4"
		}
		else if (props.filter === 'Daya'){
			this.filterData = this.power
			this.filterWarna = "#69BE28"
		}
		else if (props.filter === 'Frekuensi'){
			this.filterData = this.freq
			this.filterWarna = "#6d346a"
		}

		this.state = {
			series: [{
			  name: props.filter,
			  data: this.filterData
			}],
			options: {
				chart: {
					height: 400,
					type:'area',
					toolbar:{
						show:false
					}
				},
				colors:[this.filterWarna],
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
					// type: 'datetime',
					// range: 10,
					categories: this.time,
					labels:{
						// formatter: function(value, timestamp, opts) {
						// 	return value
						// },
						// style: {
						// 	colors: '#787878',
						// 	fontSize: '13px',
						// 	fontFamily: 'Poppins',
						// 	fontWeight: 400
						
						// },
						// trim: true,
						hideOverlappingLabels: true,
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