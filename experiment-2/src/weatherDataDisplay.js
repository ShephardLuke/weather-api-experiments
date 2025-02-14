export default function WeatherDataDisplay({weather}) {
    const main = weather.main
    const weatherDetails = weather.weather[0]
    return (
        <>
            <h2>Temperature: {weather.main.temp}°C</h2>
            <h2>Feels like: {weather.main.feels_like}°C</h2>
            <div style={{display: "flex", alignItems: "center"}}>
                <h2>Current weather: {weatherDetails.main}</h2>
                <img alt={weatherDetails.main + " icon"} src={"https://openweathermap.org/img/wn/" + weatherDetails.icon + "@2x.png"}/>
            </div>
            <p>Description: {weatherDetails.description}</p>
        </>
    )
}