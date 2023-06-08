console.log("script loaded");

fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
    .then(myData => myData.json())
    .then(textData => startFetch(textData));

const currencySelector = document.querySelector(".currencies");
let currencySelectorTwo = document.querySelectorAll(".currencies-two");
let currencysDisplayOne = document.querySelectorAll(".currencys-dislpay-one");
let currencysDisplayTwo = document.querySelectorAll(".currencys-dislpay-two");
let ratioDisplay = document.querySelectorAll(".ratio-display");
const body = document.querySelector(".main-body");
const dashboard = document.querySelector(".dashboard");
const loader = document.querySelector(".loader");
const lineChartField = document.querySelector(".line-comparison");
const chartBox = document.querySelector(".chart-box");
const addCurrencyButton = document.querySelector(".currency-button");
const currencyDisplays = document.querySelector(".currencies-display");
const averageDisplay = document.querySelector(".average");

let firstSelector;
let selectorValue;
let start = false;
let chartPlaced = false;
let lineChart;
let times = []
let lineChartData = []
let selectorAmmount = 0
let timeRemove;
let removeTime = false;

function startFetch(textData) {
    firstSelector = textData
    displayCurrencies(firstSelector);
}

function displayCurrencies(textdata) {
    for (key in textdata) {
        currencySelector.innerHTML += `<option value="${key}">${key}: ${textdata[key]}</option>`;
        currencySelectorTwo[0].innerHTML += `<option value="${key}">${key}: ${textdata[key]}</option>`
    }
    loader.classList.add("hidden");
    body.classList.remove("hidden");
}

currencySelector.addEventListener("change", () => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + currencySelector.value + ".json")
        .then(myData => myData.json())
        .then(textData => firstChanged(textData));
});
currencySelectorTwo[0].addEventListener("change", compareCurrencies);
addCurrencyButton.addEventListener("click", addCurrency);

function firstChanged(textData) {
    selectorValue = textData;
    compareCurrencies();
    if (!start) {
        dashboard.classList.remove("hidden");
        start = true;
    }
}

function compareCurrencies() {
    let average = 0;
    for (let i = 0; i < currencySelectorTwo.length; i++) {    
        currencysDisplayOne[i].innerHTML = currencySelector.value;
        currencysDisplayTwo[i].innerHTML = currencySelectorTwo[i].value;
        for (key in selectorValue[currencySelector.value]) {
            if (key == currencySelectorTwo[i].value) {
                ratioDisplay[i].innerHTML = "1    =    " + selectorValue[currencySelector.value][currencySelectorTwo[i].value];
                average += selectorValue[currencySelector.value][currencySelectorTwo[i].value];
                console.log(average)
            }
        }
    }
    average = average / currencySelectorTwo.length
    averageDisplay.innerHTML = average
    calculateDates();
    lineData().then(myData => createLineChart(myData));
}

function createLineChart(currencyData) {
    if (chartPlaced) {
        lineChart.destroy();
    }
    if (removeTime) {
        times = times.filter(function (e) { return e !== timeRemove })
        removeTime = false
    }
    lineChart = new Chart(lineChartField, {
        type: 'line',
        data: {
            labels: times,
            datasets: currencyData
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
        }
    });
    chartPlaced = true;
}

function calculateDates() {
    times = []
    const subtraction = [30, 25, 20, 15, 10, 5, 0]
    for (let i = 0; i < subtraction.length; i++) {
        subtractDate(subtraction[i])
    }
}

function subtractDate(num2) {
    const now = new Date();
    const num = new Date(now.getFullYear(), now.getMonth(), now.getDate() - num2)
    times.push(`${num.getFullYear()}-${checkDate(num.getMonth() + 1)}-${checkDate(num.getDate())}`)
}

function checkDate(m) {
    let date
    if (m < 10) {
        date = "0" + m
    }
    else (
        date = m
    )
    return date
}

async function lineData() {
    const datasets = []
    for (let j = 0; j < currencySelectorTwo.length; j++) {
        let data = []
        for (let i = 0; i < times.length; i++) {
            let textData = await fetchData(times[i]);
            if (textData != "") {
                for (key in textData[currencySelector.value]) {
                    if (key == currencySelectorTwo[j].value) {
                        data.push(textData[currencySelector.value][currencySelectorTwo[j].value]);
                    }
                }
            }
        }
        datasets.push(
            {
                label: currencySelectorTwo[j].value,
                data: data,
                borderWidth: 1
            }
        )
    }
    return datasets;
}

function makeDatasets() {

}

async function fetchData(time) {
    let response = await fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/" + time + "/currencies/" + currencySelector.value + ".json");
    let jsonData = await response.text();
    if (jsonData == "Package size exceeded the configured limit of 50 MB. Try https://github.com/fawazahmed0/currency-api/tree/1/" + time + "/currencies/" + currencySelector.value + ".json instead.") {
        timeRemove = time;
        removeTime = true;
        console.log(times)
        return ""
    }
    else {
        jsonData = JSON.parse(jsonData)
        return jsonData;
    }

}

function addCurrency() {
    currencyDisplays.innerHTML += `<select class="form-select form-select-lg btn btn-dark mt-2 currencies-two" name="" id="">
    </select>
    <div class="background rounded text-light">
        <div class="row">
            <div class="col currencys-dislpay-one text-center"></div>
            <div class="col currencys-dislpay-two text-center"></div>
        </div>
        <div class="row">
            <div class="col-md ratio-display text-center "></div>
        </div>
    </div>`
    currencysDisplayOne = document.querySelectorAll(".currencys-dislpay-one");
    currencysDisplayTwo = document.querySelectorAll(".currencys-dislpay-two");
    currencySelectorTwo = document.querySelectorAll(".currencies-two");
    ratioDisplay = document.querySelectorAll(".ratio-display");
    selectorAmmount++;
    for (key in firstSelector) {
        currencySelectorTwo[selectorAmmount].innerHTML += `<option value="${key}">${key}: ${firstSelector[key]}</option>`
    }
    for (let i = 0; i < currencySelectorTwo.length; i++) {
        currencySelectorTwo[i].addEventListener("change", compareCurrencies)
    }
    compareCurrencies()
}