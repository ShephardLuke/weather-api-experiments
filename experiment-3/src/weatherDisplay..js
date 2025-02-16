import { useCallback } from "react"

export default function WeatherDisplay({location}) {

    const getWeatherData = useCallback(async () => {

    })

    return (
        <p>Weather data for {location.getName()}:</p>
    )
}