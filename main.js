marqueeArray = ["item with a bit of text 1", 
                "item with a bit of text 2",
                "item with a bit of text 3",
                "item with a bit of text 4",
                "item with a bit of text 5",
                "item with a bit of text 6",
                "item with a bit of text 7",
                "item with a bit of text 8",
                "item with a bit of text 9",
                "item with a bit of text 10",
                "item with a bit of text 11",
                "item with a bit of text 12",
                "item with a bit of text 13",
                "item with a bit of text 14",
                "item with a bit of text 15",
];

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
