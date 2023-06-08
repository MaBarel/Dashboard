fetch('https://mbo-sd.nl/apiv2/basic-cash-register ')
    .then(myData => myData.json())
    .then(textData => showInConsole(textData));

const insert = document.querySelector('.insert');

const totalElement = document.querySelector(".totals");



const producPerReceiptChart = document.querySelector(".product-per-receipt-chart");

function showInConsole(data) {
    const receipts = data.receipts;
    insert.innerHTML = ' ';
    const labels = []
    const dataForChart = []
    let resultHTML = " ";
    let fullPrice = 0;
    let totalProductCount = 0;
    for (let i = 0; i < receipts.length; i++) {
        if (i == 0) {
            resultHTML += `<div class = "row">`
        }
        const total = totalCount(receipts[i]);
        fullPrice = fullPrice + total;
        totalProductCount = totalProductCount + receipts[i].length;
        console.log(fullPrice);
        labels.push(`bon ${i}`);
        dataForChart.push(total)

        const map = createMap(receipts[i], i + 1, total)
        resultHTML += map;
        if (i + 1 % 3 == 0 && i != 0) {
            resultHTML += "</div>";
            resultHTML += `<div class = "row">`;
        }
    }
    const averageProductCount = totalProductCount / receipts.length
    insert.innerHTML += resultHTML;
    showChart(producPerReceiptChart, labels, dataForChart)
    const averagePrice = fullPrice / receipts.length;
    console.log(averagePrice)
    totalElement.innerHTML += `
<div class="col-md-4">
    <div class="card text-start">
        <div class="card-body">
            <h4 class="card-title">totaal prijs</h4>
            <br>
            <div>€${fullPrice.toFixed(2)}</div>
        </div>
    </div>
</div>
`

    totalElement.innerHTML += `<div class="col-md-4">
<div class="card text-start">
    <div class="card-body">
        <h4 class="card-title">totaal hoeveelheid bonnen/hoeveelheid producten/gemiddeld producten per bon </h4>
        <br>
        <div>${receipts.length}/${totalProductCount}/${averageProductCount}</div>
    </div>
</div>
</div>

`
totalElement.innerHTML += `
<div class="col-md-4">
<div class="card text-start">
    <div class="card-body">
        <h4 class="card-title">gemiddeld besteed</h4>
        <br>
        <div>${averagePrice.toFixed(2)}</div>
    </div>
</div>
</div>
`


}

function showChart(canvasElement, labels, data) {
    new Chart(canvasElement, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'price',
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createMap(data, index, total) {
    const map = `
    <div class="col-md-4">
    <div class="card text-start">
        <div class="card-body">
            <div class="accordion" id="accordion${index}">
                <div class="card text-start">
                    <div class="card-body">
                        <div class="accordion accordion-flush" id="accordionFlush${index}">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-heading${index}">
                                    <button class="insert accordion-button collapsed" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}"
                                        aria-expanded="false" aria-controls="flush-collapse${index}">
                                        Bon ${index}
                                    </button>
                                </h2>
                                <div id="flush-collapse${index}" class="accordion-collapse collapse"
                                    aria-labelledby="flush-heading${index}" data-bs-parent="#accordionFlush${index}">
                                    <div class="accordion-body">
                                        ${displayReceipt(data)}
                                        <br>
                                        <div>Total price = €${total.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
`
    return map;
}

function displayReceipt(data) {
    const container = document.createElement("div")
    const row = document.createElement("div");
    row.classList.add("row");
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const colOne = document.createElement("div");
        colOne.classList.add("col-md-6")
        colOne.textContent = element.name;
        const colTwo = document.createElement("div");
        colTwo.classList.add("col-md-6")
        colTwo.textContent = "€" + element.price;

        row.appendChild(colOne);
        row.appendChild(colTwo);

    }
    container.appendChild(row)
    return container.innerHTML;
}



function totalCount(data) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        total = total + element.price;
    }
    console.log(total)
    return total;
}

