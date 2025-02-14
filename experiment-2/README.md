# Experiment 2 (Finished)
## Goal: Display the weather data on a webpage.
This is a small step up from experiment 1, this time using react to show the data on a webpage.

## To run:
Note: An api key from a free account at https://openweathermap.org/api is needed to run this.
1. Run `npm i` to install the required packages.
2. Create a .env file in this experiment-2 folder (the same location as this README).
3. Add a REACT_APP_WEATHER_API_KEY variable and set it to the api key from OpenWeather.
4. Do one of the following to run the program:
    - Run the development server by running `npm start`.
    - Build the app by running `npm run build` then `http-server ./build` (http server can be installed with `npm install --global http-server`).

## Changing parameters:
This program is set to request the current weather data for Queen Mary University of London using the current weather api at https://openweathermap.org/current.

You can change the latitude and longitude in `weather.js` line 33 for any location of your choosing. You can right click in google maps to see the latitude and longitude of a location.
