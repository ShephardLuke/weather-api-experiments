import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import WeatherLocation from "./weatherLocation.js"

export default function WeatherCheck() {
    const [location, setLocation] = useState(null)
    const [savedLocations, setSavedLocations] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState(null)

    const savedLocationsDisplay = savedLocations.map(savedLocation => <WeatherLocation key={savedLocation.getName()} location={savedLocation} removeStoredLocation={removeStoredLocation}/>)

    useEffect(() => {
        setSavedLocations(getStoredLocations())
    }, [])


    function setStoredLocations(locations) {
        localStorage.setItem("locations", JSON.stringify(locations))
    }

    function getStoredLocations() {
        const stored = localStorage.getItem("locations");

        if (stored !== null) {
            const storedArray = JSON.parse(stored).map(location => new Location(location.name, location.latitude, location.longitude, true));
            
            return storedArray
        }

        return []
    }


    function addStoredLocation() {
        if (location.isSaved()) {
            return false;
        }
        const newLocation = new Location(location.name, location.latitude, location.longitude, true)
        const newStoredLocations = [...savedLocations, newLocation]

        setLocation(null)
        setSavedLocations(newStoredLocations);
        setStoredLocations(newStoredLocations);
    }

    function removeStoredLocation(toRemove) {
        const newStoredLocations = [...savedLocations]
        newStoredLocations.splice(toRemove, 1)

        if (toRemove === location) {
            const newLocation = new Location(location.name, location.latitude, location.longitude, false)
            setLocation(newLocation)
        }

        setSavedLocations(newStoredLocations);
        setStoredLocations(newStoredLocations);
    }

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
                return;
            }

            console.log(response.data)
    


            if (response.data.length > 0) {
                const place = response.data[0]
                
                const savedNames = savedLocations.map(location => location.getName());
                const index = savedNames.indexOf(place.name)
                if (index !== -1) {
                    setFeedbackMessage(`${place.name} is already a saved location.`);
                    setLocation(savedLocations[index]);
                    return;
                }

                if (location != null && location.getName() === place.name) {
                    setFeedbackMessage("Weather data for " + place.name + " is already displayed.")
                    return;
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
    }, [location, savedLocations])


    return (
        <div>
            <h1>Weather API Experiment 3</h1>

            <div>
                <label htmlFor="locationInput">Enter search location: </label>
                <input type="text" id="locationInput"/>   
                <button onClick={getLocation}>Submit</button>             
            </div>
            <p><strong>{feedbackMessage}</strong></p>
            <br/>
            {
                location ? 
                <div>
                    <h2>Search result:</h2>
                    <hr/>
                    <WeatherLocation key={location.getName()} location={location} addStoredLocation={addStoredLocation}/> 
                </div>
                :
                null
            }
            {
                savedLocations.length > 0 ?
                <div>
                    <h2>Saved locations:</h2>
                    <hr/>
                    {savedLocationsDisplay}
                </div>
                :
                null
            }
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

    setSaved(saved) {
        this.saved = saved
    }

    isSaved () {
        return this.saved;
    }
}