
///////////////////////////////Dev Notes///////////////////////////////
// Christopher Pederson-2023
// this wether app is desighned to take advantage of the open-meteo api to 
//display the weather for a number of cities, features will eventually inclue
//a live data stream marquee, data visualization of any supported city, and
//a search function to find cities with auto fill features

// currently non functional, marquee elements need to be loaded to the marquee divs
///////////////////////////////Dev Notes///////////////////////////////
///////////////////////////////Veriable Decleration///////////////////////////////
cityNamesArray = [ // City Decleration, number of cities determines the number of marquee items
    "montreal",
    "toronto",
    "vancouver",
    "ottawa",
    "calgary",
    "edmonton",
    "winnipeg",
    "kitchener",
    "halifax",
    "saskatoon",
]
marqueeArray = new Array(cityNamesArray.length)//array to hold the marquee strings
cityCodeArray = new Array(cityNamesArray.length)//array to hold the city codes specific codes are used to determine the weather symbol
cityLongitudeArray = new Array(cityNamesArray.length)//array to hold the corresponding city longitudes
cityLatitudeArray = new Array(cityNamesArray.length)//array to hold the corresponding city latitudes

let marqueeWrapper = document.querySelector(".marquee__textWrapper");// visible marquee wrapper
let hiddenMarqueeWrapper = document.querySelector(".marquee__textWrapper--hidden"); //hidden marquee wrapper, this acts as the second half of the marquee length to facillitate the scroling effect

///////////////////////////////Veriable Decleration///////////////////////////////
///////////////////////////////Function Decleration///////////////////////////////
let serverNotResponding = (string) => {
// this function is called when the server does not respond to the fetch request
// it will trigger the server not responding re direct
console.log(`server not responding while ${string}`)
}
let populateCityCoordinates = (_cityNamesArray, _cityLatitudeArray, _cityLongitudeArray) => {
// this function populates the city coordinates arrays with the corresponding city coordinates 
//retrieved from the api using the getCityCoordinatesData function

    for(let i = 0; i < _cityNamesArray.length; i++){
        //loop through the city names array and call the getCityCoordinatesData function for each city

        getCityCoordinatesData(_cityNamesArray[i])
            .then((data) => {
                //succesful fetch
                //test to see if the server responded with a valid city ie inside canada if not we will use the default city
                if(data.results[0].country_code === "CA"){
                    //if the server responded with a valid city we will populate the city coordinates arrays
                    _cityLatitudeArray[i] = data.results[0].latitude;
                    _cityLongitudeArray[i] = data.results[0].longitude;
                }else{
                    //if the server responded with an invalid city we will populate the city coordinates arrays with the default city
                    console.log(`invalid city name: ${_cityNamesArray[i]}`)
                    _cityLatitudeArray[i] = 45.41117;
                    _cityLongitudeArray[i] = -75.69812;
                    // coordinates for ottawa city
                }
            
            }, (error) => {
                //failed fetch
                //call server not responding function
                serverNotResponding("populating city coordinates");
            })
    }
}
let getCityCoordinatesData = (_cityName) => {
    // returns the raw json data from the api for the corresponding city name
    // the data is then used to populate the city coordinates arrays
    // the function is designed to be used while iterating through the city names array
    return new Promise((resolve, reject) => {
        fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${_cityName}&count=1&language=en&format=json`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                resolve(data);
            })
            .catch(() => {

                reject("Server not responding");
                
            });
    });
};
let getCodeData = (_cityNamesArray, _cityCodeArray, _cityLatitudeArray, _cityLongitudeArray) => {
// this function populates the city code array with the corresponding city codes for each city string
// this function is reliant on the latitude and longitude arrays being populated first
    for(let i = 0; i < _cityNamesArray.length; i++){

        fetch(`https://api.open-meteo.com/v1/forecast?
            latitude=${_cityLatitudeArray[i]}
            longitude=${_cityLongitudeArray[i]}
            &hourly=weather_code&forecast_days=1`)

            .then((response) => {

                return response.json();

            }).then((data) => {
                _cityCodeArray[i] = data.hourly.weather_code[12];

            }).catch(() => {

                serverNotResponding("get code data");

            });
    }
};
let constructMarqueeStrings = (_cityNamesArray, _cityCodeArray, _marqueeArray) => {

    // this function translates the wether codes provided by the API into visual elements for the marquee
    let weatherSymbol = "";

    for(let i = 0; i < _cityNamesArray.length; i++){

        if (_cityCodeArray[i] === 0 || 
            _cityCodeArray[i] === 1){
                //sunny
                weatherSymbol = "&#x2600;";
        }
        else if (_cityCodeArray[i] === 2 || 
                _cityCodeArray[i] === 3){

                    //cloudy
                    weatherSymbol = "&#x1F324;";
        }
        else if (_cityCodeArray[i] === 51 || 
                _cityCodeArray[i] === 53 ||
                _cityCodeArray[i] === 55 ||
                _cityCodeArray[i] === 56 ||
                _cityCodeArray[i] === 57 ||
                _cityCodeArray[i] === 61 ||
                _cityCodeArray[i] === 63 ||
                _cityCodeArray[i] === 65 ||
                _cityCodeArray[i] === 66 ||
                _cityCodeArray[i] === 67 ||
                _cityCodeArray[i] === 80 ||
                _cityCodeArray[i] === 81 ||
                _cityCodeArray[i] === 82){

                    //rainy
                    weatherSymbol = "&#x1F327;";
        }
        else if (_cityCodeArray[i] === 71 || 
                _cityCodeArray[i] === 73 ||
                _cityCodeArray[i] === 75 ||
                _cityCodeArray[i] === 77 ||
                _cityCodeArray[i] === 85 ||
                _cityCodeArray[i] === 86){

                    //snow
                    weatherSymbol = "&#x26C7;";
        }
        else if (_cityCodeArray[i] === 95 || 
            _cityCodeArray[i] === 96 ||
            _cityCodeArray[i] === 99){

                //storm
                weatherSymbol = "&#x1F329;";
        }
        else{
            // no data
            weatherSymbol = "&#x1F6AB;";
        }
    }
        
};
let populateMarquee = (array, itemWrapper, hiddenItemWrapper) => {
    // populates both the hidden and visible marquee wrappers with the marquee items
    for(let i = 0; i < array.length; i++){
        itemWrapper.innerHTML += `<div class="marquee__item--num${i + 1} marquee__item">${array[i]}</div>`;
        }
    for(let i = 0; i < array.length; i++){
        hiddenItemWrapper.innerHTML += `<div class="marquee__item--num${i + 1} marquee__item">${array[i]}</div>`;
        }
};

///////////////////////////////Function Decleration///////////////////////////////
///////////////////////////////Function Calls///////////////////////////////

populateCityCoordinates(cityNamesArray, cityLatitudeArray, cityLongitudeArray);
getCodeData(cityNamesArray, cityCodeArray, cityLatitudeArray, cityLongitudeArray);
console.log(cityCodeArray);
populateMarquee(marqueeArray, marqueeWrapper, hiddenMarqueeWrapper);

///////////////////////////////Function Calls///////////////////////////////
