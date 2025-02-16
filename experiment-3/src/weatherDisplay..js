export default function WeatherDisplay({locationName, data}) {

    let visibilityLabel = "Good";
    if (data.visibility < 3000) {
        visibilityLabel = "Poor"
    } else {
        visibilityLabel = "Moderate"
    }

    return (
        <div style={{textAlign: "center"}}>
            <h1>Weather data for {locationName}:</h1>
            <div>
                <img alt={data.weather[0].main} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}/>
                <h2>{data.weather[0].main} ({data.weather[0].description})</h2>
            </div>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <p>Temperature: {data.main.temp}°C</p>
                <p>Feels like: {data.main.feels_like}°C</p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Visibilty: {visibilityLabel} ({data.visibility}km)</p>
            </div>
            <p><em>Last updated: {new Date(data.dt * 1000).toString()}</em></p>
            <hr/>
        </div>
    )
}