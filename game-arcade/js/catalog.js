let skins = [];
const target = document.querySelector(".target");
const textBlock = document.querySelector(".form-control");
const RGAPI = localStorage.getItem("RGAPI");
let boolean = true;
textBlock.addEventListener("keydown", function(event){
     if (event.key === "Enter"){
        filtherSkins(textBlock.value);
        textBlock.value = null;
    }   
})
fetch(`https://ap.api.riotgames.com/val/content/v1/contents?api_key=${RGAPI}`)
    .then(myData => myData.json())
    .then(jsonData => riotGame(jsonData));

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
            console.log(boolean);
        } else if(name === null){
            createCard(skin.id, skin.name);
        }
    }
    boolean = false;
    console.log(boolean);
}

function createCard(skinId, skinName) {
    const col = document.createElement("div");
    col.classList.add("col-lg-3","col-sm-12", "m-3");
    const card = document.createElement("div");
    card.classList.add("card", "text-white", "bg-dark", "border", "border-1", "p-5");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title", "resfont");
    cardTitle.textContent = skinName;
    const image = document.createElement("img");
    image.classList.add("card-img-top", "img-fluid");
    image.src = `https://raw.githubusercontent.com/InFinity54/Valorant_DDragon/master/WeaponSkins/${skinId}.png`;
    col.appendChild(card);
    card.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    target.appendChild(col);
};
