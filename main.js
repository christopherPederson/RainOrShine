marqueeArray = new Array(10)
cityCodeArray = new Array(10)
cityLongitudeArray = new Array(10)
cityLatitudeArray = new Array(10)
cityNamesArray = [
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

let marqueeWrapper = document.querySelector(".marquee__textWrapper");
let hiddenMarqueeWrapper = document.querySelector(".marquee__textWrapper--hidden");

let getCityCoordinates = (_cityNamesArray, _cityLatitudeArray, _cityLongitudeArray) => {

    for(let i = 0; i < _cityNamesArray.length; i++){

        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=
            ${_cityNamesArray[i]}&count=1&language=en&format=json`
        ).then((response) => {

            return response.json();

        }).then((data) => {

            if (data.results[0].country == 'Canada'){
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
let populateMarquee = (array, itemWrapper, hiddenItemWrapper) => {
    for(let i = 0; i < array.length; i++){
        itemWrapper.innerHTML += `<div class="marquee__item--num${i + 1} marquee__item">${array[i]}</div>`;
        }
    for(let i = 0; i < array.length; i++){
        hiddenItemWrapper.innerHTML += `<div class="marquee__item--num${i + 1} marquee__item">${array[i]}</div>`;
        }
};

populateMarquee(marqueeArray, marqueeWrapper, hiddenMarqueeWrapper);
