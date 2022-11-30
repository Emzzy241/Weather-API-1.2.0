// business Logic file

export class WeatherService {
    static getWeather(city) {
        // we used fetch  fetch() instead of manually creating both promises and XMLHttpRequest objects.
        // since fetch returns a promise, we can use Promise.prototype.then() to handle the response gotten from our API call

        // we returned fetch because: fetch returns a promise and don't forget our function must return a promise
        // after returning the promise the .then helps us handle what gets returned
        // now to explain that branching we did here with the if and return statements
        // .fetch() method never ever rejects a promise, we basically ran that branch to make our fetch reject a promise if the status is != 200 OK(we made .fetch() handle an error when it never does that, the only time it does that is when there is a serious problem with our internet)
        // we could handle the response to fetch() in our UI logic file but we did it here all because of separation of concern(logics).We could handle it in our UI logic but it wouldn't be good separation because the error handling for our API call has nothing to do with the user interface.
        // fortunately the response object that fetch() returns includes an (ok) property... 
        // so in our branch if the api status === 200 Ok then the .ok property will be se to true.If it doesn't, it will be set to false. So if !response.ok(if response.ok is not true), our code will immediately throw an error.
        // If an error is thrown, control immediately reverts to the catch block. So if our code throws an error, it won't reach return response.json();. Instead, control will go to the catch block and the error will be returned. If the response is ok, the conditional won't be triggered and our code will return response.json().
        //  So this is our first opportunity to practice using Promise.prototype.catch(). Note that it's generally a good idea to add this method when we are working with promises for the purpose of error handling. Even if we don't 
        // manually throw an error in our application, it's possible that our code will throw an error anyway, especially if there's a typo or something is broken. You can always 
        // return an Error object from a promise in the exact fashion we did below - as long as you write code to handle it as well

        // fetch() returns a promise which, when resolved, is a stream that our code must read and convert to JSON. That's what's happening when we call response.json(). In other words, the data is streaming and being retrieved now but the data transfer won't be complete until later. More async! Making the API request is the first async operation and reading the data stream from the response is the second async operation.

        // So our method returns a promise which returns a second promise. Even if the catch block is triggered, our method will still return a promise because the return of Promise.prototype.then() is itself a promise - even if we are just running sync code like our error handling.

        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }) // didn't add a semi colon here because it threw an error, but when I added it to the end of the catch block everything was fine
            .catch(function (error) {
                return error;
            })

            // two things our method returns for us: 1.THe data of a successful response or An error message if the API call goes wrong
            // you might be thinking that: why then did we go through all of this process since our code might actually still return an error 
            // fine our code would return an error but it is great practice to see that you're doing what exactly a .then() method is used for: which is 
            // for handling when a request is either resolved or rejected   

    }
}



// all what worked for the first class is the same thing that would be executed here also, next we update our UI logic file

export class CountryWeatherService {
    static getCountryWeather(country) {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.API_KEY}`)
            .then(function (countryResponse) {
                if (!countryResponse.ok) {
                    throw Error(response.statusText);
                }
                return countryResponse.json();
            }) // didn't add a semi colon here because it threw an error, but when I added it to the end of the catch block everything was fine
            .catch(function (error) {
                return error;
            })
    }
}