console.log(countries);
let showCountries = [...countries];

const findStart = (value) => {
    let arr = [];

    for (const country of countries) {
        let name = country.name.slice(0, value.length);

        if (name.toLowerCase() === value.toLowerCase()) {
            arr.push(country);
        }
    }
    return arr;
}

const findAny = (value) => {
    let arr = [];
    for (const country of countries) {
        let name = country.name.toLowerCase();
        if (name.includes(value.toLowerCase())) {
            arr.push(country);
        }
    }
    return arr;
}

const listenInputStart = () => {
    input.addEventListener('input', e => {
        let value = e.target.value;
        showCountries = findStart(value);
        let itemsHtml = '';
        for (const ele of showCountries) {
            itemsHtml += `<div class="country-info"><p>${ele.name}</p></div>`;
        }
        showDiv.innerHTML = itemsHtml;
        if (value) {
            description.innerHTML = `<p>Countries start with <span class="letter">${value}</span> are <span class="number">${showCountries.length}</span></p>`
        } else {
            description.innerHTML = '';
        }
    });
}

const listenInputAny = () => {
    input.addEventListener('input', e => {
        let value = e.target.value;
        showCountries = findAny(value);
        let itemsHtml = '';
        for (const ele of showCountries) {
            itemsHtml += `<div class="country-info"><p>${ele.name}</p></div>`;
        }
        showDiv.innerHTML = itemsHtml;
        if (value) {
            description.innerHTML = `<p>Countries containg <span class="letter">${value}</span> are <span class="number">${showCountries.length}</span></p>`;
        } else {
            description.innerHTML = '';
        }
    });
}

const listenInputSort = () => {
    btnSortAToZ.textContent = btnSortAToZ.textContent === '↓A-Z' ? '↓Z-A' : '↓A-Z';
    showCountries.sort().reverse();
    let itemsHtml = '';
    for (const ele of showCountries) {
        itemsHtml += `<div class="country-info"><p>${ele.name}</p></div>`;
    }
    showDiv.innerHTML = itemsHtml;
}


let topDiv = document.createElement('div');
topDiv.className = 'top-div';
document.body.appendChild(topDiv);

let title = document.createElement('h1');
title.textContent = 'WORLD COUNTRIES LIST';
topDiv.appendChild(title);

let subTitle = document.createElement('h2');
subTitle.textContent = `Total Number of countries: ${countries.length}`;
topDiv.appendChild(subTitle);

let description = document.createElement('p');
description.className = 'description';
topDiv.appendChild(description);

let buttonDiv = document.createElement('div');
buttonDiv.className = 'button-div';
topDiv.appendChild(buttonDiv);

let btnSearchSta = document.createElement('button');
btnSearchSta.className = 'btn-start';
btnSearchSta.textContent = 'STARTING WORD';
buttonDiv.appendChild(btnSearchSta);

btnSearchSta.addEventListener('click', () => {
    btnSearchAny.className = 'btn-any';
    btnSearchSta.className = btnSearchSta.className === 'btn-start' ? 'btn-press' : 'btn-start';
    btnSearchSta.className === 'btn-press' ? listenInputStart() : listenInputAny();
})

let btnSearchAny = document.createElement('button');
btnSearchAny.className = 'btn-any';
btnSearchAny.textContent = 'SEARCH WITH ANY WORD';
buttonDiv.appendChild(btnSearchAny);

btnSearchAny.addEventListener('click', () => {
    btnSearchSta.className = 'btn-start';
    btnSearchAny.className = btnSearchAny.className === 'btn-any' ? 'btn-press' : 'btn-any';
    listenInputAny();
})

let btnSortAToZ = document.createElement('button');
btnSortAToZ.className = 'btn-sort';
btnSortAToZ.textContent = '↓A-Z';
buttonDiv.appendChild(btnSortAToZ);

btnSortAToZ.addEventListener('click', () => {
    btnSortAToZ.className = btnSortAToZ.className === 'btn-sort' ? 'btn-press' : 'btn-sort';
    listenInputSort();
});


let inputDiv = document.createElement('div');
inputDiv.className = 'input';
topDiv.appendChild(inputDiv);

let input = document.createElement('input');
input.placeholder = '                                     Search Country ...';

input.addEventListener('input', e => {
    let value = e.target.value;
    showCountries = findAny(value);
    let itemsHtml = '';
    for (const ele of showCountries) {
        itemsHtml += `<div class="country-info"><p>${ele.name}</p></div>`;
    }
    showDiv.innerHTML = itemsHtml;
    if (value) {
        description.innerHTML = `<p>Countries containg <span class="letter">${value}</span> are <span class="number">${showCountries.length}</span></p>`;
    } else {
        description.innerHTML = '';
    }
});

inputDiv.appendChild(input);
// let searchBtn = document.createElement('button');
// searchBtn.textContent = 'Q';
// inputDiv.appendChild(searchBtn);
let bottomDiv = document.createElement('div');
bottomDiv.className = 'bottom-div';
document.body.appendChild(bottomDiv);

let showDiv = document.createElement('div');
showDiv.className = 'show-div';
bottomDiv.appendChild(showDiv);


for (const country of countries) {
    let countryInfo = document.createElement('div');
    countryInfo.className = 'country-info';
    showDiv.appendChild(countryInfo);
    let countryName = document.createElement('p');
    countryName.textContent = country.name.toUpperCase();
    countryInfo.appendChild(countryName);
}
