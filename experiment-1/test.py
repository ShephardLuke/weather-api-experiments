from dotenv import load_dotenv
import os
import requests

load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")

# Get current weather for Queen Mary University of London

params = {"lat":"51.525975107661914","lon":"-0.07185484992841029","appid":API_KEY, "units": "metric"}

response = requests.get("https://api.openweathermap.org/data/2.5/weather", params=params)
print(response.content)
