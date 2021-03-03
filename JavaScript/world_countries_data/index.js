const tenMost = (countries) => {
    const tenMostPopulation = [];
    const tenMostLanguages = [];

    const arrPopulation = [];
    const arrLanguages = [];
    let sumPopulation = 0;
    for (const country of countries) {
        let population = country.population;
        let languages = country.languages;
        sumPopulation += population;
        arrPopulation.push(population);
        arrLanguages.push(...languages);
    }

    arrPopulation.sort((a, b) => (b - a));

    for (const ele of arrPopulation.slice(0, 10)) {
        for (const country of countries) {
            if (ele === country.population) {
                tenMostPopulation.push({country: country.name, population: ele});
            }
        }
    }
    tenMostPopulation.unshift({country: 'World', population: sumPopulation});

    const keyArr = [];
    const valueArr = [];
    for (const ele of arrLanguages) {
        if (keyArr.includes(ele)) {
            valueArr[keyArr.indexOf(ele)]++;
        } else {
            keyArr.push(ele);
            valueArr[keyArr.indexOf(ele)] = 1;
        }
    }
    let sortValue = [...valueArr].sort((a, b) => (b - a));

    for (const ele of sortValue.slice(0, 10)) {
        let index = valueArr.indexOf(ele);
        tenMostLanguages.push({language: keyArr[index], numbers: ele});
    }

    return {tenMostLanguages, tenMostPopulation};
}


let {tenMostPopulation, tenMostLanguages} = tenMost(countries);

let number = countries.length;
let subTitle = document.createElement('p');
subTitle.className = 'subtitle';
subTitle.textContent = `Currently, we have ${number} countries`;
document.body.appendChild(subTitle);

let buttonDiv = document.createElement('div');
buttonDiv.className = 'button-div';
document.body.appendChild(buttonDiv);

let pButton = document.createElement('button');
pButton.className = 'p-button';
pButton.textContent = 'POPULATION';
buttonDiv.appendChild(pButton);
pButton.addEventListener('click', () => {
    pDescription.style.display = 'block';
    lDescription.style.display = 'none';
    pDiv.style.display = 'grid';
    lDiv.style.display = 'none';
});

let lButton = document.createElement('button');
lButton.className = 'l-button';
lButton.textContent = 'LANGUAGES';
buttonDiv.appendChild(lButton);
lButton.addEventListener('click', () => {
    lDescription.style.display = 'block';
    pDescription.style.display = 'none';
    lDiv.style.display = 'grid';
    pDiv.style.display = 'none';
});

let pDescription = document.createElement('p');
pDescription.className = 'p-description';
pDescription.textContent = '10 Most populated countries in the world';
buttonDiv.appendChild(pDescription);

let lDescription = document.createElement('p');
lDescription.className = 'l-description';
lDescription.textContent = '10 Most Spoken languages in the world';
buttonDiv.appendChild(lDescription);

let showDiv = document.createElement('div');
showDiv.className = 'show-div';
document.body.appendChild(showDiv);

let pDiv = document.createElement('div');
pDiv.className = 'p-div';
showDiv.appendChild(pDiv);

let lDiv = document.createElement('div');
lDiv.className = 'l-div';
showDiv.appendChild(lDiv);

for (let i = 0; i < tenMostPopulation.length; i++) {
    let itemName = document.createElement('p');
    let itemBar = document.createElement('div');
    let itemNum = document.createElement('p');
    itemName.className = 'name';
    itemName.textContent = tenMostPopulation[i].country;
    itemBar.className = 'bar';
    itemBar.style.width = tenMostPopulation[i].population * 0.0000001 + 'px';
    itemNum.className = 'num';
    itemNum.textContent = tenMostPopulation[i].population;
    pDiv.appendChild(itemName);
    pDiv.appendChild(itemBar);
    pDiv.appendChild(itemNum);
}

for (let j = 0; j < tenMostLanguages.length; j++) {
    let itemName = document.createElement('p');
    let itemBar = document.createElement('div');
    let itemNum = document.createElement('p');
    itemName.className = 'name';
    itemName.textContent = tenMostLanguages[j].language;
    itemBar.className = 'bar';
    itemBar.style.width = tenMostLanguages[j].numbers * 8 + 'px';
    itemNum.className = 'num';
    itemNum.textContent = tenMostLanguages[j].numbers;
    lDiv.appendChild(itemName);
    lDiv.appendChild(itemBar);
    lDiv.appendChild(itemNum);
}

