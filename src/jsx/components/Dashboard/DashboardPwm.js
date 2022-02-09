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

const AnalyticsDonut = loadable(() =>
	pMinDelay(import("./Dashboard/AnalyticsDonut"), 1000)
);


const Home = () => {
	const { changeBackground } = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
	}, []);
	const [value, onChange] = useState(new Date());
	return(
		<>
			<div className="row">
				<div className="col-xl-6">
					<div className="row">
						<div className="col-xl-12">
							<div className="card text-center">
								<div className="card-body">
                                    <h1>Voltage Average</h1>
									<div id="radialChart" className="radialChart">
										<RadialDount value={174}/>
									</div>
									<h2>174</h2>
									<span className="fs-16 text-black">Volt</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6">
					<div className="row">
						<div className="col-xl-12">
                        <div className="card text-center">
								<div className="card-body">
                                    <h1>Current</h1>
									<div id="radialChart" className="radialChart">
										<RadialDount value={174}/>
									</div>
									<h2>70</h2>
									<span className="fs-16 text-black">Ampere</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
            <div className="row">
				<div className="col-xl-6">
					<div className="row">
						<div className="col-xl-12">
							<div className="card text-center">
								<div className="card-body">
                                    <h1>Power</h1>
									<div id="radialChart" className="radialChart">
										<RadialDount value={174}/>
									</div>
									<h2>80</h2>
									<span className="fs-16 text-black">Watt</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6">
					<div className="row">
						<div className="col-xl-12">
                        <div className="card text-center">
								<div className="card-body">
                                    <h1>Frequency</h1>
									<div id="radialChart" className="radialChart">
										<RadialDount value={174}/>
									</div>
									<h2>118</h2>
									<span className="fs-16 text-black">Hertz</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Home;