# Experiment 3 (Finished)
### Goal: Allow for getting and saving the weather for different locations, using place names and postcodes. 
This is a major improvement over experiment 2, as now the user is able to enter the name or postcode of the location they want. There is also a button to save the locations, so even if they close the browser the locations will show up when they come back.

## To run:
Note: A key for OpenWeather's [current weather API](https://openweathermap.org/current) and [geocoding API](https://openweathermap.org/api/geocoding-api) is needed for this program to run. [**For students only**](https://docs.openweather.co.uk/our-initiatives/student-initiative), a key for this can be gotten for free by [signing up](https://home.openweathermap.org/users/sign_up). For anyone else, experiment 1 and 2 can still be done with a free API key.
1. Run `npm i` to install the required packages.
2. Create a .env file in this experiment-3 folder (the same location as this README).
3. Add a REACT_APP_WEATHER_API_KEY variable and set it to the api key from OpenWeather. Make sure it has access to both APIs.
4. Do one of the following to run the program:
    - Run the development server by running `npm start`.
    - Build the app by running `npm run build` then `http-server ./build` (http server can be installed with `npm install --global http-server`).