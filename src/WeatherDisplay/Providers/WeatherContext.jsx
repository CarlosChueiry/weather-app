import React, { createContext, useContext, useEffect, useState } from 'react';

export const WeatherProvider = createContext({});

export default function WeatherContext(props) {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});
	const [date, setDate] = useState('');
	const [weatherIcon, setWeatherIcon] = useState('');
	const API = {
		// Get your API key on https://openweathermap.org/
		// Pegue sua chave de API em https://openweathermap.org/
		key: '',
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
		if (e.key === 'Enter' || e.type === 'click') {
			fetch(`${API.base}/weather?q=${query}&units=metric&appid=${API.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery('');
					console.log(result);
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
			}}
		>
			{props.children}
		</WeatherProvider.Provider>
	);
}

export const useWeather = () => useContext(WeatherProvider);
