export default function WeatherDisplay({location, data, addStoredLocation, removedStoredLocation}) {

    let visibilityLabel = `Good (>=10000m)`;
    if (data.visibility < 3000) {
        visibilityLabel = `Poor (${data.visibility}m)`
    } else if (data.visibility < 10000) {
        visibilityLabel = `Moderate (${data.visibility}m)`
    }

    return (
        <div style={{textAlign: "center"}}>
            <h1>Weather data for {location.getName()}:</h1>

            <div>
                <img alt={data.weather[0].main} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}/>
                <h2>{data.weather[0].main} ({data.weather[0].description})</h2>
            </div>

            <div style={{display: "flex", justifyContent: "space-around"}}>
                <p>Temperature: {data.main.temp}°C</p>
                <p>Feels like: {data.main.feels_like}°C</p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Visibilty: {visibilityLabel}</p>
            </div>

            <p><em>This data is from {new Date(data.dt * 1000).toString()}.</em></p>
            
            <button hidden={location.isSaved()} onClick={addStoredLocation}>Save {location.getName()}</button>
            <button hidden={!location.isSaved()} onClick={removedStoredLocation}>Remove {location.getName()}</button>
            <hr/>
        </div>
    )
}