import { getForecast } from "@/app/lib/actions";
import clsx from "clsx"; 
import { Forecast, Hour } from "@/app/lib/definitions";
import React from "react";

export default async function WeatherCard({
    url,
    temp_unit,
  }: {
    url: string;
    temp_unit: string;
  }) {
    const data: Record<string, any> = await getForecast(url);
  
    const current_data = data.current;
    const forecast_data = data.forecast.forecastday;
    const location = data.location.name;
  
    return (
      <div className="w-full max-w-6xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-3 px-4">
        {/* Main content */}
        <div className="col-span-1 lg:col-span-2 space-y-4 w-full">
          <TodayCard
            temp_unit={temp_unit}
            data={current_data}
            location={location}
          />
          <DailyForecast data={forecast_data[0].hour} />
          <ConditionsCard data={current_data} unit={temp_unit} />
        </div>
        {/* Sidebar */}
        <div className="col-span-1 w-full">
          <WeeklyForecast temp_unit={temp_unit} data={forecast_data} />
        </div>
      </div>
    );
  }
  
export async function TodayCard({temp_unit, data, location}: {temp_unit: string, data: Record<string, any>, location: string}){

    const is_day = data.is_day; 
    const description = data.condition.text; 
    const image = data.condition.icon; 
    let temp : number = 0; 
    let wind = data.wind_kph; 
    let precip = data.precip.mm; 
    let feel = data.feelslike_c; 

    if (temp_unit == "F") {
        temp = data.temp_f; 
        wind = data.wind_mph; 
        precip = data.precip_in; 
        feel = data.feelslike_f; 
    }

    
    return(
        <div className={clsx("grid w-full px-8 py-5 grid-cols-3 gap-10 rounded-lg", {
            "bg-sky-800" : is_day === 0, 
            "bg-sky-200" : is_day === 1
        })}>
            <div className="relative col-span-2">
                <h1 className={clsx("font-bold text-2xl tracking-wide", {
                    "text-white" : is_day === 0
                })}>{location}</h1>
                <p className="text-gray-400">{description}</p>
                <p className={clsx("bottom-0 left-0 text-[46px] font-bold mt-5", {
                    "text-white" : is_day === 0
                })}>{Math.round(temp)}°</p>
            </div>

            <div className="flex items-center justify-center">
                <img className="object-none w-35 h-35 object-center" src={image} alt="Centered Image" />
            </div>
        </div>
    )
}

export async function WeeklyForecast({temp_unit, data}: {temp_unit: string, data: Forecast}){
    const dates : string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 

    return(
        <div className="w-full h-full bg-white p-8 rounded-lg">
           <h3 className="mb-3 font-bold text-xs text-gray-400">FORECAST</h3> 
           <div className="grid rows-auto h-full divide-y">
                {data.map((date, index) => {
                    const day: Date = new Date(date.date);
                    let day_date: string = "Today";  
                    let min_temp: number = Math.round(date.day.mintemp_c); 
                    let max_temp: number = Math.round(date.day.maxtemp_c); 

                    if (index != 0){
                        day_date = dates[day.getDay()]; 
                    }

                    if (temp_unit === "F"){
                        min_temp = date.day.mintemp_f; 
                        max_temp = date.day.maxtemp_f; 
                    }

                    return(
                        <ForecastWeekCard key={date.date} day={day_date} image={date.day.condition.icon} description={date.day.condition.text} min_temp={min_temp} max_temp={max_temp}/>
                    )
                })}
           </div>
        </div>
    )
}

export async function ForecastWeekCard({day, image, description, min_temp, max_temp}:{day: string, image: string, description: string, min_temp: number, max_temp: number}){
    return(
        <div className="grid grid-cols-4 gap-4 items-center">
            <div className="col-span-1 text-xs font-medium text-gray-400">
                {day}
            </div>
            <div className="flex col-span-2 flex-row items-center">
                <img src={image} alt={`Forecast for ${day}`} className="h-8 w-8 mr-4" />
                <p className="text-xs font-semibold">{description}</p>
            </div>
            <div className="col-span-1">
            <p className="text-xs font-semibold text-gray-400"><span className="text-black">{min_temp}°</span>/{max_temp}°</p>
            </div>
        </div>
    )
}

export async function DailyForecast({data} : {data: Hour[]}){
    return(
        <div className="w-full bg-white p-8 rounded-lg">
            <p className="mb-3 font-bold text-xs text-gray-400">TODAY"S FORECAST</p>
            <div className="w-full flex overflow-x-scroll scrollbar-hide whitespace-nowrap divide-x divide-solid">
                {data.map((hour, index) => {
                    const string_date : string = hour.time;
                    string_date.replace(" ", "T"); 
                    const date : Date = new Date(string_date); 

                    return(
                        <ForecastDayCard key={index} hour={date.getHours()} image={hour.condition.icon} temp={Math.round(hour.temp_c)}/>
                    )
                }
                )}
            </div>
        </div>
    )
}

export function ForecastDayCard({hour, image, temp} : {hour: number, image: string, temp: number}){
    return(
        <div className="h-full place-items-center font-bold text-sm px-3 lg:px-5 space-y-2">
            {hour < 10 && (<p className="text-gray-400">0{hour}:00</p>)}
            {hour >= 10 && (<p className="text-gray-400">{hour}:00</p>)}
            <img src={image} className="h-8 w-8"/>
            <p className="inset-x-0 bottom-0 font-bold text-xl">{temp}°</p>
        </div>
    )
}

export async function ConditionsCard({data, unit}:{data:Record<string, any>, unit:string}){
    let temp_feel:number = data.feelslike_c; 
    let wind:number = data.wind_kph; 
    const uv: number = data.uv; 
    const humidity : number = data.humidity; 

    if (unit === "F"){
        temp_feel = data.feelslike_f; 
        wind = data.wind_mph; 
    }    

    return(
        <div className="w-full bg-white p-8 rounded-lg">
            <h3 className="mb-3 font-bold text-xs text-gray-400">AIR CONDITIONS</h3>
            <div className="w-full bg-white rounded-lg grid grid-cols-2 gap-y-3">
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                <img
                    src="temp_icon.svg"
                    alt="Weather icon"
                    className="w-6 h-6" 
                />
                <p className="font-medium text-sm text-gray-400">Real Feel</p>
                <p className="font-bold text-xl lg:text-3xl col-start-2">{Math.round(temp_feel)}°</p>
            </div>

            <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                <img
                    src="wind_icon.svg"
                    alt="Weather icon"
                    className="w-6 h-6" 
                />
                <p className="font-medium text-sm text-gray-400">Wind</p>
                <p className="font-bold text-xl lg:text-3xl col-start-2">
                    {wind}
                    {unit === "C" && (<span> km/h</span>)}
                    {unit === "F" && (<span> mi/h</span>)}
                </p>
            </div>

            <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                <img
                    src="humidity_icon.svg"
                    alt="Weather icon"
                    className="w-6 h-6" 
                />
                <p className="font-medium text-sm text-gray-400">Humidity</p>
                <p className="font-bold text-xl lg:text-3xl col-start-2">{humidity}</p>
            </div>

            <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                <img
                    src="uv_icon.svg"
                    alt="Weather icon"
                    className="w-6 h-6" 
                />
                <p className="font-medium text-sm text-gray-400">UV Index</p>
                <p className="font-bold text-xl lg:text-3xl col-start-2">{uv}</p>
            </div>
            </div>
        </div>
    )
}