import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import WeatherDataDisplay from "./weatherDataDisplay";


export default function Weather() {
    let weatherCalled = false

    const [weatherData, setWeatherData] = useState(null)

    const fetchData = useCallback(async () => {
        try {
            
            if (!weatherCalled) {
                
                let url  = generateURL(51.52477, -0.05236)
                const response = await axios.get(url);
                setWeatherData(response.data)
                console.log("a", response.data)
                weatherCalled = true
            }
            
        } catch (err) {
            console.error(err);
        }
    }, [weatherData])

    useEffect(() => {
        fetchData();
    }, [fetchData])

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


    return (
        <>
        <h1>Current weather data for QMUL</h1>
        {
            weatherData ?
            <WeatherDataDisplay main={weatherData.main}/>
            :
            "No data found."
        }
        </>
    )
}

class WeatherData {
    temperature = 0;

    constructor(temperature) {
        this.temperature = temperature 
    }

    getTemperature() {
        return this.temperature
    }
}

