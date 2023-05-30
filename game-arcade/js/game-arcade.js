fetch(`https://ap.api.riotgames.com/val/content/v1/contents?api_key=RGAPI-95452fb0-dc66-4f69-803f-9cbc2a1926d3`)
    .then(myData => myData.json())
    .then(jsonData => riotGame(jsonData));

const ctx = document.querySelector(".skins");
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
const guns = [odins, guardians, vandals, classics, shortys, frenzies, ghosts, sheriffs, stingers, buckies, judges, bulldogs, phantoms, marshals, operators, melees]
const gunsString = ["Odin", "Guardian", "Vandal", "Classic", "Shorty", "Frenzy", "Ghost", "Sheriff", "Stinger", "Bucky", "Judge", "Bulldog", "Phantom", "Marshal", "Operator", "Melees"]

const testdiv = document.createElement("div")
const newContent = document.createTextNode("Hi there and greetings!");
testdiv.appendChild(newContent)
testdiv.className = "btn btn-dark"

const loca = document.querySelector(".target")
document.body.insertBefore(testdiv, loca);

function riotGame(data) {
    console.log(data)
    createGunSkinsArr(gunsString, data)
    createKnifeSkinArr(data)


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
}
function createGunSkinsArr(GunName, data) {
    for (let i = 0; i < data.skins.length; i++) {
        let skin = data.skins[i]
        for (let i = 0; i < GunName.length; i++) {
            if (skin.name.includes(GunName[i])) {
                guns[i].push(skin.name);
            }
        }
    }
}
function createKnifeSkinArr(data) {
    for(let i = 0; i < data.skins.length; i++){
        let knife = data.skins[i]
        if(knife.assetName.includes("Melee")){
            melees.push(knife.name)
        }
    }
    
}