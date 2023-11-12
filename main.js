///////////////////////////////Veriable Decleration///////////////////////////////
cityNamesArray = [ // City Decleration, number of cities determines the number of marquee items
    "montreal",
    "toronto",
    "vancouver",
    "ottawa",
    "calgary",
    "edmonton",
    "winnipeg",
    "waterloo",
    "halifax",
    "saskatoon",
]
marqueeArray = new Array(cityNamesArray.length)
cityCodeArray = new Array(cityNamesArray.length)
cityLongitudeArray = new Array(cityNamesArray.length)
cityLatitudeArray = new Array(cityNamesArray.length)

let marqueeWrapper = document.querySelector(".marquee__textWrapper");
let hiddenMarqueeWrapper = document.querySelector(".marquee__textWrapper--hidden");

///////////////////////////////Veriable Decleration///////////////////////////////
///////////////////////////////Function Decleration///////////////////////////////

let getCityCoordinates = (_cityNamesArray, _cityLatitudeArray, _cityLongitudeArray) => {

    for(let i = 0; i < _cityNamesArray.length; i++){

        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=
            ${_cityNamesArray[i]}&count=1&language=en&format=json`
        ).then((response) => {

            return response.json();

        }).then((data) => {

            if (data.results[0].country === 'Canada'){
                    _cityLongitudeArray[i] = data.results[0].longitude
                    _cityLatitudeArray[i] = data.results[0].latitude
            }else{
                console.log(`bad query input ${_cityNamesArray[i]}`)
            }

        })
    }
}
let getCodeData = (_cityNamesArray, _cityCodeArray, _cityLatitudeArray, _cityLongitudeArray) => {
    for(let i = 0; i < _cityNamesArray.length; i++){

        fetch(`https://api.open-meteo.com/v1/forecast?
            latitude=${_cityLatitudeArray[i]}
            longitude=${_cityLongitudeArray[i]}
            &hourly=weather_code&forecast_days=1`

        ).then((response) => {

            return response.json();

        }).then((data) => {

            _cityCodeArray[i] = data.hourly.weather_code[12];

        })
    }
};
let constructMarqueeStrings = (_cityNamesArray, _cityCodeArray, _marqueeArray) => {

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
        
}
let populateMarquee = (array, itemWrapper, hiddenItemWrapper) => {
    for(let i = 0; i < array.length; i++){
        itemWrapper.innerHTML += `<div class="marquee__item--num${i + 1} marquee__item">${array[i]}</div>`;
        }
    for(let i = 0; i < array.length; i++){
        hiddenItemWrapper.innerHTML += `<div class="marquee__item--num${i + 1} marquee__item">${array[i]}</div>`;
        }
};

///////////////////////////////Function Decleration///////////////////////////////
///////////////////////////////Function Calls///////////////////////////////

getCityCoordinates(cityNamesArray, cityLatitudeArray, cityLongitudeArray);
getCodeData(cityNamesArray, cityCodeArray, cityLatitudeArray, cityLongitudeArray);
populateMarquee(marqueeArray, marqueeWrapper, hiddenMarqueeWrapper);

///////////////////////////////Function Calls///////////////////////////////
