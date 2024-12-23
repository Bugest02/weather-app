'use client'; 

import { useState } from 'react';

export default function WeatherPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`/api/cities?city=${city}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  console.log(weather); 

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
    </div>
  );
}