fetch(`https://ap.api.riotgames.com/val/content/v1/contents?api_key=RGAPI-95452fb0-dc66-4f69-803f-9cbc2a1926d3`)
    .then(myData => myData.json())
    .then(jsonData => riotGame(jsonData));
let skins = [];
const target = document.querySelector(".target");
const textBlock = document.querySelector(".form-control");
let boolean = true;
textBlock.addEventListener("keydown", function(event){
     if (event.key === "Enter"){
        filtherSkins(textBlock.value);
    }   
})


function riotGame(data) {
    console.log(data);
    skins = data.chromas;
    filtherSkins();
}
function filtherSkins(name){
    target.innerHTML = " ";
    for (i = 0; i < skins.length; i++) {
        let skin = skins[i];
        if(name != null && skin.name.includes(name)){
            createCard(skin.id, skin.name);
        } else if(boolean === true){
            createCard(skin.id, skin.name);
            console.log(boolean)
        } else if(name === null){
            createCard(skin.id, skin.name);
        }
    }
    boolean = false;
    console.log(boolean)
}

function createCard(skinId, skinName) {
    target.innerHTML +=
        `<div class="col-3 m-3">
        <div class="card text-white bg-dark border border-1 p-5">
            <img class="card-img-top img-fluid"
                src="https://raw.githubusercontent.com/InFinity54/Valorant_DDragon/master/WeaponSkins/${skinId}.png"
                alt="Title">
            <div class="card-body">
                <h6 class="card-title">${skinName}</h6>
            </div>
        </div>
    </div>`
};
/*function searchSkin(id, name){
    target.innerHTML = " "
    if(name.includes(textBlock.value)){
        target.innerHTML +=
    `<div class="col-3 m-3">
        <div class="card text-white bg-dark border border-1 p-5">
            <img class="card-img-top img-fluid"
                src="https://raw.githubusercontent.com/InFinity54/Valorant_DDragon/master/WeaponSkins/${id}.png"
                alt="Title">
            <div class="card-body">
                <h6 class="card-title">${name}</h6>
            </div>
        </div>
    </div>`
    }
}*/