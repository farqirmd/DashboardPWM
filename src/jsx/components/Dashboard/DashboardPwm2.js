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
import axios from 'axios';
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";

const AnalyticsDonut = loadable(() =>
	pMinDelay(import("./Dashboard/AnalyticsDonut"), 1000)
);

const url = "https://power-meter-nodejs.herokuapp.com/";

const Home = () => {
	let idPm = window.location.pathname.split('/')
	idPm = idPm[idPm.length - 1]; 

	const topic = encodeURI("showcase/pac3200/");

	const { changeBackground } = useContext(ThemeContext);
	const [dataTerbaru, setDataTerbaru] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dataHistoryChart, setDataHistoryChart] = useState([]);
	const [statusData, setStatusData] = useState();
	const [filterSensor, setFilterSensor] = useState('Tegangan');

	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
		axios.get(url + 'data-terbaru?topic=' + topic).then((response) => {
			setDataTerbaru(response.data.data)
		})
		axios.get(url + 'data-harian?topic=' + topic).then((response) => {
			setDataHistoryChart(response.data.data)
			setLoading(false)
			setStatusData("Harian")
		})
		return () => setLoading(false);
	}, []);
	const [value, onChange] = useState(new Date());

	const handleHarian = () => {
		setLoading(true)
		axios.get(url + 'data-harian?topic=' + topic).then((response) => {
			setDataHistoryChart(response.data.data)
			setLoading(false)
			setStatusData("Harian")
		})
	}

	const handleMingguan = () => {
		setLoading(true)
		axios.get(url + 'data-mingguan?topic=' + topic).then((response) => {
			setDataHistoryChart(response.data.data)
			setLoading(false)
			setStatusData("Mingguan")
		})
	}

	const handleBulanan = () => {
		setLoading(true)
		axios.get(url + 'data-bulanan?topic=' + topic).then((response) => {
			setDataHistoryChart(response.data.data)
			setLoading(false)
			setStatusData("Bulanan")
		})
	}

	const handleTegangan = () => {
		setLoading(true)
		setFilterSensor('Tegangan')
		setTimeout(() => {
			setLoading(false)
		}, 1000);
	}

	const handleArus = () => {
		setLoading(true)
		setFilterSensor('Arus')
		setTimeout(() => {
			setLoading(false)
		}, 1000);
	}

	const handleDaya = () => {
		setLoading(true)
		setFilterSensor('Daya')
		setTimeout(() => {
			setLoading(false)
		}, 1000);
	}

	const handleFrekuensi = () => {
		setLoading(true)
		setFilterSensor('Frekuensi')
		setTimeout(() => {
			setLoading(false)
		}, 1000);
	}

	if (loading){
		return(
			<div className='d-flex flex-column min-vh-100 justify-content-center align-items-center'>
				<Hypnosis width="200px" height="200px" color='#FC5A13' />
				<h1 className='mt-5' >Loading</h1>
			</div>
		)
	} else{
		return(
			<>
				<div className="row">
					{dataTerbaru.map((sensor, index) => {
						if (sensor._field === "V"){
							sensor._nama = "Tegangan"
							sensor._satuan = "Volt"
						} else if (sensor._field === "I"){
							sensor._nama = "Arus"
							sensor._satuan = "Ampere"
						} else if (sensor._field === "P"){
							sensor._nama = "Daya"
							sensor._satuan = "Watt"
						} else {
							sensor._nama = "Frekuensi"
							sensor._satuan = "Hertz"
						}
						return([
							<div key={index} className="col-xl-6">
								<div className="row">
									<div className="col-xl-12">
										<div className="card text-center">
											<div className="card-body">
												<h1>{sensor._nama}</h1>
												<div id="radialChart" className="radialChart">
													<RadialDount value={sensor._value} jenis={sensor._field}/>
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
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-header border-0 d-sm-flex d-block">
								<div className="me-auto mb-sm-0 mb-3">
									<h4 className="card-title mb-2">Statistik Data</h4>
									<span>Data {statusData}</span>
								</div>
								<div className="d-flex justify-content-between align-items-center">
									<div className="d-flex me-5">
										<p className="mb-0 me-2" style={{fontSize:'18px'}}>Region : <b style={{color:'#000'}}>{dataHistoryChart.length === 0 ? "Bandung" : dataHistoryChart[0].region}</b></p>
									</div>
									{/* <div className="d-flex me-3">
										<p className="mb-0 me-2" style={{fontSize:'18px'}}>Device : <b style={{color:'#000'}}>{dataHistoryChart.length === 0 ? "Tidak ada data" : dataHistoryChart[0].sensor_id}</b></p>
									</div> */}
									<div className="d-flex me-3 basic-dropdown">
										<Dropdown className='me-3'>
											<Dropdown.Toggle variant="primary">
												{filterSensor}
											</Dropdown.Toggle>
											<Dropdown.Menu className="dropdown-menu-right">
												<Dropdown.Item onClick={handleTegangan}>Tegangan</Dropdown.Item>
												<Dropdown.Item onClick={handleArus}>Arus</Dropdown.Item>
												<Dropdown.Item onClick={handleDaya}>Daya</Dropdown.Item>
												<Dropdown.Item onClick={handleFrekuensi}>Frekuensi</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
										<Dropdown>
											<Dropdown.Toggle variant="primary">
												{statusData}
											</Dropdown.Toggle>
											<Dropdown.Menu className="dropdown-menu-right">
												<Dropdown.Item onClick={handleHarian}>Harian</Dropdown.Item>
												<Dropdown.Item onClick={handleMingguan}>Mingguan</Dropdown.Item>
												<Dropdown.Item onClick={handleBulanan}>Bulanan</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</div>
								</div>
							</div>
							<div className="card-body">
								<div id="historyData" className="historyData">
									<HistoryChart value={dataHistoryChart} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}
export default Home;