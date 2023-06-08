fetch(`https://ap.api.riotgames.com/val/content/v1/contents?api_key=RGAPI-c5ba26a7-6369-47ee-a73a-284e92836793`)
    .then(myData => myData.json())
    .then(jsonData => riotGame(jsonData));

const ctx = document.querySelector(".skins");
const target = document.querySelector(".target");
const loader = document.querySelector(".loader");
const odins = [];
const guardians = [];
const vandals = [];
const classics = [];
const shortys = [];
const frenzies = [];
const ghosts = [];
const sheriffs = [];
const stingers = [];
const spectres = [];
const buckies = [];
const judges = [];
const bulldogs = [];
const phantoms = [];
const marshals = [];
const operators = [];
const melees = [];
const guns = [odins, guardians, vandals, classics, shortys, frenzies, ghosts, sheriffs, stingers, buckies, judges, bulldogs, phantoms, marshals, operators, melees];
const gunsString = ["Odin", "Guardian", "Vandal", "Classic", "Shorty", "Frenzy", "Ghost", "Sheriff", "Stinger", "Bucky", "Judge", "Bulldog", "Phantom", "Marshal", "Operator", "Melees"];

function riotGame(data) {
    console.log(data);
    createGunSkinsArr(gunsString, data);
    createKnifeSkinArr(data);
    createTable();

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: gunsString,
            datasets: [{
                label: 'Number of skins per gun',
                data: [odins.length, guardians.length, vandals.length, classics.length, shortys.length, frenzies.length, ghosts.length, sheriffs.length, stingers.length, buckies.length, judges.length, bulldogs.length, phantoms.length, marshals.length, operators.length, melees.length],
                borderWidth: 1,
            }]
        },
        options: {
            color: "white",
            responsive: true,
        }
    });
    loader.classList.remove("loader");
}
function createGunSkinsArr(GunName, data) {
    for (let i = 0; i < data.skins.length; i++) {
        let skin = data.skins[i];
        for (let i = 0; i < GunName.length; i++) {
            if (skin.name.includes(GunName[i])) {
                guns[i].push(skin.name);
            }
        }
    }
}
function createKnifeSkinArr(data) {
    for (let i = 0; i < data.skins.length; i++) {
        let knife = data.skins[i];
        if (knife.assetName.includes("Melee")) {
            melees.push(knife.name);
        }
    }

}

function createTable() {
    target.innerHTML = `
    <div class="container mt-5 bg-dark text-white border border-white resfont height-known overflow-auto">
        <div class="row">
        <div class="col"><h5>Gun Type</h5> </div>
        <div class="col"><h5>Amount</h5> </div>
        <div class="col"><h5>Skin types</h5> </div>
        
        </div>
         <div class="row hitspot">

         </div>
        </div>
    </div>`
    const hit = document.querySelector(".hitspot")
    let amount = 0
    for(let i = 0; i < guns.length; i++){
        let gun = guns[i]
            hit.innerHTML += `
            <div class="d-flex justify content start border border-white mb-5">
                <div class="col me-2">${gunsString[i]}</div>
                <div class="col me-2">${gun.length}</div>
                <div class="col me-2">${gun}</div>
            </div>
            `
        
        amount = amount + gun.length
    }
    console.log(amount)
    hit.innerHTML +=`
    <div>
        <div class="col me-2 h6">${"Totaal"}</div>
        <div class="col me-2 h6">${"Amount"}</div>
        <div class="col me-2 h6">${amount}</div>
    </div>
    `
}