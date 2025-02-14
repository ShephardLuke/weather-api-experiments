export default function WeatherData({location}) {
    console.log(process.env.REACT_APP_WEATHER_API_KEY)
    console.log(process.env.NODE_ENV)
    return (
        <p>Weather data for {location}:</p>
    )
}