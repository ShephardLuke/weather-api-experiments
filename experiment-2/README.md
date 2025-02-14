# Experiment 2
## Goal: Display the weather data on a webpage.
This is a small step up from experiment 1, this time using react to show the data on a webpage.
## To run:
Note: An api key from a free account at https://openweathermap.org/api is needed to run this.
1. Create a .env file in this experiment-2 folder (the same location as this README).
2. Add a REACT_APP_WEATHER_API_KEY variable and set it to the api key from OpenWeather.
3. Do one of the following to run the program:
    - Build the app by running `npm run build` then `http-server ./build` (http server can be installed with `npm install --global http-server`).
    - Run the development server by running `npm start`.
## Changing parameters:
This program is set to get the current temperature using the current weather api at https://openweathermap.org/current.

You can change the link for one of their different apis, or change the parameters to other ones for further testing. For example going on google maps and right clicking a location gives it latitude and longitude, then that can be copied into params for a new location.
