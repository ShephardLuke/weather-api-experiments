import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import WeatherLocation from "./weatherLocation.js"
import { Location } from "./location.js";

export default function WeatherCheck() {
    const [location, setLocation] = useState(null)
    const [savedLocations, setSavedLocations] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState(null)

    const savedLocationsDisplay = savedLocations.map(savedLocation => <WeatherLocation key={savedLocation.getName()} location={savedLocation} removeStoredLocation={removeStoredLocation}/>)

    useEffect(() => { // Gets the saved locations only on the first render
        setSavedLocations(getStoredLocations())
    }, [])


    function setStoredLocations(locations) { // Stores locations in localstorage
        localStorage.setItem("locations", JSON.stringify(locations))
    }

    function getStoredLocations() { // Gets the stored locations and returns them as an array of location objects
        const stored = localStorage.getItem("locations");

        if (stored !== null) {
            const storedArray = JSON.parse(stored).map(location => new Location(location.name, location.latitude, location.longitude, true));
            
            return storedArray
        }

        return []
    }

    function addStoredLocation() { // Store a location
        if (location.isSaved()) {
            return false;
        }
        const newLocation = new Location(location.name, location.latitude, location.longitude, true)
        const newStoredLocations = [...savedLocations, newLocation]

        setLocation(null)
        setSavedLocations(newStoredLocations);
        setStoredLocations(newStoredLocations);
    }

    function removeStoredLocation(toRemove) { // Remove a stored location
        const newStoredLocations = [...savedLocations]
        newStoredLocations.splice(newStoredLocations.indexOf(toRemove), 1)

        if (toRemove === location) {
            const newLocation = new Location(location.name, location.latitude, location.longitude, false)
            setLocation(newLocation)
        }

        setSavedLocations(newStoredLocations);
        setStoredLocations(newStoredLocations);
    }

    const getLocation = useCallback(async () => { // Get a location using API and set the state
        async function getCoordinatesFromName(name) { // Looks up name using Geocoding API
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${name},GB&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
            
            const response = await axios.get(url)
                .catch(function (error) {
                    console.error(error)
                });    

            return response
    
        }

        async function getCoordinatesFromPostcode(postcode) { // Looks up postcode using Geocoding API
            const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${postcode},GB&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
            
            const response = await axios.get(url)
                .catch(function (error) {
                    console.error(error)
                });    

            return response
        }
    
        async function findWeather() { // Gets user input and attempts to get the location
            const name = document.getElementById("locationInput").value.toLowerCase()

            const postcodeCheck = new RegExp("[0-9]")
            
            
            let response;
            let place;

            if (postcodeCheck.test(name)) { // Choose postcode/name depending on if numbers are found in the query or not
                response = await getCoordinatesFromPostcode(name)
                if (!response) {
                    setFeedbackMessage(`Nothing was found for "` + name + `". Please make sure postcodes have a space in the middle.`)
                    setLocation(null)
                    return
                }
                place = response.data
            } else {
                response = await getCoordinatesFromName(name)

                if (response.data.length === 0) {
                    setFeedbackMessage(`Nothing was found for "` + name + `".`)
                    setLocation(null)
                    return;
                }

                place = response.data[0]
            }

            console.log(response.data)
                
            const savedNames = savedLocations.map(location => location.getName());
            const index = savedNames.indexOf(place.name)
            if (index !== -1) { // If already saved, no need to display
                setFeedbackMessage(`${place.name} is already a saved location.`);
                return;
            }

            if (location != null && location.getName() === place.name) { // Place with same name is already shown
                setFeedbackMessage("Weather data for " + place.name + " is already displayed.")
                return;
            }
            setLocation(new Location(place.name, place.lat, place.lon))
            setFeedbackMessage("Found " + place.name + ".")

        }

        findWeather()

    }, [location, savedLocations])


    return (
        <div>
            <h1>Weather API Experiment 3</h1>

            <div>
                <label htmlFor="locationInput">Enter search location (place name or postcode): </label>
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

