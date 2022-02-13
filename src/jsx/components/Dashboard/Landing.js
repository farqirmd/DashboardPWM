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
import HistoryChart from './Dashboard/HistoryChart'; 
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
			<div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
				<div className="d-flex justify-content-center h-100 align-items-center">
					<h1>Hello</h1>
				</div>
			</div>
		</>
	)
}
export default Home;