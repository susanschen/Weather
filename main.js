/*
This is a project based on
https://codepen.io/freeCodeCamp/pen/bELRjV?editors=1010

Use Yahoo Weather API to get weather forecast,
Use Google Maps API to get location name for latitude and longitude,
Use Weather Icons to display icons for the weather.

*/

var lat, lon, tempUnit = "F", temp, celsiusTemp;

$( document ).ready(function(){

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
			var lat = position.coords.latitude,
					lon = position.coords.longitude;
			console.log(lat + "\n" + lon);
			getCityWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

/*
Temperature Conversion Formula
	T(°F) = T(°C) × 9/5 + 32
	T(°C) = (T(°F) - 32) × 5/9
*/
  $("#convert-unit").click(function () {
    // var currentUnit = $("#unit").class();
    // var newTempUnit = currentUnit == "C" ? "F" : "C";
    // $("#convert-unit").text(newTempUnit);
    // if (newTempUnit == "F") {
    //   var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
    //   $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    // } else {
    //   $("#temp").text(celsiusTemp + " " + String.fromCharCode(176));
    // }

		if ($("#unit").hasClass("fah")) {
			$("#unit").removeClass("fah").addClass("cel").text("Fahrenheit");

		} else {
			$("#unit").removeClass("cel").addClass("fah").text("Celsius");
		}
  });

})  // document.ready

// Get location name from latitude and longitude using Google Maps API
// Calls Yahoo API after Google API success.
function getCityWeather(lat, lon) {
	var googleKey = 'AIzaSyDCQ5SQdPh5YXk89l4so-scoq-dd9swuUM';
	var googleApi = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=' + googleKey;

  $.ajax({
    url: googleApi,
			success: function (ajaxData) {
				var location = ajaxData.results[4].formatted_address;
				$("#location").text(location);
				getWeather(location);
			},
			error: function() {
				console.log('Error connecting to Google');
			}
		}); // end google ajax
}

// Get weather forecast from Yahoo API
function getWeather(location) {
	var yql = 'select item from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+location+'")';
	var yahooApi = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + yql;

  $.ajax({
    url: yahooApi,
			success: function (ajaxData) {
				var data = ajaxData.query.results.channel.item;
				console.log(data);

				var todayWeather = data.condition;
				$("#curr-date").text(todayWeather.date);
				$("#curr-temp").text(todayWeather.temp).append(getIconHtml(getIcon(tempUnit)));
				$("#curr-icon").append(getIconHtml(getIcon(todayWeather.code)));
				$("#curr-desc").text(todayWeather.text);
				var weekForecast = data.forecast.slice(0,7);
				weekForecast.map(fillForecast);

	      // celsiusTemp = Math.round(ajaxData.main.temp * 10) / 10;
	      // $("#temp").text(celsiusTemp + " " + String.fromCharCode(176));
	      // $("#convert-unit").text(tempUnit);
	    },
			error: function(xhr, status, msg) {
				console.log("Error connecting to Yahoo: " + status + " " + msg);
			}
  }); // end yahoo ajax
}

function fillForecast(day, index) {
	var date = day.date.substring(0,6),
			icon = getIcon(day.code),
			iconHtml = $.parseHTML(getIconHtml(icon));

	$("<tr><td></td></tr>")
	.append($("<span />", {class: "dayoftheweek", text:day.day}))
	.append($("<span />", {class: "date", text:date}))
	.append($("<span />", {class: "hightemp", text:day.high}))
	.append($("<span />", {class: "lowtemp", text:day.low}))
	.append($("<span />", {class: "description", text:day.text}))
	.append(iconHtml)
	.appendTo("#week");
}

// Pass in a class name for an icon to get it wrapped in HTML
function getIconHtml(name) {
	return "<i class='" + name + "'></i>";
}

/*
Accepts Yahoo's code and returns the class name for the icon fonts

https://erikflowers.github.io/weather-icons/api-list.html
https://developer.yahoo.com/weather/documentation.html#item
*/
function getIcon(code) {
  switch (code) {
    case "0": return "wi wi-tornado"
    case "1": return "wi wi-day-storm-showers"
    case "2": return "wi wi-hurricane"
    case "3":	case "4": return "wi wi-thunderstorm"
    case "5": case "6": case "7": case "18": return "wi wi-rain-mix"
    case "8": case "10": case "17": return "wi wi-hail"
    case "9": case "11": case "12": case "40": return "wi wi-showers"
    case "13": case "14": case "16": case "25": case "42": case "46": return "wi wi-snow"
		case "15": case "41": case "43": return "wi wi-snow-wind"
    case "19": return "wi wi-dust"
    case "20": return "wi wi-fog"
    case "21": case "23": case "24": return "wi wi-strong-wind"
    case "22": return "wi wi-smoke"
    case "26": return "wi wi-cloudy"
    case "27": case "29": return "wi wi-night-cloudy"
    case "28": case "30": return "wi wi-day-cloudy"
    case "31": return "wi wi-night-clear"
    case "32": return "wi wi-day-sunny"
    case "33": return "wi wi-night-partly-cloudy"
    case "34": case "44": return "wi wi-day-sunny-overcast"
    case "35": return "wi wi-rain-mix"
    case "36": return "wi wi-hot"
    case "37": case "38": case "39": case "45": case "47": return "wi wi-day-storm-showers"
		case "F" : return "wi wi-fahrenheit"
		case "C" : return "wi wi-celsius"
		case "degree" : return "wi wi-degrees"
    default: return "wi wi-na"
  }
}
