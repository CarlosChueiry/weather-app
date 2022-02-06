import React, { createContext, useContext, useEffect, useState } from 'react';

export const WeatherProvider = createContext({});

export default function WeatherContext(props) {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});
	const [date, setDate] = useState('');
	const [weatherIcon, setWeatherIcon] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const API = {
		key: process.env.REACT_APP_WEATHER_KEY,
		base: 'https://api.openweathermap.org/data/2.5',
	};

	useEffect(() => {
		const currentDate = new Date();
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};
		setDate(currentDate.toLocaleDateString('en-US', options));
	}, []);

	useEffect(() => {
		if (weather.name === undefined) return;
		setWeatherIcon(
			`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
		);
	}, [weather]);

	const search = (e) => {
		errorMessage !== '' && setErrorMessage('');
		if (e.key === 'Enter' || e.type === 'click') {
			if (query === '') {
				setErrorMessage('Enter a city name');
				setWeather({});
				return;
			}
			fetch(`${API.base}/weather?q=${query}&units=metric&appid=${API.key}`)
				.then((res) => res.json())
				.then((result) => {
					if (result.cod === '404') {
						setErrorMessage('City not found');
						setWeather({});
					} else {
						setErrorMessage('');
						setWeather(result);
						console.log(result);
					}
					setQuery('');
				});
		}
	};

	return (
		<WeatherProvider.Provider
			value={{
				query,
				setQuery,
				weather,
				setWeather,
				search,
				date,
				weatherIcon,
				errorMessage,
			}}
		>
			{props.children}
		</WeatherProvider.Provider>
	);
}

export const useWeather = () => useContext(WeatherProvider);
