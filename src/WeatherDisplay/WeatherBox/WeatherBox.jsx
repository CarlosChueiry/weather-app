import React from 'react';
import './WeatherBox.scss';
import { useWeather } from '../Providers/WeatherContext';

export default function WeatherBox() {
	const { weather, date, weatherIcon } = useWeather();

	return (
		<>
			<div
				className={
					weather.name !== undefined ? 'weather-box display-box' : 'weather-box'
				}
			>
				{weather.name === undefined ? (
					''
				) : (
					<>
						<div className="weather-left">
							<img className="weather-left-icon" src={weatherIcon} alt=""></img>
						</div>
						<div className="weather-right">
							<h5 className="weather-right-date">{date}</h5>
							<h1 className="weather-right-location">
								{weather.name}, {weather.sys.country}
							</h1>
							<h5 className="weather-right-temperature">
								Temperature: {weather.main.temp}
							</h5>
							<h5 className="weather-right-weather">
								{weather.weather[0].main}
							</h5>
						</div>
					</>
				)}
			</div>
		</>
	);
}
