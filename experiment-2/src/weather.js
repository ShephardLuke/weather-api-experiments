import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import WeatherDataDisplay from "./weatherDataDisplay";


export default function Weather() {
    const [weatherData, setWeatherData] = useState(null)

    const fetchData = useCallback(async () => { // Fetches the data
        
        function generateURL(lat, lon, units="metric") { // Returns URL for given lat, lon
            const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
            const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
        
            let url = baseURL
            url = appendToUrl(url, "lat", lat, false)
            url = appendToUrl(url, "lon", lon, false)
            url = appendToUrl(url, "units", units, false)
            url = appendToUrl(url, "appId", API_KEY, true)
            
            return url
            
        }
        
        function appendToUrl(url, key, value, end=true) { // Add a parameter to url
            const newUrl = url + key + "=" + value + (end ? "" : "&")

            return newUrl
        }

        async function getWeatherData() { // Call api and return set the response to the data
            try {
                let url  = generateURL(51.52477, -0.05236)
                const response = await axios.get(url);
                setWeatherData(response.data)
                console.log("API CALL", response.data)
                
            } catch (err) {
                console.error(err);
            }
        }

        getWeatherData()

    }, [])

    useEffect(() => { // Runs once on first render
        fetchData()
    }, [fetchData])

    function refreshData() { // Get updated data
        fetchData();
    }

    return (
        <>
        <h1>Current weather data for QMUL</h1>
        {
            weatherData ?
            <WeatherDataDisplay weather={weatherData}/>
            :
            "No data found."
        }
        <button onClick={refreshData}>Refresh</button>
        </>
    )
}