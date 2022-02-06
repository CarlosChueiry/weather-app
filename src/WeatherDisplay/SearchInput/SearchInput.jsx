import React from 'react';
import { useWeather } from '../Providers/WeatherContext';
import './SearchInput.scss';

export default function WeatherDisplay() {
	const { query, setQuery, search, weather, errorMessage } = useWeather();

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};

	return (
		<>
			<div
				className={
					weather.name !== undefined
						? 'search-area search-results'
						: 'search-area'
				}
			>
				<div className="search-box">
					<input
						type="text"
						className="search-box-input"
						placeholder="Pesquisar..."
						onChange={handleInputChange}
						value={query}
						onKeyPress={search}
					/>
					<button onClick={search} className="search-box-button">
						<i className="material-icons">my_location</i>
					</button>
				</div>
				<span
					className={
						errorMessage !== '' ? 'search-error error-display' : 'search-error'
					}
				>
					<i className="material-icons">error_outline</i>
					{errorMessage}
				</span>
			</div>
		</>
	);
}
