# Experiment 1 (Finished)
### Goal: Get a response with the current weather data at my university.
This is a very simple program as I just wanted to get a response and have an easy way of testing parameters before adding anything else.

## To run:
Note: A key for OpenWeather's [current weather API](https://openweathermap.org/current) is needed for this program to run. A key for this can be gotten for free by [signing up](https://home.openweathermap.org/users/sign_up).
1. Make sure the [python-dotenv](https://pypi.org/project/python-dotenv/) and [requests](https://pypi.org/project/requests/) libraries are installed. This can be done using `python -m pip install {library}`. If that does not work sometimes `py` works instead.
1. Create a .env file in this experiment-1 folder (the same location as this README).
2. Add a WEATHER_API_KEY variable and set it to the api key from OpenWeather.
3. Run the test.py file.

## Changing parameters:
This program is set to request the current weather data for Queen Mary University of London using the current weather api at https://openweathermap.org/current.

You can change the link for one of their different apis, or change the parameters to other ones for further testing.  You can right click in google maps to see the latitude and longitude of a location.
