import axios from "axios";
import { useEffect, useState } from "react"
import WeatherDataDisplay from "./weatherDataDisplay";


export default function Weather() {
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => { // Fetches the data once
        
        function generateURL(lat, lon, units="metric") {
            const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
            const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
        
            let url = baseURL
            url = appendToUrl(url, "lat", lat, false)
            url = appendToUrl(url, "lon", lon, false)
            url = appendToUrl(url, "units", units, false)
            url = appendToUrl(url, "appId", API_KEY, true)
            
            return url
            
        }
        
        function appendToUrl(url, key, value, end=true) {
            const newUrl = url + key + "=" + value + (end ? "" : "&")

            return newUrl
        }

        async function getWeatherData() {
            try {
                let url  = generateURL(51.52477, -0.05236)
                const response = await axios.get(url);
                setWeatherData(response.data)
                console.log("a", response.data)
                
            } catch (err) {
                console.error(err);
            }
        }

        getWeatherData()

    }, [])


    return (
        <>
        <h1>Current weather data for QMUL</h1>
        {
            weatherData ?
            <WeatherDataDisplay weather={weatherData}/>
            :
            "No data found."
        }
        </>
    )
}