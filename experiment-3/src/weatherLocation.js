import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import WeatherDisplay from "./weatherDisplay..js"

export default function WeatherLocation({location}) {

    const [weatherData, setWeatherData] = useState(null)

    const getWeatherData = useCallback(async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.getLatitude()}&lon=${location.getLongitude()}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        console.log(url)
        const response = await axios.get(url)

        console.log(response)

        setWeatherData(response.data)

    }, [location])

    useEffect(() => {
        getWeatherData()
    }, [])

    return (
        weatherData ? <WeatherDisplay locationName={location.getName()} data={weatherData}/> : "Getting data..."
    )
}