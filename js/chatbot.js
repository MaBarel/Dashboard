

function showInConsole(data) {
    console.log(data);
}




// variables
const messagesField = document.querySelector(".textchat")
const personsMessage = document.querySelector(".form-control")
let weatherQuery = false



//if statements
personsMessage.addEventListener("keyup", messageSent)
function generateChatBubblePerson(message) {
    messagesField.innerHTML +=
        `
    <div class="d-flex flex-row justify-content-end mb-4">
        <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb;">
            <p class="small mb-0">${message}</p>
        </div>
    </div>
    `
    messagesField.scrollTop = messagesField.scrollHeight
}
function generateChatBubbleBot(message) {
    messagesField.innerHTML +=
        `
    <div class="d-flex flex-row justify-content-start mb-4">
        <div class="p-3 ms-3"
            style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
            <p class="small mb-0">${message}</p>
        </div>
    </div>
    `
    messagesField.scrollTop = messagesField.scrollHeight
}
function messageSent(enter) {
    const rdmNumber = Math.ceil(Math.random() * 6)
    if (enter.keyCode === 13) {
        generateChatBubblePerson(personsMessage.value)

        if (personsMessage.value === "weather\n") {

            generateChatBubbleBot("what city?")

            weatherQuery = true
        } else if (weatherQuery === true) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${personsMessage.value}&appid=09119b452c52340bc36a56e7c56036b0`)
                .then(myData => myData.text())
                .then(textData => weatherMessage(textData));

            weatherQuery = false
        } else if(personsMessage.value === "fuck you\n"){
            generateChatBubbleBot("No FUCK YOU!")
        } else {
            switch(rdmNumber){
                case 1: generateChatBubbleBot("Sorry, I didnt quite get that");
                 break;
                case 2: generateChatBubbleBot("Sorry, I dont understand"); 
                break;
                case 3: generateChatBubbleBot("Sorry, I was thinking about cheese"); 
                break;
                case 4: generateChatBubbleBot("Sorry, I was distracted by your beautifull eyes"); 
                break;
                case 5: generateChatBubbleBot("It may be beyond my capabillities at the moment"); 
                break;
                case 6: generateChatBubbleBot("For the Last time Pinapple on pizza is a crime"); 
                break;
            }
        }
        personsMessage.value = ""
    }
}
function weatherMessage(data) {
    const parsedData = JSON.parse(data)
    if (parsedData.cod === 200) {
        generateChatBubbleBot(`
            The temperature in ${parsedData.name} is ${Math.round(parsedData.main.temp - 273)}°C 
            where the maximum will be ${Math.round(parsedData.main.temp_max - 273)}°C
            and the minimum will be ${Math.round(parsedData.main.temp_min - 273)}°C
            with the weather being ${parsedData.weather[0].description + `<img src="http://openweathermap.org/img/wn/${parsedData.weather[0].icon}.png"></img>`}
            `)
    }
    if (parsedData.cod === "404") {
        generateChatBubbleBot("that city doesnt exist")
    }

    console.log(parsedData)
}

