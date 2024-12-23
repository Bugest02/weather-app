import { Locations, countryCode } from "./definitions";
import { locationsWithCode } from "./definitions";

export default async function getCountryCode(data: Locations[]){
    
    if (data.length > 0){
        const locationsWithCode: locationsWithCode[] = data.map((location) => ({
            ...location,
            code: countryCode[location.country] || "" // Use "UNKNOWN" if no match is found
          })); 

          return locationsWithCode; 
    }

}

export async function getCurrentWeather(city: string){
    const apiKey = process.env.WEATHER_API;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }
    
        const data = await response.json();
    
        return data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data.');
      }
}

export async function getForecast(city: string){
    const apiKey = process.env.WEATHER_API;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;

    try {
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error(`Failed to fetch forecast data: ${response.statusText}`);
        }
    
        const data = await response.json();
    
        return data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data.');
      }
}
