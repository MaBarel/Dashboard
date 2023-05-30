console.log("script loaded");

fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
    .then(myData => myData.json())
    .then(textData => displayCurrencies(textData));

const currencySelector = document.querySelector(".currencies");
const currencySelectorTwo = document.querySelector(".currencies-two");
const currencysDisplayOne = document.querySelector(".currencys-dislpay-one");
const currencysDisplayTwo = document.querySelector(".currencys-dislpay-two");
const ratioDisplay = document.querySelector(".ratio-display");
const body = document.querySelector(".main-body");
const dashboard = document.querySelector(".dashboard");
const loader = document.querySelector(".loader");
const lineChartField = document.querySelector(".line-comparison");
const chartBox = document.querySelector(".chart-box");

let selectorValue;
let start = false;
let chartPlaced = false;
let lineChart;

function displayCurrencies(textdata) {
    for (key in textdata) {
        currencySelector.innerHTML += `<option value="${key}">${key}: ${textdata[key]}</option>`;
        currencySelectorTwo.innerHTML += `<option value="${key}">${key}: ${textdata[key]}</option>`;
    }
    loader.classList.add("hidden")
    body.classList.remove("hidden")
}

currencySelector.addEventListener("change", () => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"+ currencySelector.value +".json")
    .then(myData => myData.json())
    .then(textData => firstChanged(textData));
});
currencySelectorTwo.addEventListener("change", compareCurrencies);

function firstChanged(textData) {
    selectorValue = textData;
        compareCurrencies();
        if (!start) {
            dashboard.classList.remove("hidden");
            start = true;
        }
}

function compareCurrencies() {
    currencysDisplayOne.innerHTML = currencySelector.value;
    currencysDisplayTwo.innerHTML = currencySelectorTwo.value;
    for (key in selectorValue[currencySelector.value]) {
        if (key == currencySelectorTwo.value) {
            ratioDisplay.innerHTML = "1    =    " + selectorValue[currencySelector.value][currencySelectorTwo.value];
        }
    }
    createLineChart()
}

function createLineChart() {
    const time = ["5","10","15","20","25","30"]
    if (chartPlaced) {
        lineChart.destroy();
    }
    lineChart = new Chart(lineChartField, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: currencySelector.value,
                data: [2,6,3,1,6,3],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
        }
    });
    chartPlaced = true;
}

function calculateDates() {
    const d = new Date()
    const date = [d.getFullYear(), (d.getMonth()),d.getDate() - 20]
    return date
}
