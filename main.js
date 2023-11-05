marqueeArray = [];// add your own text to the array Note in future version the array will be auto populated 

let marqueeWrapper = document.querySelector(".marquee__textWrapper");
let hiddenMarqueeWrapper = document.querySelector(".marquee__textWrapper--hidden");

let populateMarquee = (array, itemWrapper, hiddenItemWrapper) => {
    for(let i = 0; i < array.length; i++){
        itemWrapper.innerHTML += `<div class="marquee__item--num${i + 1} marquee__item">${array[i]}</div>`;
        }
    for(let i = 0; i < array.length; i++){
        hiddenItemWrapper.innerHTML += `<div class="marquee__item--num${i + 1} marquee__item">${array[i]}</div>`;
        }
};
populateMarquee(marqueeArray, marqueeWrapper, hiddenMarqueeWrapper);
