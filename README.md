A live version can be viewed at https://weather.lazdans.com/

App developed using Angular and Chart.js open-source JavaScript library for data visualization

To get weather data I am using a free account on https://openweathermap.org/

To get any weather data, APIs have to be called with longitude and latitude values, so the first thing is to call a separate API with a city name which will give these values in return.

When a user opens the app, it will try to get his location from navigator.geolocation property by asking the user to allow access to his location (I could have used another API to get user's location based on his IP, but decided to go with this simplified approach)

Current Weather: https://openweathermap.org/current

3-hour Forecast 5 days: https://openweathermap.org/forecast5

For the google map iframe, I'm calling a custom [src] URL using the city name, it can be done with latitude and longitude, but it just looks a bit better when using a city name in the query.
