# Weather
API Project for Free Code Camp

[Preview](https://susanschen.github.io/Weather/)

I'm excited to design and code this [weather forecast project](https://www.freecodecamp.org/challenges/show-the-local-weather) as part of FreeCodeCamp Front-End Developer Certificate requirement. 

## Basic Requirements
- User Story: I can see the weather in my current location. (Using HTML5 Geolocation to get user location)
- User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
- User Story: I can push a button to toggle between Fahrenheit and Celsius.

## Usage
Please select 'Allow' when prompted for user location. If you get an error message, please try again later. I have omitted the Google API key 
from the project, and therefore usage is limited. 


## Notes
I've used Google Maps API to get user's location name and Yahoo Weather API for the weather forecast.  

FreeCodeCamp's example displays the weather forecast for one day only, and I've decided to display seven days for fun.
Yahoo's Weather API has data for ten days, and I trimmed it down using array's slice method. Choosing to display a week's data 
adds extra design complexity, and I've learned CSS Grid to display the data without resorting to HTML tables, which I'm really happy about. 

### Skills Learned/Used
- Yahoo Weather API
- Google Maps API
- CSS Grid
- JQuery
- BootStrap

