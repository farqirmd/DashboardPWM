import React,{useState, useContext, useEffect} from 'react';
import { Link } from "react-router-dom";
import  {Dropdown} from 'react-bootstrap';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

///Images
import pic1 from './../../../images/avatar/1.jpg';
import pic2 from './../../../images/avatar/2.jpg';
import pic3 from './../../../images/avatar/3.jpg';
import pic4 from './../../../images/avatar/4.jpg';


//Import
import { ThemeContext } from "../../../context/ThemeContext";
import RadialDount from './Dashboard/RadialDount'; 
import ReservationChart from './Dashboard/ReservationChart'; 
import LatestCustomer from './Dashboard/LatestCustomer'; 
import axios from 'axios';

const AnalyticsDonut = loadable(() =>
	pMinDelay(import("./Dashboard/AnalyticsDonut"), 1000)
);

const url = "https://power-meter-nodejs.herokuapp.com/";

const Home = () => {
	const { changeBackground } = useContext(ThemeContext);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
		axios.get(url + 'latestValue').then((response) => {
			setData(response.data.data)
			setLoading(false)
		})
	}, []);
	const [value, onChange] = useState(new Date());

	if (loading){
		return(
			<div>
				<h1>Loading</h1>
			</div>
		)
	} else{
		return(
			<>
				<div className="row">
					{data.map((sensor, index) => {
						if (sensor._field === "voltage_avr"){
							sensor._satuan = "Volt"
						} else if (sensor._field === "current_avr"){
							sensor._satuan = "Ampere"
						} else if (sensor._field === "power_avr"){
							sensor._satuan = "Watt"
						} else {
							sensor._satuan = "Hertz"
						}
						return([
							<div key={index} className="col-xl-6">
								<div className="row">
									<div className="col-xl-12">
										<div className="card text-center">
											<div className="card-body">
												<h1>{sensor._field}</h1>
												<div id="radialChart" className="radialChart">
													<RadialDount value={sensor._value}/>
												</div>
												<h2>{sensor._value}</h2>
												<span className="fs-16 text-black">{sensor._satuan}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						])
					})}
				</div>
			</>
		)
	}
}
export default Home;