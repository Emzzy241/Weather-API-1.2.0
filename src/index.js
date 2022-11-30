
// the UserInterface Logic file

// After I've made use of Promises, I would like to make use of 
// another tool that helps in making my api call and that tool is "fetch API"
// and Fetch Api are just really an alternative to making your API calls
// with the very famous option(XMLHttpRequest)... in essence, me using fetch is me using an alternative to XMLHttpRequest();
// fetch is still using XMLHttpRequest() under the hood, we are just using it here to dry our code; in addtion to this the Fetch PI returns a promise
// The Fetch API makes us able to make our API call on a single line of code,  this helps keep our code dry
// Note that the Fetch API is called an API because it provides a simple interface we can use in our applications. Remember, that's all an API is: an application programming interface. It is not called the Fetch API because it is used to make API calls.



import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// importing the WeatherService and CountryWeatherService class that we need in the UI logic file

import { WeatherService, CountryWeatherService } from "./weather-service.js";

// importing the App Logo Image
import jsBadgeImage from "./assets/images/js-Badge.svg";


// separation of logic code 

// functions for clearing out the form fields and other things from the DOM(Document Object Module)
// for cities and states
function clearFields() {
    $("#location").val("");
    $(".showErrors").text("");
    $(".showHumidity").text("");
    $(".showTemp").text("");
    $(".showTempCelsius").text("");
    $(".showTempFahrenheit").text("");
}
// for countries
function clearCountryFields() {
    $("#country").val("");
    $(".showErrorsCountry").text("");
    $(".showHumidityCountry").text("");
    $(".showTempCountry").text("");
    $(".showTempCelsiusCountry").text("");
    $(".showTempFahrenheitCountry").text("");
}

$(document).ready(() => {

    // working with the jsBadge Image when app is ready
    let myAppLogo = $("#img");
    myAppLogo.attr("href", jsBadgeImage);


    
    $('#weatherLocation').click(() => {
        let city = $('#location').val();
        // running the clearFields() function to clear out all our fields(both the form fields and the other fields for revealingthe answers)
        clearFields();

        // we're back to writing(callbacks) a function that would be called to show user values of temperature because we no longer have a variable called promise and with a  promise.then()
        // also, this is a good opportunity to separate out our code further, taking code that alters the DOM and putting it in its own getMyWeatherValues() function. So our code is a bit cleaner once we do that.
        function getMyWeatherValues(myResponseBody) {
            // in the branch below we are also taking a new different approach because we are saying to JavaScript
            // if there is a .main property inside the response I will be getting(that tells me my request was successful), show my user all of the temperature values and if not, 
            // show the error message to our users(thankfully, the promise object I would be getting has a message property)
            if (myResponseBody.main) {
                // getting the fahrenheit temperature value
                let myTempValue = 1.8 * (myResponseBody.main.temp - 273) + 32;
                // let myTempValue = Math.trunc(1.8 * (response.main.temp - 273) + 32); -- I didn't trunc or floor the values because I want my value to be concised for my users
                // console.log(myTempValue);

                $('.showHumidity').text(`The humidity in ${city} is ${myResponseBody.main.humidity}%`);
                $('.showTemp').text(`The temperature in Kelvin is ${myResponseBody.main.temp}k.`);
                $('.showTempCelsius').text(`The temperature in degree Celsius is ${myResponseBody.main.temp - 273}c.`);
                $(".showTempFahrenheit").text(`The temperature in Fahrenheit is ${myTempValue}f`);
            } else{
                // However, if the previous promise returns an error, that error will be passed into the response of getElements(). JavaScript Error objects have a handy message property so we can get the message via response.message.
                $('.showErrors').text(`There was an error processing your request: ${myResponseBody.message}`);
            }

            // It's important to emphasize that we are grabbing properties from two completely different things in the callback above. If there's a successful API call, we are parsing the body of the API response. 
            // If there isn't, we are just grabbing the message property from a JavaScript Error object.

        }

        // update for UI: we do not need to save the return of our static method in a variable We can just chain Promise.prototype.then() directly to the method because the method returns a promise. 
        WeatherService.getWeather(city)
            // also don't add add semi-colons here because its an API call and its not come to conclussion yet(). If you do, you'll get an error because adding a semi-colon tells JavaScript thats the end of the line

            //finally I will be calling a function I wrote above in my .then() method
            .then( function(gottenResponse){
                // This code is very simple now - let our static method return a promise, wait for the promise to fulfill with Promise.prototype.then() and then make a callback
                getMyWeatherValues(gottenResponse);
            });

            // Also, note that we put .then() on a new line. We did the same in our static method as well. This spacing is common for readability, especially when chaining multiple promises together. 

    });

    $("#countryWeather").click(function () {
        let country = $("#country").val();

        clearCountryFields();

        function getMyCountryWeatherValues(myCountryBody) {
            if (myCountryBody.main) {
                let myCountryTempValue = 1.8 * (myCountryBody.main.temp - 273) + 32;
                // console.log(myCountryTempValue);

                $('.showHumidityCountry').text(`The humidity in ${country} is ${myCountryBody.main.humidity}%`);
                $('.showTempCountry').text(`The temperature in Kelvin is ${myCountryBody.main.temp}k.`);
                $('.showTempCelsiusCountry').text(`The temperature in degree Celsius is ${myCountryBody.main.temp - 273}c.`);
                $(".showTempFahrenheitCountry").text(`The temperature in Fahrenheit is ${myCountryTempValue}f`);
            } else{
                $('.showErrorsCountry').text(`There was an error processing your request: ${myCountryBody.message}`);

            }


        }

        CountryWeatherService.getCountryWeather(country)
        .then( function(gottenCountryResponse){
            getMyCountryWeatherValues(gottenCountryResponse);
        });

       
    });
});


// While the fetch() method is very useful, some developers prefer using XMLHttpRequest objects
// Ultimately, even if you prefer using fetch(), it's still important to have a good understanding of XMLHttpRequest objects and promises because fetch() relies on both.

// Which one to use between .fetch() and XMLHttpRequest() ?

// Use XMLHttpRequest objects and promises if you want full control over being able to reject a promise.
// Use fetch() if you don't want to worry about dealing with XMLHttpRequest objects and want any advantages that come with streaming the data instead of waiting for the full response.
