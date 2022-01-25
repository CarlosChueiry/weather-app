import React from 'react';
import WeatherContext from './Providers/WeatherContext';
import SearchInput from './SearchInput/SearchInput';
import WeatherBox from './WeatherBox/WeatherBox';
import './WeatherDisplay.scss';

function WeatherDisplay() {
	return (
		<WeatherContext>
			<div className="weather">
				<h1 className="weather-header">My React Weather App</h1>
				<SearchInput />
				<WeatherBox />
			</div>
		</WeatherContext>
	);
}

export default WeatherDisplay;
