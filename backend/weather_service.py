import requests

def get_weather(latitude, longitude): # Function to fetch weather data based on latitude and longitude

    url = ("https://api.open-meteo.com/v1/forecast")

    # Parameters for the API request
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,relative_humidity_2m",
        "daily": "precipitation_sum",
        "timezone": "auto"
    }

    # Make the API request to fetch weather data
    response = requests.get(
        url,
        params=params
    )

    response.raise_for_status()     # Raise an exception if the request was unsuccessful
    data = response.json()
    temperature = data["current"]["temperature_2m"]   # Extract the current temperature 

    humidity = data["current"]["relative_humidity_2m"]  # Extract the current relative humidity 

    rainfall = data["daily"]["precipitation_sum"][0]  # Extract the daily precipitation sum 

    return {
        "Temperature": temperature,
        "Humidity": humidity,
        "Rainfall": rainfall
    }