import { useState } from "react"
import WeatherData from "./weatherData."

export default function WeatherCheck() {
    const [locations, setLocations] = useState([])

    const weatherData = locations.map(location => <WeatherData key={location} location={location}/>)

    function cityInput() {
        const userInput = document.getElementById("cityInput").value.toLowerCase()
        if (locations.includes(userInput)) {
            return false;
        }
        const newLocations = [...locations, userInput]
        setLocations(newLocations)
    }

    return (
        <div>
            <p>Weather Check</p>
            <div>
                <label htmlFor="cityInput">Enter city:</label>
                <input type="text" id="cityInput"/>   
                <button onClick={cityInput}>Submit</button>             
            </div>
            {weatherData}
        </div>
    )
}