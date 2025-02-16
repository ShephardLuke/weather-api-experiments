import { useCallback, useState } from "react"
import axios from "axios"
import WeatherLocation from "./weatherLocation.js"

export default function WeatherCheck() {
    const [location, setLocation] = useState(null)
    const [feedbackMessage, setFeedbackMessage] = useState(null)

    const getLocation = useCallback(async () => {

        async function getCoordinatesFromName(name) { // Checks name against Geocoding API, sets location if its found
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${name},GB&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
            const response = await axios.get(url)
                .catch(function (error) {
                    console.error(error)
                });    

            if (!response) {
                setFeedbackMessage("An error occured.") 
                setLocation(null)
                return false;
            }

            if (response.data.length > 0) {
                const place = response.data[0]
                if (location != null && location.getName() === place.name) {
                    setFeedbackMessage("Weather data for " + place.name + " is already displayed.")
                    return false;
                }
                setLocation(new Location(place.name, place.lat, place.lon))
                setFeedbackMessage("Found " + place.name + ".")
            } else {
                setFeedbackMessage(`No place called "` + name + `" was found.`)
                setLocation(null)
            }
    

        }
    
        function findWeather() {
            const userInput = document.getElementById("locationInput").value.toLowerCase()
            getCoordinatesFromName(userInput)
        }

        findWeather()
    }, [location])


    return (
        <div>
            <p>Weather Check</p>
            <div>
                <label htmlFor="locationInput">Enter location: </label>
                <input type="text" id="locationInput"/>   
                <button onClick={getLocation}>Submit</button>             
            </div>
            <br/>
            {feedbackMessage}
            <hr/>
            {location ? <WeatherLocation key={location.getName()} location={location}/> : null}
        </div>
    )
}

class Location {
    constructor(name, latitude, longitude, saved=false) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.saved = saved;
    }

    getName() {
        return this.name
    }

    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }

    isSaved () {
        return this.saved;
    }
}